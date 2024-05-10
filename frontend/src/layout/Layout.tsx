import {FC, useState} from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

interface LayoutState {
    isLoggedIn: boolean;
}

const PageLayout: FC = () => {

    const [state, setState] = useState<LayoutState>({
        isLoggedIn: false
    });

    const toggleIsLoggedIn = () => {
        setState(prevState => ({
            ...prevState,
            isLoggedIn: !prevState
        }));
    }
    return (
        <>
            <Navbar toggleIsLoggedIn={toggleIsLoggedIn}/>
            <Outlet/>
        </>
    );
};

export default PageLayout;
