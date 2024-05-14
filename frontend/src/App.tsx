import {RouterProvider, createBrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./shared/layout/Layout";
import NotFoundPage from "./features/not-found/404";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Admin from "./features/admin/Admin";
import Home from "./features/home/Home";
import ErrorBoundry from "./features/error-catch/ErrorBoundry";
import ClaimSubmission from "./features/claims/ClaimSubmission";

const router = createBrowserRouter([
    {
        //ToDo use navlinks
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorBoundry/>,
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
                        element: <ClaimSubmission />
                    }
                ]
            },
            {
                path: "/backoffice",
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
                element: <Admin/>
            },
        ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    }
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
