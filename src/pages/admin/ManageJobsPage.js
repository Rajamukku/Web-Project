import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUsers } from '../../contexts/UserContext';

const ManageJobsPage = () => {
    const { jobs } = useUsers();

    return (
        <>
            <Typography variant="h4" gutterBottom>All Job Postings</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Posted On</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id} hover>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{job.companyName}</TableCell>
                                <TableCell>{job.postedOn}</TableCell>
                                <TableCell>
                                    <Chip label={job.status} color={job.status === 'Open' ? 'success' : 'default'} size="small" />
                                </TableCell>
                                <TableCell>
                                    <Link component={RouterLink} to={`/admin/view-as-company/${job.companyId}/jobs/${job.id}/applicants`}>
                                        View Applicants
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ManageJobsPage;