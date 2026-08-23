import { useMediaQuery } from "@mui/material";
import { AutoSearch } from "@stefanos-larkou/find-my-way";
import { useState } from "react";
import { STILL, seedFor } from "../core/preview";

const RUN = {
    cellCount: 260,
    complexity: 0.7,
    speed: 30,
    algorithm: "a-star" as const,
    terrain: true
};

export default function FindMyWayPreview() {
    const still = useMediaQuery(STILL);
    const [run, setRun] = useState(0);

    return (
        <AutoSearch
            key={run}
            seed={seedFor(run)}
            {...RUN}
            onFinished={() => setRun(current => still ? current : current + 1)}
        />
    );
}
