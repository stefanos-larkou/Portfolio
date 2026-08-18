import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";
import { renderWithProviders } from "../test-utils";

function mockSystemScheme(scheme: "light" | "dark") {
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: query.includes("dark") && scheme === "dark",
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false
    }));
}

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("ThemeToggle", () => {
    it("offers to switch to dark when the system scheme is light", () => {
        mockSystemScheme("light");
        renderWithProviders(<ThemeToggle />);
        expect(screen.getByRole("button", { name: "Switch to dark theme" })).toBeInTheDocument();
    });

    it("offers to switch to light when the system scheme is dark", () => {
        mockSystemScheme("dark");
        renderWithProviders(<ThemeToggle />);
        expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
    });

    it("switches to the dark scheme when clicked", async () => {
        mockSystemScheme("light");
        renderWithProviders(<ThemeToggle />);
        await userEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
        expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeInTheDocument();
    });
});
