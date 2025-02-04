import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInterceptor";

const EmployeeList = () => {
  const [cardData, setData] = useState([]);
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    axiosInstance
      .get("http://localhost:3000/employee/employees")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, []);

  const update_data = (val) => {
    navigate("/addemployees", { state: { val } });
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axiosInstance
        .delete(`http://localhost:3000/employee/deleteemployee/${id}`)
        .then(() => {
          setData(cardData.filter((item) => item._id !== id));
          alert("Employee deleted successfully!");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to delete the employee.");
        });
    }
  };

  return (
    <div style={{ margin: "5%" }}>
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((row) => (
          <Grid item xs={12} sm={6} md={4} key={row._id}>
            <Card
              sx={{
                backgroundColor: "#cff4d2",
                textAlign: "center",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {row.employeeName}
                </Typography>
                <Typography variant="body2">
                  Designation: {row.employeeDesignation}
                </Typography>
                <Typography variant="body2">
                  Department: {row.employeeDepartment}
                </Typography>
                <Typography variant="body2">
                  Salary: {row.employeeSalary}
                </Typography>
                <Typography variant="body2">
                  Location: {row.employeeLocation}
                </Typography>
              </CardContent>
              {role === "admin" && (
                <CardActions style={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "#56c596",
                      color: "white",
                      marginRight: "10px",
                    }}
                    variant="contained"
                    onClick={() => update_data(row)}
                  >
                    Update
                  </Button>
                  <Button
                    size="small"
                    style={{ backgroundColor: "#56c258", color: "white" }}
                    variant="contained"
                    onClick={() => deleteEmployee(row._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default EmployeeList;
