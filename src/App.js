import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateUser from "./components/createUser/CreateUser";
import Lessons from "./components/lessons/Lessons";
import Home from "./home/Home";
import Login from "./components/login/Login";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/lessons" element={<Lessons />} />

        <Route
          exact
          path="/"
          element={isAuth ? <Navigate to="/createUser" /> : <Login />}
        />

        <Route
          path="/createUser"
          element={isAuth ? <CreateUser /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
