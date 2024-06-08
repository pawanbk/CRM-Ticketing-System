import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import AppLayout from "../layout/AppLayout";
import { capitalize } from "lodash";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuthStore } from "../store.tsx";
import "./Profile.css";
import UserService from "../api/UserService.js";
import { CustomToaster, Notify } from "../shared/CustomToaster.tsx";

export default function Profile() {
  const { user, setUser } = useAuthStore();

  const [inputs, setInputs] = useState({
    displayName: user?.username || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await UserService.update(inputs);
    if (res.status === 200 && res.data.success === true) {
      setUser(res.data.user);
      Notify("Profile updated successfully", "success");

    }
  }
  return (
    <AppLayout>
      <Breadcrumb className="d-flex justify-center">
        <LinkContainer to="/dashboard">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="wrapper h-auto w-full p-5 bg-white rounded">
        <strong>Edit Profile</strong>
        <div className="grid pt-4">
          <Form.Group className="mb-3 form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control defaultValue={user?.email} disabled />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Display Name</Form.Label>
            <Form.Control required type="text" name="displayName" value={capitalize(inputs.displayName)} disabled />
          </Form.Group>
        </div>
        <div className="grid">
          <Form.Group className="mb-3 form-group">
            <Form.Label>First name</Form.Label>
            <Form.Control required name="firstName" value={capitalize(inputs.firstName)} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Last name</Form.Label>
            <Form.Control required type="text" name="lastName" value={capitalize(inputs.lastName)} onChange={handleChange} />
          </Form.Group>
        </div>
        <button className="customBtn" onClick={handleSubmit}>Save changes</button>
      </div>
      <CustomToaster />
    </AppLayout >
  );
}
