import { createTheme } from "@mui/material/styles";

interface ThemeIconPalette {
    main: string;
    hover: string;
}

declare module "@mui/material/styles" {
    interface Palette {
        themeIcon: ThemeIconPalette;
    }

    interface PaletteOptions {
        themeIcon?: ThemeIconPalette;
    }

    interface CssThemeVariables {
        enabled: true;
    }
}

export const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "class"
    },
    colorSchemes: {
        light: {
            palette: {
                primary: { main: "#1f6feb" },
                themeIcon: {
                    main: "#0a6f88",
                    hover: "rgba(10, 111, 136, 0.12)"
                }
            }
        },
        dark: {
            palette: {
                primary: { main: "#589dff" },
                themeIcon: {
                    main: "#fbbf24",
                    hover: "rgba(251, 191, 36, 0.12)"
                }
            }
        }
    },
    typography: {
        fontFamily: "Roboto, system-ui, sans-serif",
        h1: {
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em"
        },
        h2: {
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 600,
            lineHeight: 1.2
        },
        overline: {
            fontWeight: 600,
            letterSpacing: "0.12em"
        },
        body1: {
            lineHeight: 1.7
        }
    },
    components: {
        MuiLink: {
            defaultProps: {
                underline: "hover"
            }
        }
    }
});