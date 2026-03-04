import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Auth from "./Auth";
import Dashboard from "./user/Dashboard";
import BusinessSignUp from "./business/BusinessSignUp";
import BusinessSignIn from "./business/BusinessSignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<Welcome />} />
        <Route path="/login"             element={<Auth />} />
        <Route path="/register"          element={<Auth />} />
        <Route path="/dashboard"         element={<Dashboard />} />
        <Route path="/business/register" element={<BusinessSignUp />} />
        <Route path="/business/login"    element={<BusinessSignIn />} />
      </Routes>
    </BrowserRouter>
  );
}