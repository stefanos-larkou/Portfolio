import { Box } from "@mui/material";
import { RWalk } from "@stefanos-larkou/rwalk";

export default function RandomWalks() {
    return (
        <Box sx={{ display: "flex", flex: 1, minHeight: 0, px: 2, pb: 2, overflow: "auto" }}>
            <RWalk />
        </Box>
    );
}
