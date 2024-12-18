import "./index.css";
import App from "./pages/App.tsx";
import Settings from "./pages/Settings.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { Routes, Route, HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <SidebarProvider>
        <AppSidebar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SidebarProvider>
    </HashRouter>
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
