import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "fomantic-ui-css/semantic.css";
import pages from "./pages/index.ts";
import PageLayout from "./layout/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        children: [...pages.unprotected],
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
