/*
filename: App.tsx
date: August 8, 2026
programmer: James Tran
title: How Do Good? v2 - Application Router
purpose: Route table for the data-driven v2 app — see docs/REDESIGN.md.
         Pages are lazy-loaded (route-level code splitting) so the 41
         /action/:id SEO landing pages don't download the chart stack.
*/

import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";

const HomePage = lazy(() =>
  import("@/pages/home").then((m) => ({ default: m.HomePage })),
);
const ActionDetailPage = lazy(() =>
  import("@/pages/action-detail").then((m) => ({ default: m.ActionDetailPage })),
);
const RankingsPage = lazy(() =>
  import("@/pages/rankings").then((m) => ({ default: m.RankingsPage })),
);
const DataPage = lazy(() =>
  import("@/pages/data-page").then((m) => ({ default: m.DataPage })),
);
const ClassifiedsPage = lazy(() =>
  import("@/pages/classifieds").then((m) => ({ default: m.ClassifiedsPage })),
);
const GetListedPage = lazy(() =>
  import("@/pages/get-listed").then((m) => ({ default: m.GetListedPage })),
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/action/:id" element={<ActionDetailPage />} />
            <Route path="/rankings/:slug" element={<RankingsPage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/classifieds" element={<ClassifiedsPage />} />
            <Route path="/get-listed" element={<GetListedPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
