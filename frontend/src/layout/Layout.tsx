import {FC} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout: FC = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer />
        </>
    );
};

export default PageLayout;
