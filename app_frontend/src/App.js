import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Otp from "./component/Otp";
import Home from "./component/Home";
import Profile from "./component/Profile";
import PageNotFound from "./component/PageNotFound";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="*" Component={PageNotFound} />
          <Route path="/Login" Component={Login} />
          <Route path="/Otp" Component={Otp} />
          <Route path="/Signup" Component={Signup} />
          <Route path="/Profile" Component={Profile} />
        </Routes>
      </Router>
      {/* <Login /> */}
      {/* <Signup /> */}
    </>
  );
};

export default App;
