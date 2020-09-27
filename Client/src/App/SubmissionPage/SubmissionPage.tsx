import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { SubmissionCard } from './SubmissionCard';

export function SubmissionPage() {
  return (
    <Box margin={2}>
      <Paper>
        <SubmissionCard />
      </Paper>
    </Box>
  );
}
