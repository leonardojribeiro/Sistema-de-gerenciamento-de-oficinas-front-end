import React from 'react';
import { Toolbar, AppBar, makeStyles } from '@material-ui/core';

export default function BarraSuperior(props) {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar className="flex justify-between" >
        {props.children}
      </Toolbar>
    </AppBar>
  );
};