import React from 'react';
import { Box, Typography, Paper, Divider, Button } from '@mui/material';
import { useUsers } from '../../contexts/UserContext';
import { useParams } from 'react-router-dom';
import PrintIcon from '@mui/icons-material/Print';

const GenerateResumePage = () => {
  const { users } = useUsers();
  const { studentId } = useParams();

  // This component ALWAYS uses the studentId from the URL
  const activeStudent = users.find(u => u.id === parseInt(studentId));

  if (!activeStudent) {
    return <Typography>Resume data could not be loaded. Please select a student to view.</Typography>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Student Resume</Typography>
        <Button 
          variant="contained" 
          startIcon={<PrintIcon />} 
          onClick={() => window.print()}
          sx={{ '@media print': { display: 'none' } }}
        >
          Print / Save as PDF
        </Button>
      </Box>
      <Paper sx={{ p: { xs: 2, sm: 4, md: 6 }, maxWidth: '8.5in', mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1">{activeStudent.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {activeStudent.email} | {activeStudent.phone}
          </Typography>
        </Box>

        {/* Summary */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom borderBottom={1} borderColor="grey.400" pb={1}>
            Professional Summary
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {activeStudent.summary || 'No summary has been provided.'}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Experience */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom borderBottom={1} borderColor="grey.400" pb={1}>
            Work Experience
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {activeStudent.experience || 'No work experience has been provided.'}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Education */}
        <Box>
          <Typography variant="h5" component="h2" gutterBottom borderBottom={1} borderColor="grey.400" pb={1}>
            Education
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {activeStudent.education || 'No education details have been provided.'}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default GenerateResumePage;