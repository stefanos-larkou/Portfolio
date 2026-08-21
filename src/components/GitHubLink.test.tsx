import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GitHubLink } from "./GitHubLink";
import { renderWithProviders } from "../test-utils";

const HREF = "https://github.com/stefanos-larkou/Find-My-Way";

describe("GitHubLink", () => {
    it("links to the repository it is given", () => {
        renderWithProviders(<GitHubLink href={HREF} />);
        expect(screen.getByRole("link", { name: "Source on GitHub" })).toHaveAttribute("href", HREF);
    });

    it("opens in a new tab without handing over the opener", () => {
        renderWithProviders(<GitHubLink href={HREF} />);
        const link = screen.getByRole("link", { name: "Source on GitHub" });
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noreferrer");
    });

    it("takes a label of its own", () => {
        renderWithProviders(<GitHubLink href={HREF} label="Look at the code" />);
        expect(screen.getByRole("link", { name: "Look at the code" })).toBeInTheDocument();
    });
});
