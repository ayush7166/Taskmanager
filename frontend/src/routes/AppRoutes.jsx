import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Login";
import RegisterForm from "../components/RegisterForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <RegisterForm /> },
  {path:"*",element:<div>There is not any page</div>}
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
