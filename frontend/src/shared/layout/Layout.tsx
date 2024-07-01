import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoggedInContext from "../hooks/useLoggedIn";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";

interface LayoutState {
  isLoggedIn: boolean;
}

const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!sessionStorage.getItem(AuthStorageKeys.TOKEN)
  );
  const handleSetLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };
  return (
    <div className="d-flex flex-column min-vh-100">
      <LoggedInContext.Provider
        value={{ loggedIn: isLoggedIn, setLoggedIn: handleSetLoggedIn }}
      >
        <Navbar />
        <div className="flex-grow-1">
          <Outlet />
        </div>
        <Footer />
      </LoggedInContext.Provider>
    </div>
  );
};

export default Layout;
