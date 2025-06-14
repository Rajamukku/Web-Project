import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import { useUsers } from '../UserContext';

const AddUserDialog = ({ open, onClose }) => {
  const [newUser, setNewUser] = useState({ name: '', username: '', password: '' });
  const [error, setError] = useState('');
  const { addUser } = useUsers(); // Assume addUser is in your context

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!newUser.name || !newUser.username || !newUser.password) {
      setError('All fields are required.');
      return;
    }
    // In a real app, you would call your API. Here we call a mock context function.
    // addUser(newUser); 
    console.log("Adding user (mock):", newUser);
    onClose();
    setNewUser({ name: '', username: '', password: '' }); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Student</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <TextField autoFocus margin="dense" name="name" label="Full Name" type="text" fullWidth variant="outlined" onChange={handleChange} />
        <TextField margin="dense" name="username" label="Username" type="text" fullWidth variant="outlined" onChange={handleChange} />
        <TextField margin="dense" name="password" label="Password" type="password" fullWidth variant="outlined" onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">Add Student</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;