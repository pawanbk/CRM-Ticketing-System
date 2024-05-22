import React, { useEffect, useState } from "react";
import CustomNav from "../component/navbar/Navbar.tsx";
import "./AppLayout.css";
import io from "socket.io-client";
import { useAuthStore } from "../store.tsx";
import Notification from "../shared/Notification.jsx";
import Sidebar from "../component/side-bar/Sidebar.js";
import Footer from "../component/footer/Footer.tsx";

const socket = io("http://localhost:3001");

export default function AppLayout({ children }) {
  const { user } = useAuthStore();

  const [notification, setNotification] = useState({
    message: "",
    link: "",
    show: false,
  });

  useEffect(() => {
    socket.emit("join", user?.id);
    socket.on(`comment-received-${user?.id}`, (data) => {
      if (data.author !== user?.id) setNotification({ message: data?.message, link: data?.link, show: true });
    });
    socket.on(`reply-received-${user?.id}`, (data) => {
      setNotification({ message: data?.message, link: data?.link, show: true });
    });

    const timer = setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <>
      <CustomNav />

      <div className="app-layout">
        <Notification notification={notification} />
        <Sidebar />
        <div className="main-content">{children}</div>
      </div>
      <Footer />
    </>
  );
}
