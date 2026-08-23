import { ALGORITHM_NAMES } from "@stefanos-larkou/find-my-way";
import type { AlgorithmName } from "@stefanos-larkou/find-my-way";

const BOARD_SHARE = 0.60;
const MIN_BOARD = 220;
const MIN_CELLS = 150;
const MAX_CELLS = 300;
const MIN_SPEED = 20;
const MAX_SPEED = 40;
const MIN_STEPS = 600;
const MAX_STEPS = 1600;
const MIN_WALK_SPEED = 100;
const MAX_WALK_SPEED = 220;
const MIN_WALKERS = 8;
const MAX_WALKERS = 20;
const EITHER = 0.5;
const FLAT = 2;

export interface Point {
    x: number;
    y: number;
}

export interface Search {
    kind: "search";
    seconds: number;
    seed: number;
    algorithm: AlgorithmName;
    cellCount: number;
    complexity: number;
    speed: number;
    terrain: boolean;
}

export interface Walk {
    kind: "walk";
    seconds: number;
    seed: number;
    dimensions: number;
    walkers: number;
    steps: number;
    speed: number;
    diagonals: boolean;
}

export type Show = Search | Walk;

export interface Run {
    key: number;
    show: Show;
    size: number;
    angle: number;
    from: Point;
    to: Point;
}

export function boardFor(viewport: Point): number {
    return Math.max(Math.min(viewport.x, viewport.y) * BOARD_SHARE, MIN_BOARD);
}

export function planShow(random: () => number): Show {
    return random() < EITHER ? searchShow(random) : walkShow(random);
}

export function planRun(key: number, viewport: Point, random: () => number): Run {
    const show = planShow(random);
    const size = boardFor(viewport);
    const angle = random() * 360;
    const margin = halfExtent(size, angle);
    const from = {
        x: between(margin, Math.max(viewport.x - margin, margin), random()),
        y: between(margin, Math.max(viewport.y - margin, margin), random())
    };
    const heading = furthestHeading(from, angle, viewport, margin);

    return { key, show, size, angle: heading.angle, from, to: heading.to };
}

function searchShow(random: () => number): Search {
    const cellCount = Math.round(between(MIN_CELLS, MAX_CELLS, random()));
    const speed = between(MIN_SPEED, MAX_SPEED, random());

    return {
        kind: "search",
        seconds: cellCount / speed,
        seed: seedFrom(random),
        algorithm: ALGORITHM_NAMES[Math.floor(random() * ALGORITHM_NAMES.length)] ?? "a-star",
        cellCount,
        complexity: between(0.3, 0.9, random()),
        speed,
        terrain: random() < EITHER
    };
}

function walkShow(random: () => number): Walk {
    const steps = Math.round(between(MIN_STEPS, MAX_STEPS, random()));
    const speed = between(MIN_WALK_SPEED, MAX_WALK_SPEED, random());

    return {
        kind: "walk",
        seconds: steps / speed,
        seed: seedFrom(random),
        dimensions: FLAT,
        walkers: Math.round(between(MIN_WALKERS, MAX_WALKERS, random())),
        steps,
        speed,
        diagonals: random() < EITHER
    };
}

function seedFrom(random: () => number): number {
    return Math.floor(random() * 1_000_000);
}

export function halfExtent(size: number, angle: number): number {
    const radians = angle * Math.PI / 180;
    return size * (Math.abs(Math.cos(radians)) + Math.abs(Math.sin(radians))) / 2;
}

export function travelFrom(from: Point, angle: number, viewport: Point, margin: number): number {
    const radians = angle * Math.PI / 180;
    const step = { x: Math.cos(radians), y: Math.sin(radians) };
    return Math.max(Math.min(reach(from.x, step.x, margin, viewport.x - margin), reach(from.y, step.y, margin, viewport.y - margin)), 0);
}

function furthestHeading(from: Point, angle: number, viewport: Point, margin: number) {
    const forward = travelFrom(from, angle, viewport, margin);
    const backward = travelFrom(from, angle + 180, viewport, margin);
    const chosen = forward >= backward ? angle : angle + 180;
    const distance = Math.max(forward, backward);
    const radians = chosen * Math.PI / 180;

    return {
        angle: chosen,
        to: { x: from.x + Math.cos(radians) * distance, y: from.y + Math.sin(radians) * distance }
    };
}

function reach(at: number, step: number, low: number, high: number): number {
    if (step === 0) return Number.POSITIVE_INFINITY;
    return step > 0 ? (high - at) / step : (low - at) / step;
}

function between(low: number, high: number, ratio: number): number {
    return low + (high - low) * ratio;
}
