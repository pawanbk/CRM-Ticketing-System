import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppLayout from "../layout/AppLayout";
import { getFreshAccessToken } from "../api/tokenApi";
import { userInfo } from "./UserActions";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    // getFreshAccessToken();
    dispatch(userInfo());
  }, [dispatch]);
  return (
    <AppLayout>
      <Breadcrumb>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    </AppLayout>
  );
}
