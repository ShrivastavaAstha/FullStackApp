import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Code = () => {
  const [code, setcode] = useState("");

  const codebtn = async () => {
    if (code.trim() === "")
      return toast.warning("Please Provide Complete Details.");

    const response = await axios.post("/api/mfaverify", { code });
    if (response.data.success) {
      toast.success("Login Successfull");
    } else toast.error("Incorrect OTP");
  };
  return (
    <>
      <ToastContainer />
      <div className="content">
        <h1>Verify Your Identity </h1>
        <br />
        <br />
        <h5>We've sent a text message to the registered contact number.</h5>
        <br />{" "}
        <input
          type="Number"
          value={code}
          onChange={(e) => setcode(e.target.value)}
          placeholder=" Enter the code"
        />
        <br />
        <Link to="/Signup">
          <button onClick={() => codebtn()}>Continue</button>
        </Link>
      </div>
    </>
  );
};
export default Code;
