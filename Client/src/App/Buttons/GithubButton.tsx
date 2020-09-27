import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function GithubButton() {
  return (
    <Button
      target="_blank"
      rel="noopener"
      href="https://github.com/bendetro/DHProjectFinal"
    >
      <Box display="row" flexGrow={1}>
        <Box marginRight={1}>
          <GitHubIcon />
        </Box>
        <Box textAlign="center" alignContent="center">
          <Typography variant="button">GitHub</Typography>
        </Box>
      </Box>
    </Button>
  );
}
