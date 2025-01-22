import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/employees"
        element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />}
      />
      <Route
        path="/employees/new"
        element={isAuthenticated ? <EmployeeForm /> : <Navigate to="/login" />}
      />
      <Route
        path="/employees/edit/:id"
        element={isAuthenticated ? <EmployeeForm /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
