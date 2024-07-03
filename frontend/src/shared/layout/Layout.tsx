import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthStorageKeys } from "../enums/AuthStorageKeys";
import { Modal } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

interface LoggedInContextProps {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const LoggedInContext = createContext<LoggedInContextProps>({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {},
});

interface ModalContextProps {
  isShown: boolean;
  show: (error: string) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  isShown: false,
  show: (error: string) => {},
});

const Layout: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!sessionStorage.getItem(AuthStorageKeys.TOKEN)
  );
  const handleSetLoggedIn = (value: boolean) => setIsLoggedIn(value);

  const handleModalShow = (error: string) => {
    setShow(true);
    setError(error);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <LoggedInContext.Provider
        value={{ loggedIn: isLoggedIn, setLoggedIn: handleSetLoggedIn }}
      >
        <ModalContext.Provider value={{ isShown: show, show: handleModalShow }}>
          <Navbar />
          <div className="flex-grow-1">
            <Outlet />
          </div>
          <Footer />
          <Toaster position="top-center" />
        </ModalContext.Provider>
      </LoggedInContext.Provider>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Oops</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <u>There appears to be an error</u> <br />
          {error}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Layout;
