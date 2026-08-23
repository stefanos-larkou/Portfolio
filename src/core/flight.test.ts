import { describe, expect, it } from "vitest";
import { flight } from "./flight";

function rect(left: number, top: number, width: number): DOMRect {
    return { left, top, width, height: 10, right: left + width, bottom: top + 10, x: left, y: top, toJSON: () => ({}) } as DOMRect;
}

describe("flight", () => {
    it("carries the name from where it is to where it lands", () => {
        expect(flight(rect(100, 40, 200), rect(30, 300, 50), 0.25)).toBe("translate(-70px, 260px) scale(0.25)");
    });

    it("asks for nothing when it is already there", () => {
        expect(flight(rect(10, 10, 80), rect(10, 10, 80), 1)).toBe("translate(0px, 0px) scale(1)");
    });
});
