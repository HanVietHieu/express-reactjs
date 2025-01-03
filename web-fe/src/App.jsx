import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouterList } from "./config/routerList";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "jotai";
import "./assets/styles";

export default function App() {
  const router = createBrowserRouter(RouterList);
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}