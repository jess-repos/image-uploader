import React from "react";

import "./Button.css";

export default function Button({ children, type, onClick, disabled = false, fullWidth = false }) {
  return (
    <button
      className={`button ${disabled && "disabled"} ${fullWidth && "full-width"}`}
      onClick={onClick}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
