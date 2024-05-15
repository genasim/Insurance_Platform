import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./shared/layout/Layout";
import NotFoundPage from "./features/not-found/404";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Admin from "./features/admin/Admin";
import Home from "./features/home/Home";
import ErrorBoundry from "./features/error-catch/ErrorBoundry";
import ClaimSubmission from "./features/claims/ClaimSubmission";
import SubmitClaim from "./features/claims/SubmitClaim";
import { Policy } from "./models/Policy";
import API, { Tables } from "./shared/api-client/ApiClient";

const router = createBrowserRouter([
  {
    //ToDo use navlinks
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundry />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/client",
        children: [
          {
            path: "claims",
            children: [
              {
                index: true,
                element: <ClaimSubmission />,
              },
              {
                path: ":policyId",
                element: <SubmitClaim />,
                loader: async ({ params }) =>
                  await API.findById<Policy>(Tables.POLICIES, params.policyId ?? ""),
              },
            ],
          },
        ],
      },
      {
        path: "/backoffice",
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
