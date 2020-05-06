import React from 'react';
import { Tooltip, IconButton} from '@material-ui/core';
import { memo } from 'react';



function CustomIconButton({tooltip, onClick, component, to, ...props}) {
  return (
    <Tooltip title={tooltip}>
      <IconButton color="inherit" onClick={onClick} component={component} to={to}>
        {props.children}
      </IconButton>
    </Tooltip>
  );
}
export default memo(CustomIconButton);
