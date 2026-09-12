import { screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";
import { PROJECTS } from "../core/pages";
import { renderWithProviders } from "../test-utils";

const INSIDE = PROJECTS.filter(project => project.path !== undefined);
const AWAY = PROJECTS.filter(project => project.url !== undefined);

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
        INSIDE.forEach(project => {
            expect(screen.getByRole("link", { name: project.heading })).toHaveAttribute("href", project.path);
        });
        expect(INSIDE.length).toBeGreaterThan(1);
    });

    it("sends a project that is a site of its own to that site, in a new tab", () => {
        renderWithProviders(<Home />);
        expect(AWAY).not.toHaveLength(0);
        AWAY.forEach(project => {
            const link = screen.getByRole("link", { name: `${project.heading} (opens in a new tab)` });
            expect(link).toHaveAttribute("href", project.url);
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
        });
    });

    it("says what each project is, in the words its own page uses", () => {
        renderWithProviders(<Home />);
        PROJECTS.forEach(project => {
            expect(project.blurb).toBeTruthy();
            expect(screen.getByText(project.blurb)).toBeInTheDocument();
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

        expect(inside.sort()).toEqual(INSIDE.map(project => project.path).sort());
    });
});
