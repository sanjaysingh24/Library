import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "../Page/login";
import SignUpForm from "../Page/signUp";
import Dashboard from "../Page/user/Dashboard";
import HEadersAuth from "../Auth/HeaderAuth";
import AdminDashboard from "../Page/admin/Dashboard";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

    
        <Route element={<HEadersAuth />}>
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
