import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logoimage from "./logo.png";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="logo-containerH">
        <img className="logo" src={logoimage} alt="Logo" />
      </div>
      <br />
      <br />
      <div className="center">
        <h1>Welcome to LifeSync!</h1>

        <div className="content">
          <button
            className="glow-on-hover"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;
