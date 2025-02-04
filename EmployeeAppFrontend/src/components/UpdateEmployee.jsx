import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployee = ({ match }) => {
  const [employeeData, setEmployeeData] = useState({
    employeeName: "",
    employeeDesignation: "",
    employeeSalary: "",
    employeeDepartment: "",
    employeeLocation: "",
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/employee/${match.params.id}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [match.params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    try {
      const response = await axios.put(
        `http://localhost:5000/employee/update/${match.params.id}`,
        employeeData,
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token for authorization
        }
      );
      console.log(response.data);
      alert("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employeeName"
          value={employeeData.employeeName}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="employeeDesignation"
          value={employeeData.employeeDesignation}
          onChange={handleChange}
          placeholder="Designation"
          required
        />
        <input
          type="text"
          name="employeeSalary"
          value={employeeData.employeeSalary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />
        <input
          type="text"
          name="employeeDepartment"
          value={employeeData.employeeDepartment}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          type="text"
          name="employeeLocation"
          value={employeeData.employeeLocation}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
