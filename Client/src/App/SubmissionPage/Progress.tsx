import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

export const Progress = () => {
  return (
    <Box>
      <CircularProgress />
      <Box>
        <div>Analyzing Image ...</div>
      </Box>
    </Box>
  );
};
