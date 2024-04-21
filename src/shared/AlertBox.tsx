import Alert from "react-bootstrap/Alert";
import { AlertHeading } from "react-bootstrap";
import React from "react";

export default function AlertBox({ variant, heading, message }) {
  return (
    <Alert variant={variant} className="mt-2">
      <AlertHeading className="h6">{heading}</AlertHeading>
        <p>{message}</p>
    </Alert>
  );
}
