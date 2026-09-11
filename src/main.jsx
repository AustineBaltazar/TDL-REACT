import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";

import "./index.css";

import Daily from "./pages/Daily.jsx";
import Weekly from "./pages/Weekly.jsx";
import Monthly from "./pages/Monthly.jsx";
import Important from "./pages/Important.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Daily />} />
          <Route path="/important" element={<Important />} />
          <Route path="/weekly" element={<Weekly />} />
          <Route path="/monthly" element={<Monthly />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>,
);
