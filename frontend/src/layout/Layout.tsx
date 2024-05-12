import React, {FC, useState} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutState {
    isLoggedIn: boolean;
}

const PageLayout: FC = () => {
    const [state, setState] = useState<LayoutState>({
        isLoggedIn: false
    });
    const setLoggedIn = (isLoggedIn: boolean) => {
        setState(({
            ...state,
            isLoggedIn: isLoggedIn
        }));
    };
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar setLoggedIn={setLoggedIn}/>
            <div className="flex-grow-1">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default PageLayout;
