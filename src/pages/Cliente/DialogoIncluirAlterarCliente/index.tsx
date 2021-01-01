import React, { useContext, useRef, memo, useEffect, useCallback, useState } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { Grid, FormControlLabel, Radio } from '@material-ui/core';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeCpfOuCnpj, DateField, CampoDeRadio, PhoneField, CampoDeEmail, NameField } from '../../../componentes/Form';
import Cliente from '../../../Types/Cliente';
import FormEndereco from '../../../componentes/FormEndereco';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';


const DialogoIncluirAlterarCliente: React.FC = () => {
  const { get, put, post } = useContext(ApiContext);
  const history = useHistory();
  const [cliente, setCliente] = useState<Cliente | undefined>();
  const id = useQuery("id");
  const isEdit = id !== null;
  const refAlerta = useRef<AlertaHandles>({} as AlertaHandles);

  const manipularEnvio = useCallback(async (dados) => {
    if (isEdit) {
      if (dados && cliente) {
        if (!comparar(cliente, dados)) {
          dados._id = cliente._id;
          console.log(dados);
          console.log(cliente);
          const resposta = await put("/cliente", dados);
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
      const resposta = await post("/cliente", dados);
      if (resposta) {
        history.goBack();
      }
    }
  }, [cliente, history, isEdit, post, put]);

  const popular = useCallback(async () => {
    const resposta = await get(`/cliente/id?_id=${id}`) as Cliente;
    if (resposta) {
      setCliente(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    if (isEdit) {
      popular();
    }
  }, [isEdit, popular])

  return (
    <Dialogo maxWidth="md" fullWidth open title={isEdit ? "Incluir cliente" : "Alterar cliente"}>
      <Form initialData={cliente} onSubmit={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <NameField name="nome" label="Nome" autoComplete="no" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj name="cpfCnpj" autoComplete="no" label="CPF/CNPJ" disabled={isEdit} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DateField name="dataNascimento" label="Data de nascimento" fullWidth required openTo="year" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeRadio name="sexo" label="Sexo" required>
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
            <CampoDeEmail name="email" label="E-mail" autoComplete="no" fullWidth />
          </Grid>
          <FormEndereco />
        </Grid>
        <BotaoIncluirOuAlterar isEdit={isEdit} />
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoIncluirAlterarCliente);