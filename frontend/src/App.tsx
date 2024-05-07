import { RouterProvider, createBrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import pages from "./pages/index";
import PageLayout from "./layout/Layout";
import NotFoundPage from "./pages/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <NotFoundPage />,
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
