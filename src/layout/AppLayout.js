import React from "react";
import CustomNav from "../component/Navbar";

import "./AppLayout.css";

export default function AppLayout({ children }) {
  return (
    <>
      <CustomNav />
      <main>{children}</main>
    </>
  );
}
