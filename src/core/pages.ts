import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export interface Page {
    path: string;
    title: string;
    element: LazyExoticComponent<ComponentType>;
    heading?: string;
    info?: LazyExoticComponent<ComponentType>;
    accent?: string;
    icon?: string;
}

export const PAGES: Page[] = [
    {
        path: "/",
        title: "Stefanos Larkou",
        element: lazy(() => import("../pages/Home"))
    },
    {
        path: "/find-my-way",
        title: "Find My Way",
        heading: "Find My Way",
        element: lazy(() => import("../pages/FindMyWay")),
        info: lazy(() => import("../components/AboutFindMyWay")),
        accent: "linear-gradient(90deg, #0e9f6e, #d6337f)",
        icon: "/find-my-way.svg"
    },
    {
        path: "/random-walks",
        title: "Random Walks",
        heading: "Random Walks",
        element: lazy(() => import("../pages/RandomWalks")),
        info: lazy(() => import("../components/AboutRandomWalks")),
        accent: "linear-gradient(90deg, #2f7fd6, #e08a2e)",
        icon: "/random-walks.svg"
    }
];