import React, { useState } from "react";
import "../styles/form.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading....</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await handleLogin(username, password);
    navigate("/");

    // axios
    //   .post(
    //     "http://localhost:3000/api/auth/login",
    //     {
    //       username,
    //       password,
    //     },
    //     {
    //       withCredentials: true,
    //     },
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username "
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
