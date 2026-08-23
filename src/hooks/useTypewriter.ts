import { useEffect, useState } from "react";

interface Typewriter {
    typed: string;
    rest: string;
    done: boolean;
    finish: () => void;
}

export function useTypewriter(text: string, speed: number, enabled: boolean): Typewriter {
    const [shown, setShown] = useState(enabled ? 0 : text.length);

    useEffect(() => {
        if (!enabled || shown >= text.length) return;

        const timer = setTimeout(() => setShown(shown + 1), speed);

        return () => clearTimeout(timer);
    }, [enabled, shown, text, speed]);

    return {
        typed: text.slice(0, shown),
        rest: text.slice(shown),
        done: shown >= text.length,
        finish: () => setShown(text.length)
    };
}
