import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./routes";
import { renderWithProviders } from "./test-utils";

describe("AppRoutes", () => {
    it("renders the home page at the root path", async () => {
        renderWithProviders(<AppRoutes />);
        expect(await screen.findByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("renders the not-found page for an unknown path", async () => {
        renderWithProviders(<AppRoutes />, ["/nonsense"]);
        expect(await screen.findByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    });
});