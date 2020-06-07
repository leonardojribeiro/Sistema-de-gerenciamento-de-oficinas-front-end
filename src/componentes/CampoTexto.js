import React from 'react';
import { TextField, Box, makeStyles } from '@material-ui/core';
import { memo } from 'react';


function CampoTexto(props) {
  return (
    <Box mt={2} p={2}>
      <TextField {...props} />
    </Box>
  );
}

export default memo(CampoTexto);