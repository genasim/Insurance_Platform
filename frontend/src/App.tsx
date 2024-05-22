import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateCoefficient from "./features/actuary/CreateCoefficient";
import ManageCoefficients from "./features/actuary/ManageCoefficients";
import UpdateCoefficient from "./features/actuary/UpdateCoefficient";
import Admin from "./features/admin/Admin";
import UpdateUser from "./features/admin/UpdateUser";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import ClaimDetails from "./features/claims-backoffice/ClaimDetails";
import ClaimsDashboard from "./features/claims-backoffice/ClaimsDashboard";
import ClaimSubmission from "./features/claims/ClaimSubmission";
import SubmitClaim from "./features/claims/SubmitClaim";
import ErrorBoundary from "./features/error-catch/ErrorBoundry";
import Home from "./features/home/Home";
import NotFoundPage from "./features/not-found/404";
import Layout from "./shared/layout/Layout";
import loadClaimInfo from "./shared/services/load-claim-info";
import loadPolicy from "./shared/services/load-policy";
import loadPolicyTemplates from "./shared/services/load-policy-templates";

const router = createBrowserRouter([
    {
        //ToDo use navlinks
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorBoundary/>,
        children: [
            {
                index: true,
                element: <Home/>,
                loader: loadPolicyTemplates
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
                                loader: loadPolicy,
                            }
                        ],
                    },
                ],
            },
            {
                path: "/backoffice",
                children: [
                    {
                        path: "claims",
                        children: [
                            {
                                index: true,
                                element: <ClaimsDashboard />,
                            },
                            {
                                path: ":claimId",
                                element: <ClaimDetails />,
                                loader: loadClaimInfo
                            }
                        ]
                    }
                ]
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "admin",
                element: <Admin/>,
            },
            {
                path: "admin/users/:userId",
                element: <UpdateUser/>
            },
            {
                path: "actuary",
                element: <ManageCoefficients/>
            },
            {
                path: "actuary/:coefficientId",
                element: <UpdateCoefficient/>
            },
            {
                path: "actuary/create-coefficient",
                element: <CreateCoefficient/>
            }
        ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
