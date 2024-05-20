import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./shared/layout/Layout";
import NotFoundPage from "./features/not-found/404";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Admin from "./features/admin/Admin";
import Home from "./features/home/Home";
import UpdateUser from "./features/admin/UpdateUser";
import ErrorBoundary from "./features/error-catch/ErrorBoundry";
import ClaimSubmission from "./features/claims/ClaimSubmission";
import SubmitClaim from "./features/claims/SubmitClaim";
import { Policy } from "./models/Policy";
import API, { Tables } from "./shared/api-client/ApiClient";
import ClaimsDashboard from "./features/claims-backoffice/ClaimsDashboard";
import ClaimDetails from "./features/claims-backoffice/ClaimDetails";
import { Claim } from "./models/Claim";
import { ClaimDocument } from "./models/ClaimDocument";
import { PolicyPackages } from "./models/PolicyPackages";
import ManageCoefficients from "./features/actuary/ManageCoefficients";
import UpdateCoefficient from "./features/actuary/UpdateCoefficient";
import CreateCoefficient from "./features/actuary/CreateCoefficient";

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
                                loader: async ({ params }) => {
                                    const claim = await API.findById<Claim>(Tables.CLAIMS, params.claimId ?? "")
                                    const docs = (await API.findAll<ClaimDocument>(Tables.CLAIM_DOCUMENTS))
                                        .filter(doc => doc.claimId === claim.id)
                                    const policy = await API.findById<Policy>(Tables.POLICIES, claim.policyId)
                                    const policyPackage = await API.findById<PolicyPackages>(Tables.POLICY_PACKAGES, policy.package)
                                    return {claim, docs, policyPackage}
                                }}
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
