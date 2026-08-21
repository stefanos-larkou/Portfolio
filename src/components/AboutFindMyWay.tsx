import { Box, Stack, Typography } from "@mui/material";
import { GitHubLink } from "./GitHubLink";

const INTRO = "A pathfinding visualiser on a hexagonal grid. Each map is a randomly generated "
    + "irregular connected shape. A search begins at a root hex and works outwards until it reaches "
    + "the target hex, with a playback that replays every cell it considered on the way.";

const REPOSITORY = "https://github.com/stefanos-larkou/Find-My-Way";

const SECTIONS = {
    options: "The options",
    edits: "Changing the map"
};

const OPTIONS = [
    "Algorithm: Five pathfinding algorithms to choose from.",
    "Speed: How fast the playback runs.",
    "Size: How many hexes the map has.",
    "Complexity: How winding the map's shape is.",
    "Weighted terrain: Adds ground that costs more to cross than plain ground."
];

const EDITS = [
    "Walls are drawn by dragging across the map, and erased by dragging back over them.",
    "Terrain is painted just like walls, at three levels of cost.",
    "The start and end can be placed on any hex.",
    "Reset undoes every edit.",
    "New map generates another shape entirely."
];

export default function AboutFindMyWay() {
    return (
        <Stack spacing={2}>
            <Typography variant="body1">{INTRO}</Typography>
            <Section title={SECTIONS.options} items={OPTIONS} />
            <Section title={SECTIONS.edits} items={EDITS} />
            <GitHubLink href={REPOSITORY} />
        </Stack>
    );
}


function Section({ title, items }: { title: string; items: string[]; }) {
    return (
        <Box>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>{title}</Typography>
            <Box component="ul" sx={{ m: 0, pl: 3 }}>
                {items.map(item => (
                    <Typography key={item} component="li" variant="body1" color="text.secondary">
                        {item}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}
