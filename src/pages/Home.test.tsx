import { screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";
import { PAGES } from "../core/pages";
import { renderWithProviders } from "../test-utils";

const PROJECTS = PAGES.filter(page => page.heading);

function settled() {
    vi.stubGlobal("matchMedia", (query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => { },
        removeListener: () => { },
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => false
    }));
}

describe("Home", () => {
    beforeEach(settled);
    afterEach(() => vi.unstubAllGlobals());

    it("offers a way into every project in the registry", () => {
        renderWithProviders(<Home />);
        PROJECTS.forEach(project => {
            expect(screen.getByRole("link", { name: project.heading })).toHaveAttribute("href", project.path);
        });
        expect(PROJECTS.length).toBeGreaterThan(1);
    });

    it("says what each project is, in the words its own page uses", () => {
        renderWithProviders(<Home />);
        PROJECTS.forEach(project => {
            expect(project.blurb).toBeTruthy();
            expect(screen.getByText(project.blurb as string)).toBeInTheDocument();
        });
    });

    it("names the technologies", () => {
        renderWithProviders(<Home />);
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
        expect(screen.getByText("Python")).toBeInTheDocument();
    });

    it("goes nowhere inside the site that is not a registered project", () => {
        renderWithProviders(<Home />);
        const inside = screen.getAllByRole("link")
            .map(link => link.getAttribute("href") ?? "")
            .filter(href => href.startsWith("/"));

        expect(inside.sort()).toEqual(PROJECTS.map(project => project.path).sort());
    });
});
