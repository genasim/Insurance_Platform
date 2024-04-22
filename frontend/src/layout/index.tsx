import { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PageLayout: FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PageLayout;
