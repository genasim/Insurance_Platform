import {RouterProvider, createBrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import pages from "./pages/index";
import PageLayout from "./layout/Layout";
import NotFoundPage from "./pages/404";
import ClientDashboard from "./pages/client/Dashboard";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Admin from "./features/admin/Admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout/>,
        errorElement: <NotFoundPage/>,
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
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
