import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { admin, backoffice, client, unprotected } from "./pages/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      ...unprotected,
      {
        path: "/client",
        children: [...client],
      },
      {
        path: "/backoffice",
        children: [...backoffice],
      },
      {
        path: "/admin",
        children: [...admin],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
