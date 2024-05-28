import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import AppLayout from "../layout/AppLayout";
import { capitalize } from "lodash";
import { Breadcrumb } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuthStore } from "../store.tsx";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuthStore();
  return (
    <AppLayout>
        <Breadcrumb className="d-flex justify-center">
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
              <Form.Control defaultValue={user?.email} disabled />
            </Form.Group>
            <Form.Group className="mb-3 form-group">
              <Form.Label>Full name</Form.Label>
              <Form.Control required type="text" name="fullName" defaultValue={capitalize(user?.username)} />
            </Form.Group>
          </Card.Body>
        </Card>
    </AppLayout>
  );
}
