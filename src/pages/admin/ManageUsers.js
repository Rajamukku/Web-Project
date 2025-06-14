import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  IconButton, Box, Button, Tooltip, Link, TextField
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { useUsers } from '../../contexts/UserContext';
import UpdateUserDialog from '../../contexts/admin/UpdateUserDialog';
import AddUserDialog from '../../contexts/admin/AddUserDialog';
import DeleteUserDialog from '../../contexts/admin/DeleteUserDialog';

const ManageUsers = () => {
  const { users } = useUsers();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenEditDialog = (user) => { setUserToEdit(user); setEditDialogOpen(true); };
  const handleOpenDeleteDialog = (user) => { setUserToDelete(user); setDeleteDialogOpen(true); };
  const handleViewAsStudent = (userId) => { navigate(`/admin/view-as/${userId}/dashboard`); };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
          Manage Student Accounts
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddDialogOpen(true)}>
          Add New Student
        </Button>
      </Box>

      <TextField fullWidth variant="outlined" label="Search by name or username"
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Link component={RouterLink} to={`/admin/view-as/${user.id}/my-applications`} underline="hover">
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="View as Student">
                      <IconButton color="secondary" onClick={() => handleViewAsStudent(user.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit User">
                      <IconButton color="primary" onClick={() => handleOpenEditDialog(user)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User">
                      <IconButton color="error" onClick={() => handleOpenDeleteDialog(user)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No students found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogs */}
      <AddUserDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
      <UpdateUserDialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} user={userToEdit} />
      <DeleteUserDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} user={userToDelete} />
    </>
  );
};

export default ManageUsers;