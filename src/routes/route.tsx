import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { adminPaths } from "./admin.routes";
import { userRole } from "../constants/userRole";
import ProtectedRoute from "../utils/ProtectedRoute";
import { routeGenerator } from "../utils/routesGenerator";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role={userRole.ADMIN}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
]);
