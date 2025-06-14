import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useUsers } from '../UserContext';

const DeleteUserDialog = ({ open, onClose, user }) => {
  const { deleteUser } = useUsers(); // Assume deleteUser exists in context

  const handleDelete = () => {
    // deleteUser(user.id);
    console.log("Deleting user (mock):", user.id);
    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the user <strong>{user.name}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;