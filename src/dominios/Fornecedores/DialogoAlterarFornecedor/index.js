import React, { useContext, useRef, memo, useEffect, useCallback, useState } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import ApiContext from '../../../contexts/ApiContext';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, } from '@material-ui/core';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import Alerta from '../../../componentes/Alerta';
import { Formulario, CampoDeTexto, CampoDeCpfOuCnpj, CampoDeTelefone, CampoDeEmail, CampoDeCep, No } from '../../../componentes/Formulario';

function DialogoAlterarFornecedor({ aberto }) {
  const { get, put, } = useContext(ApiContext);
  const { idOficina } = useAuth();
  const history = useHistory();
  const [fornecedor, setFornecedor] = useState({});
  const id = useQuery("id");
  const refAlerta = useRef();

  const manipularEnvio = useCallback(async (dados) => {
    if (dados) {
      if (!comparar(fornecedor, dados)) {
        dados.idOficina = idOficina;
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
  }, [fornecedor, history, idOficina, put]);

  const popular = useCallback(async () => {
    const resposta = await get(`/fornecedor/id?idOficina=${idOficina}&_id=${id}`)
    if (resposta) {
      setFornecedor(resposta)
    }
  }, [get, id, idOficina]);

  useEffect(() => {
    if (aberto) {
      popular();
    }
  }, [popular, aberto])

  return (
    <Dialogo maxWidth="md" fullWidth aberto={aberto} titulo="Alterar cliente">
      <Formulario dadosIniciais={fornecedor} aoEnviar={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <CampoDeTexto nome="nomeFantasia" label="Nome fantasia" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj nome="cpfCnpj" label="CPF/CNPJ" disabled fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeTexto nome="razaoSocial" label="Razão Social" fullWidth required />
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

export default memo(DialogoAlterarFornecedor);