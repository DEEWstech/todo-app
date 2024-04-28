import React from "react";
import Navbar1 from "../components/Navbar1";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div>
      <Toaster />
      <Navbar1 />
      <Outlet />
    </div>
  );
};

export default RootLayout;