import React, { memo, forwardRef } from 'react';
import MascaraNumererica from '../recursos/MascaraNumerica';
import { TextField, Box } from '@material-ui/core';


const CampoTexto = forwardRef(({ valor, valido = true, validar, onChange, label, obrigatorio, erroInvalido, erroObrigatorio, type, mascara }, ref) => {
  function handleChange(e) {
    if (mascara) {
      onChange(
        MascaraNumererica(
          e.target.value,
          mascara
        )
      );
    }
    else {
      onChange(e.target.value);
    }
    if (!valido) {
      validar(e.target.value);
    }
  }
  return (
    <Box p={2}>
      <TextField
        inputRef={ref}
        required={obrigatorio}
        type={type}
        fullWidth
        label={label}
        onChange={handleChange}
        value={valor}
        error={!valido}
        helperText={
          obrigatorio
            ? valido
              ? ""
              : valor.length
                ? erroInvalido
                : erroObrigatorio
            : valor.length
              ? valido
                ? null
                : erroInvalido
              : null
        }
      />
    </Box>
  )
});

export default memo(CampoTexto);