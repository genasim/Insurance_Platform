import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import pages from "./pages/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        children: [...pages.unprotected]
      },
      {
        path: "/client",
        children: [...pages.client],
      },
      {
        path: "/backoffice",
        children: [...pages.backoffice],
      },
      {
        path: "/admin",
        children: [...pages.admin],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
