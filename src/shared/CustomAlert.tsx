import React from "react";
import "./CustomAlert.css";
export default function CustomAlert({ variant, message }) {
  const classes = `custom-alert alert-${variant}`;
  return (
    <div className={classes}>
      <span>{message}</span>
    </div>
  );
}
