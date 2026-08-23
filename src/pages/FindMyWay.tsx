import { Box } from "@mui/material";
import { FindMyWay as Visualiser } from "@stefanos-larkou/find-my-way";

export default function FindMyWay() {
    return (
        <Box sx={{ display: "flex", flex: 1, minHeight: { xs: "auto", md: 0 }, px: 2, pb: 2, overflow: { xs: "visible", md: "auto" } }}>
            <Visualiser />
        </Box>
    );
}