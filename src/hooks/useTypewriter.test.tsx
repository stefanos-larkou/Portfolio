import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useTypewriter } from "./useTypewriter";

const TEXT = "Hello";
const SPEED = 10;

function typing(enabled = true) {
    return renderHook(() => useTypewriter(TEXT, SPEED, enabled)).result;
}

function tick(times: number) {
    for (let step = 0; step < times; step += 1) {
        act(() => vi.advanceTimersByTime(SPEED));
    }
}

describe("useTypewriter", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("starts with nothing typed", () => {
        expect(typing().current.typed).toBe("");
    });

    it("keeps the whole text between what is typed and what is left", () => {
        const writer = typing();
        tick(2);
        expect(writer.current.typed + writer.current.rest).toBe(TEXT);
    });

    it("types a character at a time", () => {
        const writer = typing();
        tick(3);
        expect(writer.current.typed).toBe("Hel");
    });

    it("is done once it reaches the end and stops there", () => {
        const writer = typing();
        tick(TEXT.length + 5);
        expect(writer.current.typed).toBe(TEXT);
        expect(writer.current.done).toBe(true);
    });

    it("gives the whole text at once when it is not wanted", () => {
        const writer = typing(false);
        expect(writer.current.typed).toBe(TEXT);
        expect(writer.current.done).toBe(true);
    });

    it("can be told to stop typing and show everything", () => {
        const writer = typing();
        act(() => writer.current.finish());
        expect(writer.current.typed).toBe(TEXT);
        expect(writer.current.done).toBe(true);
    });
});
