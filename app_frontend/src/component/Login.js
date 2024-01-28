import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import logoimage from "./logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isOtpSent, setisOtpSent] = useState(false);
  const [otp, setOtp] = useState(null);

  const loginbtn = async () => {
    try {
      if (email.trim() === "" || password.trim() === "")
        return toast.warning("Please Provide Complete Details.");

      const response = await axios.post("/api/login", { email, password });
      if (response.data.success) {
        toast.success(response.data.message);
        setisOtpSent(true);
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

  const handleOtpVerify = async () => {
    try {
      if (email.trim() === "" || password.trim() === "")
        return toast.warning("Please Provide Complete Details.");
      const response = await axios.post("/api/mfaverify", {
        email,
        password,
        code: otp,
      });
      if (response.data.success) {
        toast.success("Welcome To LIFESYNC!");
        navigate("/profile");
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
      <div className="container">
        <div className="form-container sign-in">
          <form>
            <h1>Login</h1>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
            />{" "}
            <br />
            <br />
            {isOtpSent ? (
              <div>
                <label style={{ color: "blue" }}>
                  Enter the OTP sent to the registered contact number.
                </label>
                <input
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                />
              </div>
            ) : (
              <></>
            )}
            <button
              type="button"
              onClick={() => {
                if (isOtpSent) {
                  handleOtpVerify();
                } else {
                  loginbtn();
                }
              }}
            >
              Login
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1> Welcome</h1>
              <p>Enter your details to use features .</p>
              <p>New to the app?</p>

              <button
                className="hidden"
                onClick={() => {
                  navigate("/Signup");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
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

export default Login;
