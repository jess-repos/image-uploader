import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export default function Toast() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar
      pauseOnFocusLoss={false}
      newestOnTop
      closeOnClick
      rtl={false}
    />
  );
}
