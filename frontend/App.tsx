// frontend/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
