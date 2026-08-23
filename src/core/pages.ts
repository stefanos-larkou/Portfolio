import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export interface Page {
    path: string;
    title: string;
    element: LazyExoticComponent<ComponentType>;
    heading?: string;
    blurb?: string;
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
        blurb: "A pathfinding visualiser on a hexagonal grid. Each map is a randomly generated "
            + "irregular connected shape. A search begins at a root hex and works outwards until it "
            + "reaches the target hex, with a playback that replays every cell it considered on the way.",
        element: lazy(() => import("../pages/FindMyWay")),
        info: lazy(() => import("../components/AboutFindMyWay")),
        accent: "linear-gradient(90deg, #0e9f6e, #d6337f)",
        icon: "/find-my-way.svg"
    },
    {
        path: "/random-walks",
        title: "Random Walks",
        heading: "Random Walks",
        blurb: "A random walk visualiser in one, two and three dimensions. A crowd of walkers starts "
            + "at a shared origin and each one takes a step in a direction chosen at random, over and "
            + "over. The playback replays every step, and the statistics run a far larger crowd to "
            + "measure what the walk does against what probability theory says it should.",
        element: lazy(() => import("../pages/RandomWalks")),
        info: lazy(() => import("../components/AboutRandomWalks")),
        accent: "linear-gradient(90deg, #2f7fd6, #e08a2e)",
        icon: "/random-walks.svg"
    }
];