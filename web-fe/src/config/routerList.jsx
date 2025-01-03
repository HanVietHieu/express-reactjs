import { PATHS } from "./path";
import HomePage from "../pages/home";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/error/ErrorPage";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";

export const RouterList = [
  {
    element: <MainLayout />,
    children: [
      {
        path: PATHS.HOME_PAGE,
        element: <HomePage />,
      },
      {
        path: PATHS.REGISTER,
        element: <Register />,
      },
      {
        path: PATHS.LOGIN,
        element: <Login />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];
