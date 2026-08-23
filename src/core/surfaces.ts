import type { Theme } from "@mui/material/styles";

const LIGHT = "rgba(252, 251, 255, 0.72)";
const DARK = "rgba(26, 23, 34, 0.72)";
const BLUR = "blur(20px)";

export function glass(theme: Theme) {
    return {
        backgroundColor: LIGHT,
        backdropFilter: BLUR,
        ...theme.applyStyles("dark", { backgroundColor: DARK })
    };
}
