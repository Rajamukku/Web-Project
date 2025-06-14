import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUsers } from '../../contexts/UserContext';

const CompanyDashboard = () => {
  const { jobs, applications, authenticatedUser } = useUsers();

  // Filter jobs posted by the currently logged-in company
  const companyJobs = jobs.filter(job => job.companyId === authenticatedUser.id);
  
  const getApplicantCount = (jobId) => {
    return applications.filter(app => app.jobId === jobId).length;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Welcome, {authenticatedUser.name}</Typography>
      <Typography variant="h6" gutterBottom>Your Posted Jobs</Typography>
      
      <Grid container spacing={3}>
        {companyJobs.length > 0 ? companyJobs.map(job => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2">{job.title}</Typography>
                <Chip 
                  label={job.status} 
                  color={job.status === 'Open' ? 'success' : 'default'} 
                  sx={{ my: 1 }} 
                />
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  Posted on: {job.postedOn}
                </Typography>
                <Typography variant="body2">{job.description.substring(0, 100)}...</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Applicants: {getApplicantCount(job.id)}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button 
                  component={RouterLink} 
                  to={`/company/jobs/${job.id}/applicants`} 
                  variant="contained" 
                  fullWidth
                >
                  View Applicants
                </Button>
              </Box>
            </Card>
          </Grid>
        )) : (
          <Grid item xs={12}>
            <Typography>You have not posted any jobs yet.</Typography>
            <Button component={RouterLink} to="/company/post-job" variant="contained" sx={{ mt: 2 }}>
                Post Your First Job
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CompanyDashboard;