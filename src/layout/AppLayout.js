import React from "react";
import Topnav from "../component/Topnav";
import SideNav from "../component/SideNav";
import "./AppLayout.css";

export default function AppLayout({ children }) {
  return (
    <div>
      <Topnav />
      <main>
        <SideNav />
        <div className="content">{children}</div>
      </main>
    </div>
  );
}
