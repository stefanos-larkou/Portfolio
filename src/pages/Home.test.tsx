import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./Home";
import { PAGES } from "../core/pages";
import { renderWithProviders } from "../test-utils";

const PROJECTS = PAGES.filter(page => page.heading);

describe("Home", () => {
    it("offers a way into every project in the registry", () => {
        renderWithProviders(<Home />);
        PROJECTS.forEach(project => {
            expect(screen.getByRole("link", { name: project.heading })).toHaveAttribute("href", project.path);
        });
        expect(PROJECTS.length).toBeGreaterThan(1);
    });

    it("offers a way into nothing else", () => {
        renderWithProviders(<Home />);
        expect(screen.getAllByRole("link")).toHaveLength(PROJECTS.length);
    });
});
