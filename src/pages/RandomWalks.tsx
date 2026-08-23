import { Box } from "@mui/material";
import { RWalk } from "@stefanos-larkou/rwalk";

export default function RandomWalks() {
    return (
        <Box sx={{ display: "flex", flex: 1, minHeight: { xs: "auto", md: 0 }, px: 2, pb: 2, overflow: { xs: "visible", md: "auto" } }}>
            <RWalk />
        </Box>
    );
}
