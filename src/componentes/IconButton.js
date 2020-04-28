import React from 'react';
import { Tooltip, IconButton} from '@material-ui/core';



export default function CustomIconButton({tooltip, onClick, component, to, ...props}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton  className="sem-outline" color="inherit" onClick={onClick} component={component} to={to}>
        {props.children}
      </IconButton>
    </Tooltip>
  );
}
