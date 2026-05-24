import "./Login.css";

import { useState } from "react";

import {
  Card,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import LockOutlinedIcon
from "@mui/icons-material/LockOutlined";

import { Link, useNavigate }
from "react-router-dom";

import Navbar
from "../navbar/Navbar";

import api from "../../common/api";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] =
    useState({
      username: "",
      password: "",
    });

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]:
        e.target.value,
    });
  };

  const login = async () => {

    try {

      const response =
        await api.post(
          "/auth/signin",
          loginData
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      localStorage.setItem(
        "email",
        response.data.email
      );

      navigate("/products");

    } catch (error) {

      console.error(error);

      alert("Invalid credentials");
    }
  };

  return (
    <>

      <Navbar />

      <div className="auth-container">

        <Card className="auth-card">

          <div className="auth-icon-container">

            <LockOutlinedIcon
              className="auth-icon"
            />

          </div>

          <Typography
            variant="h4"
            sx={{ mb: 3 }}
          >
            Sign in
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Email Address *"
            name="username"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password *"
            type="password"
            name="password"
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={login}
          >
            SIGN IN
          </Button>

          <Typography variant="body2">

            Don't have an account?{" "}

            <Link to="/signup">
              Sign Up
            </Link>

          </Typography>

        </Card>

      </div>

    </>
  );
}

export default Login;