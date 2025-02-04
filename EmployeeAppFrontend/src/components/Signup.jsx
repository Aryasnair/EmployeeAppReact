
import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInterceptor";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await axiosInstance.post(
        "http://localhost:3000/users/adduser",
        form
      );
      alert("Registration Successfull");
      setForm({ email: "", password: "", confirmPassword: "" });
      navigate("/");
    } catch (error) {
      alert("Failed to Signup. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        margin: "5% auto",
        textAlign: "center",
        backgroundColor: "#cff4d2",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
      }}
    >
      <Typography variant="h3" style={{ color: "#56c596" }}>
        EmployeeApp Register
      </Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirm Password"
          variant="outlined"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />

        {error && (
          <Typography color="error" sx={{ textAlign: "center", mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          style={{
            backgroundColor: "#56c596",
            color: "white",
            marginTop: "20px",
          }}
          type="submit"
          fullWidth
        >
          Register
        </Button>
        <Link
          to={"/"}
          style={{ color: "#56c596", marginTop: "15px", display: "block" }}
        >
          Already registered? Login here
        </Link>
      </form>
    </div>
  );
};

export default Signup;

