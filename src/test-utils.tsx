import type { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { theme } from "./core/theme";

export function renderWithProviders(ui: ReactNode, initialEntries: string[] = ["/"]) {
    return render(
        <ThemeProvider theme={theme} defaultMode="system" noSsr>
            <MemoryRouter initialEntries={initialEntries}>
                {ui}
            </MemoryRouter>
        </ThemeProvider>
    );
}