import React, { useEffect, useState } from "react";
import CustomNav from "../component/navbar/Navbar.tsx";
import "./AppLayout.css";
import io from "socket.io-client";
import { useAuthStore } from "../store.tsx";
import Notification from "../shared/Notification.jsx";
import Sidebar from "../component/side-bar/Sidebar.js";
import Footer from "../component/footer/Footer.tsx";
import { set } from "lodash";

export default function AppLayout({ children }) {
  const { user } = useAuthStore();

  const [notification, setNotification] = useState([]);

  const [timer, setTimer] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const openNotificationModal = () => {
    setShowNotificationModal(true);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.emit("join", user?._id);
    newSocket.on(`comment-received-${user?._id}`, (data) => {
      if (data.user !== data.author) {
        setNotification([{ message: data?.message, link: data?.link, show: true }, ...notification]);
        setTimer(10);
      }
    });
    newSocket.on(`reply-received-${user?._id}`, (data) => {
      setNotification([{ message: data?.message, link: data?.link, show: true }, ...notification]);
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
      {showNotificationModal && <Notification notification={notification} setShowNotificationModal={setShowNotificationModal} />}
      <div className="app-layout">
        <CustomNav notification={notification} openNotificationModal={openNotificationModal} />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
}
