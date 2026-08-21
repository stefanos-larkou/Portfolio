import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useViewport } from "./useViewport";

function resizeTo(width: number, height: number) {
    window.innerWidth = width;
    window.innerHeight = height;
    window.dispatchEvent(new Event("resize"));
}

describe("useViewport", () => {
    it("reports the window's size straight away", () => {
        const { result } = renderHook(() => useViewport());
        expect(result.current).toEqual({ x: window.innerWidth, y: window.innerHeight });
    });

    it("follows the window as it resizes", () => {
        const { result } = renderHook(() => useViewport());
        act(() => resizeTo(800, 600));
        expect(result.current).toEqual({ x: 800, y: 600 });
    });

    it("stops listening once unmounted", () => {
        const remove = vi.spyOn(window, "removeEventListener");
        const { unmount } = renderHook(() => useViewport());
        unmount();
        expect(remove).toHaveBeenCalledWith("resize", expect.any(Function));
        remove.mockRestore();
    });
});
