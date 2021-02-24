import React, { useContext, useRef, memo, useEffect, useCallback, useState } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeTexto, CampoDeCpfOuCnpj, PhoneField, CampoDeEmail, NameField } from '../../../componentes/Form';
import Fornecedor from '../../../Types/Fornecedor';
import FormEndereco from '../../../componentes/FormEndereco';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';

const FormFornecedor: React.FC = () => {
  const { get, put, post } = useContext(ApiContext);
  const history = useHistory();
  const [fornecedor, setFornecedor] = useState<Fornecedor | undefined>();
  const id = useQuery("id");
  const isEdit = id !== null;
  const refAlerta = useRef<AlertaHandles>();

  const manipularEnvio = useCallback(async (dados) => {
    if (isEdit) {
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
    }
    else {
      const resposta = await post("/fornecedor", dados);
      if (resposta) {
        history.goBack();
      }
    }
  }, [fornecedor, history, isEdit, post, put]);

  const popular = useCallback(async () => {
    const resposta = await get(`/fornecedor/id?_id=${id}`) as Fornecedor;
    if (resposta) {
      setFornecedor(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    if (isEdit) {
      popular();
    }
  }, [isEdit, popular])

  return (
    <Dialogo maxWidth="md" fullWidth open title={isEdit ? "Alterar fornecedor" : "Incluir fornecedor"}>
      <Form initialData={fornecedor} onSubmit={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <NameField name="nomeFantasia" autoComplete="no" label="Nome fantasia" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj name="cpfCnpj" autoComplete="no" label="CPF/CNPJ" disabled={isEdit} fullWidth required />
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
          <FormEndereco />
        </Grid>
        <BotaoIncluirOuAlterar isEdit={isEdit} />
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(FormFornecedor);