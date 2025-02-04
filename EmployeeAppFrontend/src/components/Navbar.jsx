import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInterceptor";

const Navbar = () => {

 const navigate = useNavigate();
 
 const role = sessionStorage.getItem("role");

 const handleLogout = () => {
   sessionStorage.removeItem("logintoken");
   alert("Logged Out");
   navigate("/");
 };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#56c596" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ color: "black" }}
            >
              EmployeeApp
            </Typography>

            <Link to={"/employees"}>
              <Button style={{ color: "black" }}>HOME</Button>{" "}
            </Link>
            {role == "admin" && (
              <Link to={"/addemployees"}>
                <Button style={{ color: "black" }}>ADDEMPLOYEE</Button>
              </Link>
            )}
            <Link to={"/"}>
              <Button style={{ color: "black" }} onClick={handleLogout}>
                LOGOUT
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar
