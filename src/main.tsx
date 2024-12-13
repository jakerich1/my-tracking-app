import "./index.css";
import App from "./pages/App.tsx";
import Settings from "./pages/Settings.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BrowserRouter, Routes, Route } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>
);
