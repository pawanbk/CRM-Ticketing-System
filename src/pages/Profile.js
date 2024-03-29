import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import AppLayout from "../layout/AppLayout";
import { capitaliseFirstLetter } from "../utils/String";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { userInfo } from "./UserActions";

export default function Profile() {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch]);
  return (
    <AppLayout>
      <Breadcrumb>
        <LinkContainer to="/dashboard">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Title>My Profile</Card.Title>
        <Card.Body>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control defaultValue={userData.email} disabled />
          </Form.Group>
          <Form.Group className="mb-3 form-group">
            <Form.Label>Full name</Form.Label>
            <Form.Control required type="text" name="fullName" defaultValue={capitaliseFirstLetter(userData.fullName)} />
          </Form.Group>
        </Card.Body>
      </Card>
    </AppLayout>
  );
}
