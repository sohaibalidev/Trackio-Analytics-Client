import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/components/Layout/Layout";

import Dashboard from "@/pages/Dashboard";
import Websites from "@/pages/Websites";
import Analytics from "@/pages/Analytics";
import Login from "@/pages/Login";
import Callback from "@/pages/Callback";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<Callback />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="websites" element={<Websites />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
