import { useState } from "react";
import io from "socket.io-client";
import Home from "./Home/Home";
import RegisterForm from "../components/registerForm";
import LoginForm from "../components/loginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../styles/globalStyles";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

// const socket = io("http://localhost:1337"); // Add this -- our server will run on port 1337, so we connect to it from here

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
  });

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<RegisterForm />} />
        <Route
          path="login"
          element={<LoginForm setToken={setToken} setUser={setUser} />}
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard user={user} token={token} />
            </ProtectedRoute>
          }
        />
        <Route path="dashboard/:roomId" element={<div>This is a room</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
