import {RouterProvider, createBrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "./shared/layout/Layout";
import NotFoundPage from "./features/not-found/404";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Admin from "./features/admin/Admin";
import Home from "./features/home/Home";

const router = createBrowserRouter([
    {
        //ToDo Genadi, pls sloji 1 stranica s path * където да е notFound и една страница глобален catch all error element
        //ToDo use navlinks
        path: "/",
        element: <Layout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "/client",
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
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
