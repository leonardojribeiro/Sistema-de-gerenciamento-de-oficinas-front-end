import React, { useContext, memo, useCallback } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, } from '@material-ui/core';
import { CampoDeCpfOuCnpj, Formulario, CampoDeTexto, CampoDeTelefone, CampoDeEmail, CampoDeCep, No } from '../../../componentes/Formulario';

function DialogoInserirFornecedor({ aberto }) {
  const { post } = useContext(ApiContext);
  const history = useHistory();

  const manipularEnvio = useCallback(async (fornecedorASerInserido) => {
    if (fornecedorASerInserido) {
      console.log(fornecedorASerInserido);
      const resposta = await post("/fornecedor", fornecedorASerInserido);
      if (resposta) {
        history.goBack();
      }
    }
  },[history, post]);

  return (
    <Dialogo maxWidth="md" fullWidth aberto={aberto} titulo="Inserir fornecedor">
      <Formulario aoEnviar={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <CampoDeTexto nome="nomeFantasia" label="Nome fantasia" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj nome="cpfCnpj" label="CPF/CNPJ" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeTexto nome="razaoSocial" label="RazaoSocial" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeTelefone nome="telefoneFixo" label="Telefone fixo" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeTelefone nome="telefoneCelular" label="Telefone celular" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeEmail nome="email" label="E-mail" fullWidth />
          </Grid>
          <No no="endereco">
            <Grid item xs={12} sm={12} md={6}>
              <CampoDeTexto nome="logradouro" label="Logradouro" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={9} md={6}>
              <CampoDeTexto nome="bairro" label="Bairro" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <CampoDeTexto nome="numero" label="Número" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={9} md={7}>
              <CampoDeTexto nome="complemento" label="Complemento" fullWidth />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <CampoDeCep nome="cep" label="CEP" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CampoDeTexto nome="estado" label="Estado" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CampoDeTexto nome="cidade" label="Cidade" fullWidth required />
            </Grid>
          </No>
        </Grid>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Formulario>
    </Dialogo>
  );
}

export default memo(DialogoInserirFornecedor);