import { useRef } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./Profile.css";
import logoimage from "./logo.png";

const Profile = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <img className="logo" src={logoimage} alt="Logo" />
      <nav ref={navRef}>
        <h3 style={{ borderBottom: "white solid 2px" }}>LIFESYNC</h3>
        <Link to="/">LogOut</Link>
        <Link to="/Logout">Login</Link>
        <Link to="/Signup">Signup</Link>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <MenuIcon />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <MenuIcon />
      </button>
    </header>
  );
};

export default Profile;
