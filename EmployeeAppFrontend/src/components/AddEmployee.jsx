import { Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosInterceptor";

const AddEmployee = () => {
  const [employeeData, setData] = useState({
    employeeName: "",
    employeeDesignation: "",
    employeeSalary: "",
    employeeDepartment: "",
    employeeLocation: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  function addEmployee() {
    if (location.state != null) {
      axiosInstance
        .put(
          "http://localhost:3000/employee/editemployee/" +
            location.state.val._id,
          employeeData
        )
        .then((res) => {
          alert(res.data.message);
          navigate("/employees");
        });
    } else {
      axiosInstance
        .post("http://localhost:3000/employee/addemployee", employeeData)
        .then((res) => {
          alert("Employee added");
          navigate("/employees");
        });
    }
  }

  // use useEffect - while the page loading the data should be filled (for update only)
  // useLocation -  for to access the data that passed with the navigate through state

  useEffect(() => {
    if (location.state != null) {
      setData({
        ...employeeData,
        employeeName: location.state.val.employeeName,
        employeeDesignation: location.state.val.employeeDesignation,
        employeeSalary: location.state.val.employeeSalary,
        employeeDepartment: location.state.val.employeeDepartment,
        employeeLocation: location.state.val.employeeLocation,
      });
    } else {
      setData({
        ...employeeData,
        employeeName: "",
        employeeDesignation: "",
        employeeSalary: "",
        employeeDepartment: "",
        employeeLocation: "",
      });
    }
  }, []);

  return (
    <div>
      <div style={{ margin: "8%", textAlign: "center" }}>
        <Typography variant="h3" style={{ color: "#56c596" }}>
          Add Employee
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, md: 6 }}>
            <TextField
              fullWidth
              label="Employee Name"
              variant="outlined"
              name="employeeName"
              value={employeeData.employeeName}
              onChange={(e) => {
                setData({ ...employeeData, employeeName: e.target.value });
              }}
            ></TextField>
          </Grid>

          <Grid size={{ xs: 6, md: 6 }}>
            <TextField
              fullWidth
              label="Employee Designation"
              variant="outlined"
              name="employeeDesignation"
              value={employeeData.employeeDesignation}
              onChange={(e) => {
                setData({
                  ...employeeData,
                  employeeDesignation: e.target.value,
                });
              }}
            ></TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Employee Salary"
              variant="outlined"
              name="employeeSalary"
              value={employeeData.employeeSalary}
              onChange={(e) => {
                setData({ ...employeeData, employeeSalary: e.target.value });
              }}
            ></TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Employee Department"
              variant="outlined"
              name="employeeDepartment"
              value={employeeData.employeeDepartment}
              onChange={(e) => {
                setData({
                  ...employeeData,
                  employeeDepartment: e.target.value,
                });
              }}
            ></TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Employee Location"
              variant="outlined"
              name="employeeLocation"
              value={employeeData.employeeLocation}
              onChange={(e) => {
                setData({
                  ...employeeData,
                  employeeLocation: e.target.value,
                });
              }}
            ></TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <Button
              color="black"
              variant="outlined"
              onClick={addEmployee}
              style={{ backgroundColor: "#56c596" }}
            >
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddEmployee;
