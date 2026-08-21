import { Box } from "@mui/material";
import { AutoSearch } from "@stefanos-larkou/find-my-way";
import { useCallback, useEffect, useState } from "react";
import type { TransitionEvent } from "react";
import { planRun } from "../core/drift";
import { useViewport } from "../hooks/useViewport";

const OPACITY = 0.35;
const FADE = 1.6;
const BLUR = 3;

export function HomeBackdrop() {
    const viewport = useViewport();
    const [run, setRun] = useState(() => planRun(0, { x: window.innerWidth, y: window.innerHeight }, Math.random));
    const [arrived, setArrived] = useState(false);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => requestAnimationFrame(() => setArrived(true)));
        return () => cancelAnimationFrame(frame);
    }, [run.key]);

    const settle = useCallback((event: TransitionEvent<HTMLDivElement>) => {
        if (event.propertyName !== "opacity" || !leaving) return;
        setArrived(false);
        setLeaving(false);
        setRun(current => planRun(current.key + 1, viewport, Math.random));
    }, [leaving, viewport]);

    const at = arrived ? run.to : run.from;

    return (
        <Box aria-hidden sx={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0, filter: `blur(${BLUR}px)` }}>
            <Box
                key={run.key}
                onTransitionEnd={settle}
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: run.size,
                    height: run.size,
                    opacity: arrived && !leaving ? OPACITY : 0,
                    transform: `translate(${at.x - run.size / 2}px, ${at.y - run.size / 2}px) rotate(${run.angle}deg)`,
                    transition: `transform ${run.seconds}s linear, opacity ${FADE}s ease`
                }}
            >
                <AutoSearch
                    key={run.key}
                    seed={run.seed}
                    cellCount={run.cellCount}
                    complexity={run.complexity}
                    speed={run.speed}
                    algorithm={run.algorithm}
                    terrain={run.terrain}
                    onFinished={() => setLeaving(true)}
                />
            </Box>
        </Box>
    );
}
