import { Box } from "@mui/material";
import { ThemeToggle } from "./components/ThemeToggle";
import { AppRoutes } from "./routes";

export function App() {
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <ThemeToggle />
            </Box>
            <AppRoutes />
        </>
    );
}