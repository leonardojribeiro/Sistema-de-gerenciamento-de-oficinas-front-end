import React, { useContext, useRef, memo, useEffect, useCallback, useState } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, } from '@material-ui/core';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeTexto, CampoDeCpfOuCnpj, PhoneField, CampoDeEmail, CepField, Node, NameField } from '../../../componentes/Form';
import Fornecedor from '../../../Types/Fornecedor';

const DialogoAlterarFornecedor: React.FC = () => {
  const { get, put, } = useContext(ApiContext);
  const history = useHistory();
  const [fornecedor, setFornecedor] = useState<Fornecedor | undefined>();
  const id = useQuery("id");
  const refAlerta = useRef<AlertaHandles>();

  const manipularEnvio = useCallback(async (dados) => {
    if (dados && fornecedor) {
      if (!comparar(fornecedor, dados)) {
        dados._id = fornecedor._id;
        console.log(dados);
        const resposta = await put("/fornecedor", dados);
        if (resposta) {
          history.goBack();
        }
      }
      else {
        if (refAlerta.current) {
          refAlerta.current.setTipo("warning");
          refAlerta.current.setMensagem("Nenhuma alteração foi efetuada.");
          refAlerta.current.setAberto(true);
        }
      }
    }
  }, [fornecedor, history, put]);

  const popular = useCallback(async () => {
    const resposta = await get(`/fornecedor/id?_id=${id}`) as Fornecedor;
    if (resposta) {
      setFornecedor(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    popular();
  }, [popular,])

  return (
    <Dialogo maxWidth="md" fullWidth open title="Alterar Fornecedor">
      <Form initialData={fornecedor} onSubmit={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <NameField name="nomeFantasia" autoComplete="no" label="Nome fantasia" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj name="cpfCnpj" autoComplete="no" label="CPF/CNPJ" disabled fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeTexto name="razaoSocial" autoComplete="no" label="Razão Social" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneFixo" autoComplete="no" label="Telefone fixo" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneCelular" autoComplete="no" label="Telefone celular" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeEmail name="email" required autoComplete="no" label="E-mail" fullWidth />
          </Grid>
          <Node node="endereco">
            <Grid item xs={12} sm={12} md={6}>
              <CampoDeTexto name="logradouro" autoComplete="no" label="Logradouro" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={9} md={6}>
              <CampoDeTexto name="bairro" label="Bairro" autoComplete="no" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <CampoDeTexto name="numero" label="Número" autoComplete="no" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={9} md={7}>
              <CampoDeTexto name="complemento" autoComplete="no" label="Complemento" fullWidth />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <CepField name="cep" label="CEP" autoComplete="no" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CampoDeTexto name="estado" label="Estado" autoComplete="no" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CampoDeTexto name="cidade" label="Cidade" autoComplete="no" fullWidth required />
            </Grid>
          </Node>
        </Grid>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoAlterarFornecedor);