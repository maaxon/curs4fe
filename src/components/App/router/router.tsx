import { createBrowserRouter } from "react-router-dom";
import {adminRoutes, employerRoutes, publicRoutes, userRoutes} from "@constants/routes";
import {AdminRoutes, EmployerRoutes, UserRoutes} from "@components/App/router/protected-routes.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployerRoutes />,
    children: [
      ...employerRoutes.map(({ path, component: Element }) => ({
        path,
        element: <Element />,
      })),
    ],
  },
  {
    path: "/",
    element: <UserRoutes />,
    children: [
      ...userRoutes.map(({ path, component: Element }) => ({
        path,
        element: <Element />,
      })),
    ],
  },
  {
    path: "/",
    element: <AdminRoutes />,
    children: [
      ...adminRoutes.map(({ path, component: Element }) => ({
        path,
        element: <Element />,
      })),
    ],
  },
  ...publicRoutes.map(({ path, component: Element }) => ({
    path,
    element: <Element />,
  })),
]);
