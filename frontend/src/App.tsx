import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";
import Menu from "components/Menu";
import PrivateRoute from "components/PrivateRoute";
import AuthService from "services/services";

function App() {
  return (
    <main>
      <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </main>
  );
}

export default App;
