import React from 'react';
import { TextField, Box, makeStyles } from '@material-ui/core';
import { memo } from 'react';

const useStyles = makeStyles({
  campoTexto: {
    '& label': {
      color: "var(--cor-label)",
    },
    '& label.Mui-focused': {
      color: "var(--cor-label-focado)",
    },
    '& label.Mui-error': {
      color: "#f44336",
    },
    '& .MuiInput-underline': {
      color: "var(--cor)",
    },
    '& .Mui-error': {
      color: "#f44336",
    },
    '& .MuiInput-underline:before': {
      color: "var(--cor)",
      borderBottomColor: "var(--cor-borda)",
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: "var(--cor-borda-hover)",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: "var(--cor-borda-after)",
    },

  },
});


function CampoTexto(props) {
  return (
    <Box mt={2} p={4}>
      <TextField {...props}className={useStyles().campoTexto} />
    </Box>
  );
}

export default memo(CampoTexto);