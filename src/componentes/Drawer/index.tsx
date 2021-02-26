import React, { SetStateAction, memo } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Hidden from '@material-ui/core/Hidden';

interface DrawerProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: "hidden",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden"
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

const MiniDrawer: React.FC<DrawerProps> = ({ open, setOpen, children }) => {
  const classes = useStyles();
  const itensDrawer = (
    <>
      {children}
      <div className={classes.toolbar} />
    </>
  );

  return (
    <>
      <Hidden smUp>
        <SwipeableDrawer
          swipeAreaWidth={50}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          {itensDrawer}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {itensDrawer}
        </Drawer>
      </Hidden>
    </>
  );
}

export default memo(MiniDrawer);