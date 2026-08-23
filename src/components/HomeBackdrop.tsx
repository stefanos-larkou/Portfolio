import { Box } from "@mui/material";
import { AutoSearch } from "@stefanos-larkou/find-my-way";
import { AutoWalk } from "@stefanos-larkou/rwalk";
import { useCallback, useEffect, useState } from "react";
import type { TransitionEvent } from "react";
import { planRun } from "../core/drift";
import type { Show as Subject } from "../core/drift";
import { useViewport } from "../hooks/useViewport";

const OPACITY = { search: 0.35, walk: 0.55 };
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
                    opacity: arrived && !leaving ? OPACITY[run.show.kind] : 0,
                    transform: `translate(${at.x - run.size / 2}px, ${at.y - run.size / 2}px) rotate(${run.angle}deg)`,
                    transition: `transform ${run.show.seconds}s linear, opacity ${FADE}s ease`
                }}
            >
                <Show key={run.key} show={run.show} onFinished={() => setLeaving(true)} />
            </Box>
        </Box>
    );
}

function Show({ show, onFinished }: { show: Subject; onFinished: () => void; }) {
    if (show.kind === "walk") {
        return (
            <AutoWalk
                seed={show.seed}
                dimensions={show.dimensions}
                walkers={show.walkers}
                steps={show.steps}
                speed={show.speed}
                diagonals={show.diagonals}
                onFinished={onFinished}
            />
        );
    }

    return (
        <AutoSearch
            seed={show.seed}
            cellCount={show.cellCount}
            complexity={show.complexity}
            speed={show.speed}
            algorithm={show.algorithm}
            terrain={show.terrain}
            onFinished={onFinished}
        />
    );
}
