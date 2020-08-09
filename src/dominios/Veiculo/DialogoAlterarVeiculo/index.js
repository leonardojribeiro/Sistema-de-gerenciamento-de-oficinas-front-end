import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Formulario, CampoDeTexto, CampoDeSelecao, CampoDeData } from '../../../componentes/Formulario';
import comparar from '../../../recursos/Comparar';

function DialogoAlterarVeiculo({ aberto }) {
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [veiculo, setVeiculo] = useState({});
  const refAlerta = useRef();
  const id = useQuery("id");
  const [clientes, setClientes] = useState([]);
  const [modelos, setModelos] = useState([]);

  const manipularEnvio = useCallback(async (veiculoASerAlterado) => {
    if (veiculoASerAlterado) {
      if (!comparar(veiculo, veiculoASerAlterado)) {
        veiculoASerAlterado._id = veiculo._id
        const resposta = await put("/veiculo", veiculoASerAlterado);
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
  }, [history, veiculo, put]);


  const popular = useCallback(async () => {
    const resposta = await get(`/veiculo/id?_id=${id}`)
    console.log(resposta);
    if (resposta) {
      setVeiculo(resposta)
    }
  }, [get, id,]);

  const listarClientes = useCallback(async () => {
    const cliente = await get("/cliente");
    if (cliente) {
      setClientes(cliente);
    }
  }, [get, ]);

  const listarModelos = useCallback(async () => {
    const modelos = await get("/modelo");
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  useEffect(() => {
    if (aberto) {
      listarClientes();
      listarModelos();
      popular();
    }
  }, [aberto, listarClientes, listarModelos, popular]);

  const conteudo = useMemo(() => (
    <Formulario aoEnviar={manipularEnvio} dadosIniciais={veiculo}>
      <CampoDeTexto nome="placa" label="Placa" fullWidth required autoFocus />
      <CampoDeData nome="anoFabricacao" label="Ano de fabricação" fullWidth required />
      <CampoDeData nome="anoModelo" label="Ano de modelo" fullWidth required />
      <CampoDeSelecao nome="idModelo" label="Modelo" required fullWidth>
        {
          modelos.map((modelo, indice) => <MenuItem key={indice} value={modelo._id}>{modelo.descricao}</MenuItem>)
        }
      </CampoDeSelecao>
      <CampoDeSelecao nome="idCliente" label="Cliente" required fullWidth >
        {
          clientes.map((cliente, indice) => <MenuItem key={indice} value={cliente._id}>{cliente.nome}</MenuItem>)
        }
      </CampoDeSelecao>
      <DialogActions >
        <Button type="submit">Salvar</Button>
      </DialogActions>
    </Formulario>
  ), [clientes, manipularEnvio, modelos, veiculo])

  return (
    <Dialogo aberto={aberto} titulo="Alterar peça">
      {conteudo}
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoAlterarVeiculo);