import React, { useEffect, useState, useCallback } from "react";
import CustomNav from "../component/navbar/Navbar.tsx";
import "./AppLayout.css";
import io from "socket.io-client";
import { useAuthStore } from "../store.tsx";
import Notification from "../shared/Notification.jsx";
import Sidebar from "../component/side-bar/Sidebar.js";
import Footer from "../component/footer/Footer.tsx";
import axiosInstance from "../config/axios.ts";
const socket = io("http://localhost:3001");

export default function AppLayout({ children }) {
  const { user } = useAuthStore();

  const [notification, setNotification] = useState([]);

  const [timer, setTimer] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const openNotificationModal = useCallback(() => {
    setShowNotificationModal(true);
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      if (user?._id) {
        const res = await axiosInstance.get("/notification");
        if (res.data.success && res.data.notifications.length) {
          setNotification(res.data.notifications);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchNotifications();

    if (user?._id) {
      socket.emit("join", user._id);
    }

    socket.on("connect", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
    });

    socket.on(`receiveNotification`, (data) => {
      if (data.user !== data.to) {
        setNotification((prevNotifications) => [{ message: data?.message, link: data?.link, show: true }, ...prevNotifications]);
        setTimer(10);
      }
    });

    return () => {
      socket.off("receiveNotification");
      socket.disconnect();
    };
  }, [fetchNotifications, user?._id]);

  useEffect(() => {
    if (timer === null) return;
    if (timer === 0) {
      setTimer(null);
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  return (
    <div className="app-layout">
      <Sidebar />
      {showNotificationModal && <Notification notifications={notification} setShowNotificationModal={setShowNotificationModal} />}
      <CustomNav notification={notification} openNotificationModal={openNotificationModal} />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
}
