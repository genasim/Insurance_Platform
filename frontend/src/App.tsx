import {RouterProvider, createBrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import pages from "./pages/index";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/404";
import ClientDashboard from "./pages/client/Dashboard";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Admin from "./features/admin/Admin";

const router = createBrowserRouter([
    {
        //ToDo index file
        //ToDo remove pages
        //ToDo use navlinks
        path: "/",
        element: <Layout/>,
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
