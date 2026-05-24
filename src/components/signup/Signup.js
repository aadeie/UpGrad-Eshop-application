
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

import "./Signup.css";

function Signup() {

  const navigate = useNavigate();

  const [signupData, setSignupData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
    });

  const handleChange = (e) => {

    setSignupData({
      ...signupData,
      [e.target.name]:
        e.target.value,
    });
  };

  const signup = async () => {

    if (
      signupData.password !==
      signupData.confirmPassword
    ) {

      alert("Passwords do not match");

      return;
    }

    try {

      await api.post("/auth/signup", {
        firstName:
          signupData.firstName,
        lastName:
          signupData.lastName,
        email:
          signupData.email,
        password:
          signupData.password,
        contactNumber:
          signupData.contactNumber,
      });

      alert(
        "Registration successful"
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Signup failed");
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
            Sign up
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="First Name *"
            name="firstName"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Last Name *"
            name="lastName"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email Address *"
            name="email"
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

          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password *"
            type="password"
            name="confirmPassword"
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Contact Number *"
            name="contactNumber"
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signup}
          >
            SIGN UP
          </Button>

          <Typography variant="body2">

            Already have an account?{" "}

            <Link to="/login">
              Sign in
            </Link>

          </Typography>

        </Card>

      </div>

    </>
  );
}

export default Signup;