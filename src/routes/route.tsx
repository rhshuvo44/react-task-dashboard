import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { userRole } from "../constants/userRole";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import ProtectedRoute from "../utils/ProtectedRoute";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { editorPaths } from "./editor.routes";

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
  {
    path: "/editor",
    element: (
      <ProtectedRoute role={userRole.editor}>
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(editorPaths),
  },
]);
