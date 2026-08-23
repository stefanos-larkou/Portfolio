import { act, fireEvent, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Intro } from "./Intro";
import type { Stage } from "./Intro";
import { renderWithProviders } from "../test-utils";

const NAME = "Ada";
const A_CHARACTER = 100;
const THE_HOLD = 500;

function landing() {
    const target = document.createElement("h1");
    document.body.appendChild(target);
    return { current: target };
}

function show(stage: Stage, handlers: { onTyped?: () => void; onLanded?: () => void; } = {}) {
    return renderWithProviders(
        <Intro
            name={NAME}
            stage={stage}
            lands={landing()}
            onTyped={handlers.onTyped ?? (() => { })}
            onLanded={handlers.onLanded ?? (() => { })}
        />
    );
}

function type(characters: number) {
    for (let step = 0; step < characters; step += 1) {
        act(() => vi.advanceTimersByTime(A_CHARACTER));
    }
}

describe("Intro", () => {
    beforeEach(() => vi.useFakeTimers());

    afterEach(() => {
        vi.useRealTimers();
        document.body.innerHTML = "";
    });

    it("types the name a character at a time", () => {
        const { container } = show("typing");
        type(2);
        expect(container.textContent).toContain("Ad");
        expect(container.textContent).not.toContain("Ada");
    });

    it("blinks a caret while it is still typing", () => {
        const { container } = show("typing");
        expect(container.textContent).toContain("_");
    });

    it("takes the caret away before the name flies, so it is not measured with it", () => {
        const { container } = show("settling");
        expect(container.textContent).not.toContain("_");
    });

    it("says when the name is typed, once it has been held a moment", () => {
        const onTyped = vi.fn();
        show("typing", { onTyped });
        type(NAME.length);
        expect(onTyped).not.toHaveBeenCalled();
        act(() => vi.advanceTimersByTime(THE_HOLD));
        expect(onTyped).toHaveBeenCalledTimes(1);
    });

    it("moves the name once it is settling", () => {
        show("settling");
        const flying = screen.getByText(NAME);
        expect(flying.style.transform).toContain("translate");
        expect(flying.style.transition).toContain("transform");
    });

    it("leaves the name where it is while it is still typing", () => {
        const { container } = show("typing");
        type(NAME.length);
        expect(container.querySelector("[style*='transform']")).toBeNull();
    });

    it("stands in front of the page while the name is being typed", () => {
        const { container } = show("typing");
        expect(container.firstChild).toHaveStyle({ pointerEvents: "auto" });
    });

    it("lets the page be used again once the name is on its way", () => {
        const { container } = show("settling");
        expect(container.firstChild).toHaveStyle({ pointerEvents: "none" });
    });

    it("shuts the whole page off while the name is being typed, header and all", () => {
        show("typing");
        expect(document.body).toHaveAttribute("inert");
    });

    it("hands the page back once the name is on its way", () => {
        show("settling");
        expect(document.body).not.toHaveAttribute("inert");
    });

    it("hands the page back when it goes", () => {
        const { unmount } = show("typing");
        unmount();
        expect(document.body).not.toHaveAttribute("inert");
    });

    it("says when the name has landed", () => {
        const onLanded = vi.fn();
        const { container } = show("settling", { onLanded });
        fireEvent.transitionEnd(container.firstChild as Element, { propertyName: "transform" });
        expect(onLanded).toHaveBeenCalledTimes(1);
    });

    it("ignores a transition that is not the flight", () => {
        const onLanded = vi.fn();
        const { container } = show("settling", { onLanded });
        fireEvent.transitionEnd(container.firstChild as Element, { propertyName: "background-color" });
        expect(onLanded).not.toHaveBeenCalled();
    });
});
