import { useMediaQuery } from "@mui/material";
import { AutoWalk } from "@stefanos-larkou/rwalk";
import { useState } from "react";
import { STILL, seedFor } from "../core/preview";

const RUN = {
    dimensions: 2,
    walkers: 14,
    steps: 1400,
    speed: 170,
    diagonals: false
};

export default function RandomWalksPreview() {
    const still = useMediaQuery(STILL);
    const [run, setRun] = useState(0);

    return (
        <AutoWalk
            key={run}
            seed={seedFor(run)}
            {...RUN}
            onFinished={() => setRun(current => still ? current : current + 1)}
        />
    );
}
