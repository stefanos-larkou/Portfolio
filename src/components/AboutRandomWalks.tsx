import { Box, Stack, Typography } from "@mui/material";
import { GitHubLink } from "./GitHubLink";

const INTRO = "A random walk visualiser in one, two and three dimensions. A crowd of walkers starts "
    + "at a shared origin and each one takes a step in a direction chosen at random, over and over. "
    + "The playback replays every step, and the statistics run a far larger crowd to measure what "
    + "the walk does against what probability theory says it should.";

const REPOSITORY = "https://github.com/stefanos-larkou/RWalk";

const SECTIONS = {
    options: "The options",
    charts: "The statistics"
};

const OPTIONS = [
    "Dimensions: One, two or three. Three can be rotated around by dragging.",
    "Speed: How fast the playback runs.",
    "Walkers: How many walk at once.",
    "Steps: How far each of them goes.",
    "Seed: The same seed always gives the same walk.",
    "Diagonal moves: Lets a step move along more than one axis at once.",
    "Stable limits: Keeps the view fixed to where the whole walk will reach, rather than growing with it."
];

const CHARTS = [
    "How far the walkers get: distance from the origin grows with the square root of the steps taken, so the squared distance is a straight line.",
    "Where the walkers end up: the spread of final distances, against the curve the central limit theorem predicts for that dimension.",
    "Walkers that find their way home: a walk in one or two dimensions returns to its start eventually, and one in three often never does."
];

export default function AboutRandomWalks() {
    return (
        <Stack spacing={2}>
            <Typography variant="body1">{INTRO}</Typography>
            <Section title={SECTIONS.options} items={OPTIONS} />
            <Section title={SECTIONS.charts} items={CHARTS} />
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