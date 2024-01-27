import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Otp from "./component/Otp";
import Home from "./component/Home";
import Profile from "./component/Profile";
import NotFound from "./component/NotFound";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/Login" Component={Login} />
          <Route path="/Otp" Component={Otp} />
          <Route path="/Signup" Component={Signup} />
          <Route path="/Profile" Component={Profile} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
