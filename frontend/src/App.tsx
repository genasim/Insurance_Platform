import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { admin, backoffice, client, unprotected } from "./pages";

const router = createBrowserRouter([
  ...unprotected,
  {
    path: "/client",
    children: [...client],
  },
  {
    path: "/backoffice",
    children: [...backoffice],
  },
  {
    path: "/admin",
    children: [...admin],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
