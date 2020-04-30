import React from 'react';
import { TextField, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  campoTexto: {
    '& label': {
      color: "var(--cor-label)",
    },
    '& label.Mui-focused': {
      color: "var(--cor-label-focado)",
    },
    '& .MuiInput-underline': {
      color: "var(--cor)",
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


export default function CampoTexto({ label, value, onChange, type }) {
  return (
    <Box mt={2} p={2}>
      <TextField type={type} className={useStyles().campoTexto} fullWidth label={label} value={value} onChange={onChange} />
    </Box>
  );
}
