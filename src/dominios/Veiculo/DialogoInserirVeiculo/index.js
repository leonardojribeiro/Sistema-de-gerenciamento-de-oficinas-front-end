import React, { useContext, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, } from '@material-ui/core';
import { useState } from 'react';
import { Formulario, CampoDeTexto, CampoDeData, CampoDeSelecao } from '../../../componentes/Formulario';


function DialogoInserirVeiculo({ aberto }) {
  const { get, post, } = useContext(ApiContext);
  const history = useHistory();
  const [clientes, setClientes] = useState([]);
  const [modelos, setModelos] = useState([]);

  const manipularEnvio = useCallback(async (veiculo) => {
    if (veiculo) {
      const resposta = await post("/veiculo", veiculo);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  const listarClientes = useCallback(async () => {
    const cliente = await get("/cliente");
    if (cliente) {
      setClientes(cliente);
    }
  }, [get]);

  const listarModelos = useCallback(async () => {
    const modelos = await get("/modelo");
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  useEffect(() => {
    listarClientes();
    listarModelos();
  }, [listarClientes, listarModelos]);

  return (
    <Dialogo aberto={aberto} titulo="Inserir veículo">
      <Formulario aoEnviar={manipularEnvio}>
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
    </Dialogo>
  );
}

export default memo(DialogoInserirVeiculo);