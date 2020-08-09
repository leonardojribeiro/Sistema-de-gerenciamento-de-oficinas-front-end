import React, { useContext, useRef, memo, useEffect, useCallback, useState } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, FormControlLabel, Radio } from '@material-ui/core';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import Alerta from '../../../componentes/Alerta';
import { Formulario, CampoDeTexto, CampoDeCpfOuCnpj, CampoDeData, CampoDeRadio, CampoDeTelefone, CampoDeEmail, CampoDeCep, No } from '../../../componentes/Formulario';

function DialogoAlterarFuncionario({ aberto }) {
  const { get, put, } = useContext(ApiContext);
  const history = useHistory();
  const [cliente, setCliente] = useState({});
  const id = useQuery("id");
  const refAlerta = useRef();

  const manipularEnvio = useCallback(async (dados) => {
    if (dados) {
      if (!comparar(cliente, dados)) {
        dados._id = cliente._id;
        console.log(dados);
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
  }, [cliente, history,  put]);

  const popular = useCallback(async () => {
    const resposta = await get(`/cliente/id?_id=${id}`)
    if (resposta) {
      setCliente(resposta)
    }
  }, [get, id]);

  useEffect(() => {
    if (aberto) {
      popular();
    }
  }, [popular, aberto])

  return (
    <Dialogo maxWidth="md" fullWidth aberto={aberto} titulo="Alterar cliente">
      <Formulario dadosIniciais={cliente} aoEnviar={manipularEnvio}>
        <Grid container spacing={2}>F
          <Grid item xs={12} sm={8} md={8}>
            <CampoDeTexto nome="nome" label="Nome" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj nome="cpfCnpj" label="CPF/CNPJ" disabled fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeData nome="dataNascimento" label="Data de nascimento" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeRadio nome="sexo" label="Sexo" fullWidth required>
              <FormControlLabel value="f" control={<Radio color="primary" />} label="Feminino" />
              <FormControlLabel value="m" control={<Radio color="primary" />} label="Masculino" />
            </CampoDeRadio>
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
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoAlterarFuncionario);