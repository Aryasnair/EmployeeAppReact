import React from 'react';
import axios from 'axios';

const EmployeeItem = ({ employee, setEmployees }) => {
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${employee._id}`, {
        headers: { Authorization: token },
      });
      setEmployees((prev) => prev.filter((emp) => emp._id !== employee._id));
    } catch (err) {
      alert('Error deleting employee');
    }
  };

  return (
    <div>
      <h3>{employee.name}</h3>
      <p>{employee.designation}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EmployeeItem;
