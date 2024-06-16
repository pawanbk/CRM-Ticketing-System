import React, { useEffect, useState } from "react";
import CustomNav from "../component/navbar/Navbar.tsx";
import "./AppLayout.css";
import io from "socket.io-client";
import { useAuthStore } from "../store.tsx";
import Notification from "../shared/Notification.jsx";
import Sidebar from "../component/side-bar/Sidebar.js";
import Footer from "../component/footer/Footer.tsx";
import { set } from "lodash";
import axiosInstance from "../config/axios.ts";
const socket = io("http://localhost:3001");

export default function AppLayout({ children }) {
  const { user } = useAuthStore();

  const [notification, setNotification] = useState([]);

  const [timer, setTimer] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const openNotificationModal = () => {
    setShowNotificationModal(true);
  };

  const fetchNotifications = async () => {
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
  };

  useEffect(() => {
    fetchNotifications();
    if (user?._id) socket.emit("join", user._id);
    socket.on("connect", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
    });
    socket.on(`receiveNotification`, (data) => {
      if (data.user !== data.to) {
        setNotification([{ message: data?.message, link: data?.link, show: true }, ...notification]);
        setTimer(10);
      }
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
      socket.disconnect();
    };
  });
  return (
    <>
      <Sidebar />
      {showNotificationModal && <Notification notifications={notification} setShowNotificationModal={setShowNotificationModal} />}
      <div className="app-layout">
        <CustomNav notification={notification} openNotificationModal={openNotificationModal} />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
}
