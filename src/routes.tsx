import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { PAGES } from "./core/pages";

const NotFound = lazy(() => import("./pages/NotFound"));

export function AppRoutes() {
    return (
        <Suspense fallback={null}>
            <Routes>
                {PAGES.map(page => <Route key={page.path} path={page.path} element={<page.element />} />)}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}