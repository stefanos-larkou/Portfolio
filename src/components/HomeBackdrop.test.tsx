import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeBackdrop } from "./HomeBackdrop";
import { renderWithProviders } from "../test-utils";

describe("HomeBackdrop", () => {
    it("runs a search behind the page", () => {
        const { container } = renderWithProviders(<HomeBackdrop />);
        expect(container.querySelector("canvas")).toBeInTheDocument();
    });

    it("hides itself from assistive technology", () => {
        const { container } = renderWithProviders(<HomeBackdrop />);
        const layer = container.querySelector("[aria-hidden='true']");
        expect(layer).toBeInTheDocument();
        expect(layer).toContainElement(container.querySelector("canvas"));
    });

    it("offers nothing to interact with", () => {
        renderWithProviders(<HomeBackdrop />);
        expect(screen.queryAllByRole("button")).toEqual([]);
        expect(screen.queryAllByRole("slider")).toEqual([]);
    });
});
