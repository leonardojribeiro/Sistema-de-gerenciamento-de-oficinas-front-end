import React, { memo } from 'react';
import { Toolbar, AppBar} from '@material-ui/core';

function BarraSuperior(props) {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar className="flex justify-between" >
        {props.children}
      </Toolbar>
    </AppBar>
  );
};

export default memo(BarraSuperior);