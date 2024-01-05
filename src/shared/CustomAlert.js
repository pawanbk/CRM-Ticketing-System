import React from "react";
import "./CustomAlert.css";
export default function CustomAlert({ error }) {
  return (
    <div className="custom-alert">
      <span>{error}</span>
    </div>
  );
}
