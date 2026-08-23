import { describe, expect, it } from "vitest";
import { seedFor } from "./preview";

describe("seedFor", () => {
    it("gives every run its own seed", () => {
        const seeds = new Set(Array.from({ length: 50 }, (_, run) => seedFor(run)));
        expect(seeds.size).toBe(50);
    });

    it("leaves a wide gap between one run and the next", () => {
        expect(seedFor(1) - seedFor(0)).toBeGreaterThan(1000);
    });
});
