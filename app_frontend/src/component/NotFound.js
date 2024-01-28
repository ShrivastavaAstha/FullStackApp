import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound">
      <br />
      <h1
        style={{
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px blue",
        }}
      >
        Page Not Found
        <br />
        Error 404
      </h1>
      <br />
      <br />
      <br />

      <div style={{ textAlign: "center" }}>
        <button
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
      <div
        style={{
          fontSize: "400px",
          textAlign: "center",
        }}
      >
        👾
      </div>
    </div>
  );
};
export default NotFound;
