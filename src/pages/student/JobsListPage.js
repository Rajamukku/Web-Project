import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { useUsers } from '../../contexts/UserContext';

const JobsListPage = () => {
  const { jobs, applications, authenticatedUser, applyForJob } = useUsers();

  const openJobs = jobs.filter(job => job.status === 'Open');

  const hasApplied = (jobId) => {
    if (!authenticatedUser) return false;
    return applications.some(app => app.jobId === jobId && app.studentId === authenticatedUser.id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Available Job Postings</Typography>
      <Grid container spacing={3}>
        {openJobs.length > 0 ? openJobs.map(job => (
          <Grid item xs={12} md={6} lg={4} key={job.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">{job.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">{job.companyName}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {job.description}
                </Typography>
                <Typography variant="subtitle2">
                  <strong>Skills:</strong> {job.requiredSkills}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => applyForJob(job.id, authenticatedUser.id)}
                  disabled={hasApplied(job.id)}
                >
                  {hasApplied(job.id) ? 'Applied' : 'Apply Now'}
                </Button>
              </Box>
            </Card>
          </Grid>
        )) : (
          <Grid item xs={12}>
            <Typography>No open jobs at the moment. Please check back later.</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default JobsListPage;