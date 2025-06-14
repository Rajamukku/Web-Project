// src/pages/LoginPage.js

import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, Grid, Paper, TextField, Typography, Radio, RadioGroup,
  FormControlLabel, FormControl, FormLabel, Checkbox, Link, IconButton, InputAdornment, Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import LOGO_URL from '../assets/parul-logo.png';
import CAMPUS_IMG_URL from '../assets/parul-gate.jpg';
const GOOGLE_ICON_URL = 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg';

const mockUsersByRole = {
  staff: {
    admin: { password: 'adminpassword' },
  },
  student: {
    student: { password: 'studentpassword' },
    'jane.s': { password: 'password123' },
  },
  // --- NEW: Add company credentials ---
  company: {
    company: { password: 'companypassword' },
    finance: { password: 'financepassword' },
  }
};

const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const usersForSelectedRole = mockUsersByRole[role];
    if (!usersForSelectedRole) {
      setError("An internal error occurred. Invalid role.");
      return;
    }

    const userCredentials = usersForSelectedRole[username];

    if (userCredentials && userCredentials.password === password) {
      const systemRole = (role === 'staff') ? 'admin' : role;
      onLogin(systemRole, username);
    } else {
      setError("Invalid username or password for the selected role.");
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item xs={false} sm={4} md={7}
        sx={{
          backgroundImage: `url(${CAMPUS_IMG_URL})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400 }}>
          <img src={LOGO_URL} alt="Parul University Logo" style={{ width: '250px', marginBottom: '1rem' }} />
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            
            <FormControl component="fieldset" required>
              <FormLabel component="legend">* Role</FormLabel>
              <RadioGroup row aria-label="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <FormControlLabel value="staff" control={<Radio />} label="Staff" />
                <FormControlLabel value="student" control={<Radio />} label="Student" />
                {/* --- NEW: Company Role Option --- */}
                <FormControlLabel value="company" control={<Radio />} label="Company" />
              </RadioGroup>
            </FormControl>

            <TextField
              margin="normal" required fullWidth id="username"
              label="Username (try 'admin', 'student', 'company')"
              name="username" autoComplete="username" autoFocus
              value={username} onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal" required fullWidth name="password" label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password" autoComplete="current-password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {/* The rest of the form is unchanged */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 2 }}>
              <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#00a896', '&:hover': { backgroundColor: '#00897b' } }}>
                Login
              </Button>
              <Button component={RouterLink} to="/forgot-password" fullWidth variant="contained" color="error">
                Forgot Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;