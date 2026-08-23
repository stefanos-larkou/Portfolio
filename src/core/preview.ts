export const STILL = "(prefers-reduced-motion: reduce)";

const STRIDE = 104729;

export function seedFor(run: number): number {
    return (run + 1) * STRIDE;
}
