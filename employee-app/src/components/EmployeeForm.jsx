import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../axios';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: '',
    designation: '',
    salary: '',
    department: '',
    location: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fetchEmployee = async () => {
    if (id) {
      const { data } = await API.get(`/employees/${id}`);
      setForm(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await API.put(`/employees/${id}`, form);
      } else {
        await API.post('/employees', form);
      }
      navigate('/employees');
    } catch (err) {
      console.error('Error saving employee');
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        {id ? 'Edit Employee' : 'Add Employee'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            required
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            name="designation"
            label="Designation"
            fullWidth
            required
            value={form.designation}
            onChange={handleChange}
          />
          <TextField
            name="salary"
            label="Salary"
            type="number"
            fullWidth
            required
            value={form.salary}
            onChange={handleChange}
          />
          <TextField
            name="department"
            label="Department"
            fullWidth
            required
            value={form.department}
            onChange={handleChange}
          />
          <TextField
            name="location"
            label="Location"
            fullWidth
            required
            value={form.location}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" fullWidth>
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default EmployeeForm;
