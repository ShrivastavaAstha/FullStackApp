import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Profile.css";
import logoimage from "./logo.png";

const Profile = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState();

  const getUserData = async () => {
    try {
      const response = await axios.get("/currentuser");
      if (response.data.success) {
        setuserdata(response.data.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error("Session timed out! Login again");
        navigate("/Login");
      } else if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        toast.error(error.response.data.error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");
      if (response.data.success) {
        toast.success("You were logged out successfully");
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        toast.error(error.response.data.error);
      }
    }
  };
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  useEffect(() => {
    getUserData();
  }, []);
  if (userdata)
    return (
      <>
        <header>
          <img className="logo" src={logoimage} alt="Logo" />
          <nav ref={navRef}>
            <h3 style={{ borderBottom: "white solid 2px" }}>LIFESYNC</h3>
            <Link to="/">Login</Link>
            <button
              type="button"
              onClick={() => handleLogout()}
              style={{
                backgroundColor: "transparent",
                color: "white",
                fontSize: "22px",
              }}
            >
              Logout
            </button>
            <Link to="/Signup">Signup</Link>

            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
              <MenuIcon />
            </button>
          </nav>
          <button className="nav-btn" onClick={showNavbar}>
            <MenuIcon />
          </button>
        </header>
        <br />
        <ToastContainer />
        <div className="mainbody">
          <marquee>
            <h1
              style={{
                color: "white",
                fontFamily: "cursive",
                textShadow: "2px 2px blue",
              }}
            >
              Hello! {userdata.username}, Welcome To LIFESYNC .
            </h1>
          </marquee>
          <p
            style={{
              color: "white",
              fontFamily: "inherit",
              marginLeft: "20px",
            }}
          >
            Age:{" "}
            {new Date().getFullYear() - new Date(userdata.dob).getFullYear()}{" "}
            Years
          </p>
          <p
            style={{
              color: "white",
              fontFamily: "inherit",
              marginLeft: "20px",
            }}
          >
            Email: {userdata.email}
          </p>
          <p
            style={{
              color: "white",
              fontFamily: "inherit",
              marginLeft: "20px",
            }}
          >
            Contact Number: {userdata.contact}
          </p>

          <button
            type="button"
            onClick={() => handleLogout()}
            style={{
              backgroundColor: "transparent",
              color: "white",
              fontSize: "22px",
            }}
          >
            Logout
          </button>
        </div>
      </>
    );
};

export default Profile;
