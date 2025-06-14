import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Button, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { useUsers } from '../../contexts/UserContext';

const Applicants = ({ isAdminView = false }) => {
  const { jobId } = useParams();
  const { jobs, applications, users, updateApplicationStatus } = useUsers();

  const job = jobs.find(j => j.id === parseInt(jobId));
  const jobApplications = applications.filter(app => app.jobId === parseInt(jobId));
  
  const applicants = jobApplications.map(app => {
    const student = users.find(u => u.id === app.studentId);
    return { ...app, student };
  });

  const handleStatusChange = (applicationId, newStatus) => {
    updateApplicationStatus(applicationId, newStatus);
  };

  if (!job) {
    return <Typography>Job not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Applicants for {job.title}</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Company: {job.companyName}
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Applied On</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length > 0 ? applicants.map(({ id, student, status, appliedOn }) => (
              student && ( // Ensure student exists before rendering row
                <TableRow key={id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{appliedOn}</TableCell>
                  <TableCell>
                    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={status}
                        label="Status"
                        onChange={(e) => handleStatusChange(id, e.target.value)}
                        disabled={isAdminView}
                      >
                        <MenuItem value="Applied">Applied</MenuItem>
                        <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                        <MenuItem value="Interview">Interview</MenuItem>
                        <MenuItem value="Hired">Hired</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Button
                      component={RouterLink}
                      to={`/generate-resume/${student.id}`}
                      target="_blank"
                      variant="outlined"
                    >
                      View Resume
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )) : (
              <TableRow>
                <TableCell colSpan={6} align="center">No applicants for this job yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Applicants;