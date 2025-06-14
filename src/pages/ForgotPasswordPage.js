import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
    Box, 
    Button, 
    Container, 
    Paper, 
    TextField, 
    Typography, 
    Alert,
    Link // <--- ADD THIS IMPORT
} from '@mui/material';
import LOGO_URL from '../assets/parul-logo.png';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Password reset requested for email: ${email}`);
    setSuccess(true);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '90vh' }}>
      <Paper elevation={8} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <img src={LOGO_URL} alt="Parul University Logo" style={{ width: '250px', marginBottom: '1rem' }} />
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Forgot Password
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Enter your email address and we'll send you a link to reset your password.
        </Typography>
        
        {success ? (
          <Alert severity="success" sx={{ width: '100%' }}>
            If an account with that email exists, a password reset link has been sent.
          </Alert>
        ) : (
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send Reset Link
            </Button>
          </Box>
        )}
        
        {/* THIS IS THE LINE THAT WAS CAUSING THE ERROR */}
        <Link component={RouterLink} to="/login" variant="body2" sx={{ mt: 2 }}>
          Back to Login
        </Link>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;