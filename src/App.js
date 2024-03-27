import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateUser from "./components/createUser/CreateUser";
import Lessons from "./components/lessons/Lessons";
import Home from "./home/Home";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/lessons" element={<Lessons />} />
      </Routes>
    </div>
  );
};

export default App;
