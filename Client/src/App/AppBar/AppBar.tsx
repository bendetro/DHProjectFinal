import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Toolbar, AppBar, Tooltip } from '@material-ui/core';
import CustomizedMenus from './Menu';
import GithubButton from '../Buttons/GithubButton';

const useStyles = makeStyles((theme) => ({
  root1: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  summary: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

export default function ButtonAppBar({
  setPageToPresent,
}: {
  setPageToPresent: any;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root1}>
      <AppBar position="static">
        <Toolbar>
          <CustomizedMenus setPageToPresent={setPageToPresent} />
          <Tooltip
            title={'Digital Humanities Final Project - Automated OCR Service'}
            placement="bottom"
          >
            <Typography noWrap variant="h6" className={classes.title}>
              Digital Humanities Final Project - Automated OCR Service
            </Typography>
          </Tooltip>
          <GithubButton />
        </Toolbar>
      </AppBar>
    </div>
  );
}
