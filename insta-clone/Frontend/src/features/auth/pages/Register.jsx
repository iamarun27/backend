import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister(username,email,password)
    navigate('/')

    if (loading) {
      return (
        <main>
          <h1>Loading...</h1>
        </main>
      );
    }

    // axios
    //   .post(
    //     "http://localhost:3000/api/auth/register",
    //     {
    //       username,
    //       email,
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="enter password"
          />
          <button>Register</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Register;
