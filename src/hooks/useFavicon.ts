import { useEffect } from "react";

export function useFavicon(href: string): void {
    useEffect(() => {
        document.head.querySelectorAll("link[rel='icon']").forEach(existing => existing.remove());

        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/svg+xml";
        link.href = href;
        document.head.appendChild(link);
    }, [href]);
}
