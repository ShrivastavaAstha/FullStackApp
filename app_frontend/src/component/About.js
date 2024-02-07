import React from "react";
import logoimage from "./logo.png";

import "./About.css";
const About = () => {
  return (
    <div className="about">
      <div>
        <img className="logo" src={logoimage} alt="Logo" />
        <h3 style={{ marginLeft: "6px", color: "rgb(76, 66, 163)" }}>
          LIFESYNC
        </h3>
      </div>
      <div className="gif">
        <iframe
          src="https://giphy.com/embed/ynDRqah8Ii8yaPUP5K"
          width="480"
          height="480"
          frameBorder="0"
          class="giphy-embed"
          style={{ height: "300px" }}
        ></iframe>
      </div>

      <div className="headingabt">
        <b>About LIFESYNC</b>
      </div>
      <br />
      <div className="about-contain">
        <p>
          LifeSync is a chating app where you can uplaod your photos and chat
          with your friends and family.
        </p>
        <p className="about-contain-item2" style={{ color: "white" }}></p>
      </div>
      <iframe
        src="https://giphy.com/embed/UWyaZogug8tsphSgQH"
        width="480"
        height="460"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
        style={{
          height: "300px",
        }}
      ></iframe>
    </div>
  );
};
export default About;
