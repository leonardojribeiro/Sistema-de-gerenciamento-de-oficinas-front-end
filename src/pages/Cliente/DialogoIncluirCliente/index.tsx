import React, { useContext, memo, useCallback } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, FormControlLabel, Radio } from '@material-ui/core';
import { CampoDeCpfOuCnpj, Form, DateField, CampoDeRadio, PhoneField, CampoDeEmail, NameField } from '../../../componentes/Form';
import FormEndereco from '../../../componentes/FormEndereco';

const DialogoIncluirCliente: React.FC = () => {
  const { post } = useContext(ApiContext);
  const history = useHistory();

  const manipularEnvio = useCallback(async (cliente) => {
    if (cliente) {
      console.log(cliente);
      const resposta = await post("/cliente", cliente);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  return (
    <Dialogo maxWidth="md" fullWidth open title="Incluir cliente">
      <Form onSubmit={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <NameField name="nome" label="Nome" autoComplete="no" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj name="cpfCnpj" autoComplete="no" label="CPF/CNPJ" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DateField name="dataNascimento"  label="Data de nascimento" fullWidth required openTo="year"/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeRadio name="sexo"  label="Sexo" required>
              <FormControlLabel value="f" control={<Radio color="primary" />} label="Feminino" />
              <FormControlLabel value="m" control={<Radio color="primary" />} label="Masculino" />
            </CampoDeRadio>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneFixo" autoComplete="no" label="Telefone fixo" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneCelular" autoComplete="no" label="Telefone celular" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeEmail name="email" autoComplete="no" label="E-mail" fullWidth />
          </Grid>
          <FormEndereco />
        </Grid>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
    </Dialogo>
  );
}

export default memo(DialogoIncluirCliente);