import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Grid, Alert } from '@mui/material';
import { useUsers } from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';

const CreateResumePage = () => {
  const { users, authenticatedUser } = useUsers();
  const { studentId } = useParams();

  const activeStudent = studentId 
    ? users.find(u => u.id === parseInt(studentId))
    : authenticatedUser;
    
  const [resumeData, setResumeData] = useState({
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activeStudent) {
      setResumeData({
        fullName: activeStudent.name || '',
        email: activeStudent.email || '',
        phone: activeStudent.phone || '',
        summary: activeStudent.summary || '',
        experience: activeStudent.experience || '',
        education: activeStudent.education || '',
      });
    }
  }, [activeStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, this would call an API. Here, we just log it.
    // updateUserResume(activeStudent.id, resumeData); // This function would be in your context
    console.log("Saving Resume data for student:", activeStudent.id, resumeData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  if (!activeStudent) {
    return <Typography>Could not load student data.</Typography>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Create / Edit Resume for {activeStudent.name}
        </Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>Resume Data Saved Successfully!</Alert>}
        <Box component="form" onSubmit={handleSave} noValidate>
          <Grid container spacing={3}>
            {Object.keys(resumeData).map((key) => {
                const isMultiLine = ['summary', 'experience', 'education'].includes(key);
                const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'); // Simple formatting
                
                return (
                    <Grid item xs={12} key={key}>
                        <TextField
                            required
                            fullWidth
                            id={key}
                            name={key}
                            label={label}
                            value={resumeData[key]}
                            onChange={handleChange}
                            multiline={isMultiLine}
                            rows={isMultiLine ? 4 : 1}
                        />
                    </Grid>
                );
            })}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button type="submit" variant="contained" size="large">
              Save Resume Data
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateResumePage;