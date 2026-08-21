import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export interface Page {
    path: string;
    title: string;
    element: LazyExoticComponent<ComponentType>;
    heading?: string;
    info?: LazyExoticComponent<ComponentType>;
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
        info: lazy(() => import("../components/AboutFindMyWay"))
    }
];