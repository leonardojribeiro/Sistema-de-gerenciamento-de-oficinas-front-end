import Grid from '@material-ui/core/Grid';
import React from 'react';
import { CampoDeTexto, CepField, Node } from '../Form';

const FormEndereco: React.FC = () => {
  return (
    <Node node="endereco">
      <Grid item xs={12} sm={12} md={6}>
        <CampoDeTexto name="logradouro" label="Logradouro" autoComplete="no" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={9} md={6}>
        <CampoDeTexto name="bairro" label="Bairro" autoComplete="no" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={3} md={2}>
        <CampoDeTexto name="numero" label="Número" autoComplete="no" fullWidth required />
      </Grid>
      <Grid item xs={12} sm={9} md={7}>
        <CampoDeTexto name="complemento" label="Complemento" autoComplete="no" fullWidth />
      </Grid>
      <Grid item xs={12} sm={3} md={3}>
        <CepField name="cep" label="CEP" fullWidth autoComplete="no" required />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CampoDeTexto name="estado" label="Estado" fullWidth autoComplete="no" required />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <CampoDeTexto name="cidade" label="Cidade" fullWidth autoComplete="no" required />
      </Grid>
    </Node>
  );
}

export default FormEndereco;