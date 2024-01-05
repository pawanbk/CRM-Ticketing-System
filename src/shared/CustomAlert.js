import React from "react";
import "./CustomAlert.css";
export default function CustomAlert({ variant, error }) {
  const classes = `custom-alert alert-${variant}`;
  return (
    <div className={classes}>
      <span>{error}</span>
    </div>
  );
}
