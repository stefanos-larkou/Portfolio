import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { renderWithProviders } from "./test-utils";

describe("App", () => {
    it("names the page and offers a way back on a project route", async () => {
        renderWithProviders(<App />, ["/find-my-way"]);
        expect(await screen.findByRole("heading", { level: 1, name: "Find My Way" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Back to the home page" })).toHaveAttribute("href", "/");
    });

    it("offers no way back from the home page", async () => {
        renderWithProviders(<App />);
        expect(await screen.findByRole("heading", { level: 1, name: "Stefanos Larkou" })).toBeInTheDocument();
        expect(screen.queryByRole("link", { name: "Back to the home page" })).not.toBeInTheDocument();
    });

    it("offers no explanation on a page that has none", async () => {
        renderWithProviders(<App />);
        await screen.findByRole("heading", { level: 1 });
        expect(screen.queryByRole("button", { name: /^About/ })).not.toBeInTheDocument();
    });

    it("explains the project when asked, and stops when dismissed", async () => {
        renderWithProviders(<App />, ["/find-my-way"]);
        await userEvent.click(await screen.findByRole("button", { name: "About Find My Way" }));
        expect(await screen.findByText("The options")).toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: "Close" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });

    it("puts the site's initials before a project's name in the tab", async () => {
        renderWithProviders(<App />, ["/find-my-way"]);
        await screen.findByRole("heading", { level: 1, name: "Find My Way" });
        await waitFor(() => expect(document.title).toBe("SL | Find My Way"));
    });

    it("leaves the home page's tab under its own name", async () => {
        renderWithProviders(<App />);
        await screen.findByRole("heading", { level: 1, name: "Stefanos Larkou" });
        await waitFor(() => expect(document.title).toBe("Stefanos Larkou"));
    });

    it("marks the tab with the project's own icon", async () => {
        renderWithProviders(<App />, ["/find-my-way"]);
        await screen.findByRole("heading", { level: 1, name: "Find My Way" });
        await waitFor(() => expect(document.head.querySelector("link[rel='icon']")).toHaveAttribute("href", "/find-my-way.svg"));
    });

    it("falls back to the site's own icon on a page without one", async () => {
        renderWithProviders(<App />);
        await screen.findByRole("heading", { level: 1, name: "Stefanos Larkou" });
        await waitFor(() => expect(document.head.querySelector("link[rel='icon']")).toHaveAttribute("href", "/icon.svg"));
    });

    it("puts the site's icon back when a project page is left", async () => {
        renderWithProviders(<App />, ["/find-my-way"]);
        await waitFor(() => expect(document.head.querySelector("link[rel='icon']")).toHaveAttribute("href", "/find-my-way.svg"));

        await userEvent.click(screen.getByRole("link", { name: "Back to the home page" }));

        await waitFor(() => expect(document.head.querySelector("link[rel='icon']")).toHaveAttribute("href", "/icon.svg"));
    });
});
