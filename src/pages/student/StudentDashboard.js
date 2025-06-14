import React from 'react';
import { Typography, Paper, Box, Grid, Card, CardContent, CardHeader, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useUsers } from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { red } from '@mui/material/colors';

const StudentDashboard = () => {
    const { users, authenticatedUser } = useUsers();
    const { studentId } = useParams();

    // This logic correctly determines if we're viewing as an admin or as the logged-in student.
    const activeStudent = studentId 
        ? users.find(u => u.id === parseInt(studentId))
        : authenticatedUser;

    if (!activeStudent) {
        return <Typography>Student profile could not be loaded. Please try logging in again.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Student Dashboard
            </Typography>
            <Grid container spacing={3}>
                {/* Welcome Message */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h5" gutterBottom>
                            Welcome, {activeStudent.name}!
                        </Typography>
                        <Typography variant="body1">
                            This is your personal dashboard. Here you can view your profile, track applications, and find new job opportunities.
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            Use the navigation on the left to explore all the features. Good luck!
                        </Typography>
                    </Paper>
                </Grid>

                {/* Profile Card with new fields */}
                <Grid item xs={12} md={5}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="profile">
                                    {activeStudent.name.charAt(0)}
                                </Avatar>
                            }
                            title="Student Profile"
                            subheader="Your personal information"
                        />
                        <CardContent>
                            <List>
                                <ListItem>
                                    <ListItemIcon><PersonIcon /></ListItemIcon>
                                    <ListItemText primary="Full Name" secondary={activeStudent.name} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><EmailIcon /></ListItemIcon>
                                    <ListItemText primary="Email Address" secondary={activeStudent.email} />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon><PhoneIcon /></ListItemIcon>
                                    <ListItemText primary="Phone Number" secondary={activeStudent.phone} />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentDashboard;