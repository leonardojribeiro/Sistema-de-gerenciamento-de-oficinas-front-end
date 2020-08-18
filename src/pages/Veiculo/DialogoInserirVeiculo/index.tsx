import React, { useContext, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, } from '@material-ui/core';
import { useState } from 'react';
import { Form, CampoDeTexto, DateField, CampoDeSelecao } from '../../../componentes/Form';
import Modelo from '../../../Types/Modelo';
import Cliente from '../../../Types/Cliente';


const DialogoInserirVeiculo: React.FC = () => {
  const { get, post, } = useContext(ApiContext);
  const history = useHistory();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);

  const manipularEnvio = useCallback(async (veiculo) => {
    if (veiculo) {
      const resposta = await post("/veiculo", veiculo);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  const listarClientes = useCallback(async () => {
    const cliente = await get("/cliente") as Cliente[];
    if (cliente) {
      setClientes(cliente);
    }
  }, [get]);

  const listarModelos = useCallback(async () => {
    const modelos = await get("/modelo") as Modelo[];
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  useEffect(() => {
    listarClientes();
    listarModelos();
  }, [listarClientes, listarModelos]);

  return (
    <Dialogo open title="Inserir veículo">
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
        <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required />
        <DateField name="anoModelo" label="Ano de modelo" fullWidth required />
        <CampoDeSelecao name="idModelo" label="Modelo" required fullWidth>
          {
            modelos.map((modelo, indice) => <MenuItem key={indice} value={modelo._id}>{modelo.descricao}</MenuItem>)
          }
        </CampoDeSelecao>
        <CampoDeSelecao name="idCliente" label="Cliente" required fullWidth >
          {
            clientes.map((cliente, indice) => <MenuItem key={indice} value={cliente._id}>{cliente.nome}</MenuItem>)
          }
        </CampoDeSelecao>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
    </Dialogo>
  );
}

export default memo(DialogoInserirVeiculo);