/*
filename: App.tsx
date: August 8, 2026
programmer: James Tran
title: How Do Good? v2 - Application Router
purpose: Route table for the data-driven v2 app — see docs/REDESIGN.md
*/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout";
import { HomePage } from "@/pages/home";
import { ActionDetailPage } from "@/pages/action-detail";
import { RankingsPage } from "@/pages/rankings";
import { DataPage } from "@/pages/data-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/action/:id" element={<ActionDetailPage />} />
          <Route path="/rankings/:slug" element={<RankingsPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
