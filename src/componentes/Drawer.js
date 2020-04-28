import React from 'react';

import { SwipeableDrawer } from '@material-ui/core';

export default function Drawer({ open, onOpen, onClose }) {
  return (
    <SwipeableDrawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
    >###################
    </SwipeableDrawer>
  );
}
