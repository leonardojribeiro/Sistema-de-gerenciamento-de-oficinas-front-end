import React from 'react';
import { Toolbar, AppBar, Typography, Tooltip, Avatar} from '@material-ui/core';

export default function BarraSuperior({ titulo, logo, items }) {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar className="flex justify-between" >
        <Tooltip title="Logomarca">
          <Avatar alt={logo.alt} src={logo.url} />
        </Tooltip>
        <Typography >
          {titulo}
        </Typography>
        {items}
      </Toolbar>
    </AppBar>
  );
};