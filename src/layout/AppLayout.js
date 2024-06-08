import React, { useEffect, useState } from "react";
import CustomNav from "../component/navbar/Navbar.tsx";
import "./AppLayout.css";
import io from "socket.io-client";
import { useAuthStore } from "../store.tsx";
import Notification from "../shared/Notification.jsx";
import Sidebar from "../component/side-bar/Sidebar.js";
import Footer from "../component/footer/Footer.tsx";

export default function AppLayout({ children }) {
  const { user } = useAuthStore();

  const [notification, setNotification] = useState({
    message: "",
    link: "",
    show: false,
  });

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.emit("join", user?._id);
    newSocket.on(`comment-received-${user?._id}`, (data) => {
      if (data.user !== data.author) {
        setNotification({ message: data?.message, link: data?.link, show: true });
        setTimer(10);
      }
    });
    newSocket.on(`reply-received-${user?._id}`, (data) => {
      setNotification({ message: data?.message, link: data?.link, show: true });
      setTimer(10);
    });

    if (timer === 0) {
      setTimer(null);
    }
    if (!timer) return;
    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearTimeout(intervalId);
      newSocket.disconnect();
    };
  }, [timer]);
  return (
    <>
      <Sidebar />
      {timer && <Notification notification={notification} />}
      <div className="app-layout">
        <CustomNav />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
}
