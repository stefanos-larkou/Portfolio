import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { IconButton, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

export function ThemeToggle() {
    const { mode, systemMode, setMode } = useColorScheme();
    const isDark = (mode === "system" ? systemMode : mode) === "dark";
    const label = isDark ? "Switch to light theme" : "Switch to dark theme";

    return (
        <Tooltip title={label} placement="bottom">
            <IconButton
                onClick={() => setMode(isDark ? "light" : "dark")}
                aria-label={label}
                sx={
                    theme => ({
                        color: theme.vars.palette.themeIcon.main,
                        "&:hover": {
                            backgroundColor: theme.vars.palette.themeIcon.hover
                        },
                        "@media (hover: none)": {
                            "&:hover": {
                                backgroundColor: "transparent"
                            }
                        }
                    })
                }
            >
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    );
}