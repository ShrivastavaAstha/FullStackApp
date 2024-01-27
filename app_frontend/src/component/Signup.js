import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

import logoimage from "./logo.png";
const SignUp = () => {
  const navigate = useNavigate();

  const [username, setname] = useState("");
  const [contact, setcontact] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signupbtn = async () => {
    try {
      if (
        username.trim() === "" ||
        contact.trim() === "" ||
        email.trim() === "" ||
        password.trim() === ""
      )
        return;
      toast.warning("Please Provide Complete Details.");
      if (contact.length < 10) return;
      toast.warning("Please provide a valid contact number.");
      setname("");
      setcontact("");
      setemail("");
      setpassword("");

      const response = await axios.post("/api/signup", {
        username,
        contact,
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        toast.success("Account created successfully!");
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
  return (
    <div className="login">
      <ToastContainer />
      <div className="logo-container">
        <img className="logo" src={logoimage} alt="Logo" />
      </div>
      <div className="container1">
        <div className="form-container1 sign-up">
          <form>
            <h1 className="heading">Sign Up</h1>
            <br />
            <input
              value={username}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <br />
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="text"
              placeholder="Email"
            />
            <br />
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <br />
            <input
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
              type="number"
              placeholder="Contact Number"
            />
            <br />
            <button onClick={() => signupbtn()}>Sign Up</button>
          </form>
        </div>
        <div className="toggle-container1">
          <div className="toggle1">
            <div className="toggle-panel1 toggle-left">
              <h1>Welcome</h1>
              <p>Enter your details to use features .</p>
              <p>Already have an account?</p>

              <button
                className="hidden"
                onClick={() => {
                  navigate("/Login");
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="logout"
        onClick={() => {
          navigate("/");
        }}
      >
        LogOut
      </button>
    </div>
  );
};
export default SignUp;
