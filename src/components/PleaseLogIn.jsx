import React from "react";
import { useNavigate } from "react-router-dom";

export default function PleaseLogIn() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p className="text-white" style={{ fontSize: "36px" }}>
        Please Log In
      </p>
      <button
        type="submit"
        className="btn btn-md text-white"
        onClick={() => navigate("/")}
        style={{ backgroundColor: "#31c3a0" }}
      >
        Return to Home
      </button>
    </div>
  );
}
