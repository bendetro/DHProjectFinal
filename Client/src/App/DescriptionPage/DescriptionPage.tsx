import React from 'react';
import { Box, Paper } from '@material-ui/core';
import DescriptionCard from './DescriptionCard';

export function DescriptionPage() {
  return (
    <Box margin={2}>
      <Paper>
        <DescriptionCard />
      </Paper>
    </Box>
  );
}
