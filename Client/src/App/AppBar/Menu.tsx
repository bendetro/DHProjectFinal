import React from 'react';
import {
  Button,
  Menu,
  MenuProps,
  MenuItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import LinkIcon from '@material-ui/icons/Link';
import InfoIcon from '@material-ui/icons/Info';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({
  setPageToPresent,
}: {
  setPageToPresent: any;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="default"
        onClick={handleClick}
      >
        Navigate
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Submit Image"
            onClick={() => setPageToPresent('SubmissionPage')}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="About"
            onClick={() => setPageToPresent('DescriptionPage')}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <Button
            target="_blank"
            rel="noopener"
            href="http://yaeln.org/maskplease/s/masks/page/welcome"
          >
            Mask Please
          </Button>
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
