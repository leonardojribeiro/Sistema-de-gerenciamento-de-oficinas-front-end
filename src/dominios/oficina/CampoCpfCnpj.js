import React, { memo, forwardRef } from 'react';
import { Grid } from '@material-ui/core';
import CampoTexto from '../../componentes/CampoTexto';
import MascaraNumererica from '../../recursos/MascaraNumerica';


const CampoCpfCnpj = forwardRef(({ valor, valido, validar, onChange }, ref) => {
  function handleChange(e) {
    onChange(
      MascaraNumererica(
        e.target.value,
        tamanho =>
          tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
            ? "000.000.000-00"
            : "00.000.000/0000-00"
      )
    );
    if (!valido) {
      validar(e.target.value);
    }
  }
  return (
    <Grid xs={12} md={4} item>
      <CampoTexto
        inputRef={ref}
        type="tel"
        required
        fullWidth
        label="CPF/CNPJ"
        onChange={handleChange}
        value={valor}
        error={!valido}
        helperText={
          valido
            ? ""
            : valor.length
              ? "CPF/CNPJ inválido."
              : "O CPF/CNPJ é obrigatório."
        }
      />
    </Grid>
  )
});

export default memo(CampoCpfCnpj);