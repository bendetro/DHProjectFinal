import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GithubButton from '../Buttons/GithubButton';

const image = require('../../Assets/sign_text.png');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

export default function DescriptionCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            OCR
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Automated OCR Service"
        subheader="BGU, Digital Humanities Project"
      />
      <CardMedia image={image} className={classes.media} title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This Service Facilitates an automated solution for data collection as
          part of the Mask Please! Linguistic Landscape of COVID-19 in Israel
          research.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          title="Read More"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Usage guidelines</Typography>
          <Typography paragraph>
            Click on the "Upload" button or drag an image to that area.
          </Typography>
          <Typography paragraph>
            Image will be analyzed for a few seconds.
          </Typography>
          <Typography paragraph>
            On success, detected content will be available for editing.
          </Typography>
          <Typography paragraph>
            Make sure content analasys is valid, you should edit it if not.
          </Typography>
          <Typography paragraph>
            Insert your name & email and submit the form.
          </Typography>
          <GithubButton />
        </CardContent>
      </Collapse>
    </Card>
  );
}
