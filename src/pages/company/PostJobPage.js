import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Grid, Alert } from '@mui/material';
import { useUsers } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const PostJobPage = () => {
  const { addJob, authenticatedUser } = useUsers();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    requiredSkills: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJob({
      ...jobDetails,
      companyId: authenticatedUser.id,
      companyName: authenticatedUser.name,
    });
    setSuccess(true);
    setTimeout(() => navigate('/company/dashboard'), 2000);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Post a New Job
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>Job posted successfully! Redirecting...</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required fullWidth id="title" name="title"
                label="Job Title" value={jobDetails.title} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth multiline rows={6} id="description" name="description"
                label="Job Description" value={jobDetails.description} onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required fullWidth id="requiredSkills" name="requiredSkills"
                label="Required Skills (comma-separated)" value={jobDetails.requiredSkills} onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button type="submit" variant="contained" size="large">
              Post Job
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostJobPage;