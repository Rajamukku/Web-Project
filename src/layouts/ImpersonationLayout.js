import React from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Autocomplete, TextField } from '@mui/material';
import { useUsers } from '../contexts/UserContext';
import StudentLayout from './StudentLayout'; // Reuses the student layout

const ImpersonationLayout = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { users } = useUsers();

  const currentStudent = users.find(u => u.id === parseInt(studentId));

  const handleExitImpersonation = () => {
    navigate('/admin/dashboard');
  };

  const handleSwitchStudent = (event, newValue) => {
    if (newValue) {
      navigate(`/admin/view-as/${newValue.id}/dashboard`);
    }
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ backgroundColor: 'error.main', color: 'white', zIndex: 1301 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>
            ADMIN VIEW: Viewing as student <strong>{currentStudent ? currentStudent.name : '...'}</strong>
          </Typography>
          <Autocomplete
            size="small"
            sx={{
              width: 300,
              mr: 2,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 1,
              '& .MuiInputBase-root': { color: 'white' },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
              '& label': { color: 'white' }
            }}
            options={users}
            getOptionLabel={(option) => option.name}
            onChange={handleSwitchStudent}
            renderInput={(params) => <TextField {...params} label="Switch Student" />}
          />
          <Button color="inherit" variant="outlined" onClick={handleExitImpersonation}>
            Exit Student View
          </Button>
        </Toolbar>
      </AppBar>
      <StudentLayout onLogout={() => {}} /> 
    </Box>
  );
};

export default ImpersonationLayout;