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
import ClaimSubmission from "./features/claims/ClaimSubmission";
import SubmitClaim from "./features/claims/SubmitClaim";
import ClaimsDashboard from "./features/claims-backoffice/ClaimsDashboard";
import ClaimDetails from "./features/claims-backoffice/ClaimDetails";
import Policies from "./features/policies-backoffice/Policies";
import PolicySubmission from "./features/policies/PolicySubmission";
import ErrorBoundary from "./features/error-catch/ErrorBoundary";
import Home from "./features/home/Home";
import NotFoundPage from "./features/not-found/404";
import Layout from "./shared/layout/Layout";
import loadClaimInfo from "./shared/services/load-claim-info";
import loadPolicy from "./shared/services/load-policy";
import loadPolicyTemplates from "./shared/services/load-policy-templates";
import ClaimPaymentsRegister from "./features/claim-payments/ClaimPaymentsRegister";
import PremiumPaymentsRegister from "./features/premium-payments/PremiumPaymentsRegister";
import NotificationRegister from "./features/notifications/NotificationsRegister";

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
                path: "/client/policies",
                element: <PolicySubmission/>
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
            },
            {
                path: "backoffice/policies",
                element: <Policies/>
            },
            {
                path: "backoffice/claim-payments",
                element: <ClaimPaymentsRegister/>
            },
            {
                path: "backoffice/premium-payments",
                element: <PremiumPaymentsRegister/>
            },
            {
                path: "notifications",
                element: <NotificationRegister/>
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
