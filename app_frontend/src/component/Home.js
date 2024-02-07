import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logoimage from "./logo.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="home">
        <div className="logo-containerH">
          <img className="logo" src={logoimage} alt="Logo" />
          <h3 style={{ color: "rgb(76, 66, 163)", marginLeft: "6px" }}>
            LIFESYNC
          </h3>
        </div>
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
            <br />
            <button
              onClick={() => {
                navigate("/About");
              }}
            >
              About
            </button>
          </div>
        </div>

        <iframe
          src="https://giphy.com/embed/hfPrtEum1YA65sBhxw"
          width="336"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
          style={{ marginTop: "460px", height: "230px", marginLeft: "-80px" }}
        ></iframe>
        <p>
          <a href="https://giphy.com/stickers/couple-rain-umbrella-hfPrtEum1YA65sBhxw"></a>
        </p>
      </div>
    </>
  );
};
export default Home;
