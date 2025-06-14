import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Link,
  TableContainer,
  Button
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkIcon from '@mui/icons-material/Work';
import { useUsers } from '../../contexts/UserContext';

// A reusable component for displaying a single statistic
const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="body2">{title}</Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box sx={{ color: color, fontSize: 48 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  // Get all data from the context
  const { users, companies, jobs, applications } = useUsers();

  // Calculate statistics based on the mock data
  const totalStudents = users.length;
  const totalCompanies = companies.length;
  const openJobs = jobs.filter(j => j.status === 'Open').length;
  
  // Calculate unique students who have been hired
  const hiredStudentIds = new Set(
    applications.filter(app => app.status === 'Hired').map(app => app.studentId)
  );
  const studentsPlaced = hiredStudentIds.size;

  // Get the 5 most recently posted jobs for the activity feed
  const recentJobs = jobs.slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      
      {/* Top Row of Statistic Cards */}
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard title="Total Students" value={totalStudents} icon={<SchoolIcon />} color="primary.main" />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard title="Companies Onboard" value={totalCompanies} icon={<BusinessIcon />} color="warning.main" />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard title="Open Jobs" value={openJobs} icon={<WorkIcon />} color="info.main" />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <StatCard title="Students Placed" value={studentsPlaced} icon={<CheckCircleIcon />} color="success.main" />
        </Grid>
        
        {/* Recent Jobs Table */}
        <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Recently Posted Jobs</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Job Title</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Posted On</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentJobs.map(job => (
                                <TableRow key={job.id} hover>
                                    <TableCell>
                                        <Link component={RouterLink} to={`/admin/view-as-company/${job.companyId}/jobs/${job.id}/applicants`}>
                                          {job.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{job.companyName}</TableCell>
                                    <TableCell>{job.postedOn}</TableCell>
                                    <TableCell>{job.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button component={RouterLink} to="/admin/jobs">
                        View All Jobs
                    </Button>
                </Box>
            </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;