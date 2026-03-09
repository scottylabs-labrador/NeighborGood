/**
 * App — root router.
 * Add new pages here; keep this file short.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome   from "./pages/Welcome";
import Auth      from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Wallet    from "./pages/Wallet";
import Browse    from "./pages/Browse";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Welcome />} />
        <Route path="/login"     element={<Auth mode="login" />} />
        <Route path="/register"  element={<Auth mode="register" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet"    element={<Wallet />} />
        <Route path="/browse"    element={<Browse />} />
      </Routes>
    </BrowserRouter>
  );
}