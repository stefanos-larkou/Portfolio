import { useEffect, useState } from "react";
import type { Point } from "../core/drift";

export function useViewport(): Point {
    const [size, setSize] = useState<Point>({ x: window.innerWidth, y: window.innerHeight });

    useEffect(() => {
        const measure = () => setSize({ x: window.innerWidth, y: window.innerHeight });
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    return size;
}
