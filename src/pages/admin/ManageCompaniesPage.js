import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useUsers } from '../../contexts/UserContext';

const ManageCompaniesPage = () => {
    const { companies } = useUsers();

    return (
        <>
            <Typography variant="h4" gutterBottom>Manage Companies</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Company Name (Click to View Portal)</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id} hover>
                                <TableCell>
                                    <Link component={RouterLink} to={`/admin/view-as-company/${company.id}/dashboard`}>
                                        {company.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{company.username}</TableCell>
                                <TableCell>{company.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default ManageCompaniesPage;