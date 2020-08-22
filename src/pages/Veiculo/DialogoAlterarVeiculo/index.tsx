import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, } from '@material-ui/core';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Form, CampoDeTexto, CampoDeSelecao, DateField } from '../../../componentes/Form';
import comparar from '../../../recursos/Comparar';
import Cliente from '../../../Types/Cliente';
import Modelo from '../../../Types/Modelo';
import Veiculo from '../../../Types/Veiculo';

const DialogAlterarVeiculo: React.FC = () => {
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [veiculo, setVeiculo] = useState<Veiculo | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);

  const manipularEnvio = useCallback(async (veiculoASerAlterado) => {
    if (veiculoASerAlterado && veiculo) {
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
    const resposta = await get(`/veiculo/id?_id=${id}`) as Veiculo;
    console.log(resposta)
    if (resposta) {
      setVeiculo(resposta)
    }
  }, [get, id,]);

  const listarClientes = useCallback(async () => {
    const cliente = await get("/cliente") as Cliente[];
    if (cliente) {
      setClientes(cliente);
    }
  }, [get,]);

  const listarModelos = useCallback(async () => {
    const modelos = await get("/modelo") as Modelo[];
    if (modelos) {
      setModelos(modelos);
    }
  }, [get,]);

  useEffect(() => {
    listarClientes();
    listarModelos();
    popular();
  }, [listarClientes, listarModelos, popular]);

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={veiculo}>
      <CampoDeTexto name="placa" label="Placa" fullWidth required autoFocus />
      <DateField name="anoFabricacao" label="Ano de fabricação" fullWidth required />
      <DateField name="anoModelo" label="Ano de modelo" fullWidth required />
      <CampoDeSelecao name="modelo" label="Modelo" required fullWidth>
        {
          modelos.map((modelo, indice) => <MenuItem key={indice} value={modelo._id}>{modelo.descricao}</MenuItem>)
        }
      </CampoDeSelecao>
      <CampoDeSelecao name="cliente" label="Cliente" required fullWidth >
        {
          clientes.map((cliente, indice) => <MenuItem key={indice} value={cliente._id}>{cliente.nome}</MenuItem>)
        }
      </CampoDeSelecao>
      <DialogActions >
        <Button type="submit">Salvar</Button>
      </DialogActions>
    </Form>
  ), [clientes, manipularEnvio, modelos, veiculo])

  return (
    <Dialogo open title="Alterar peça">
      {conteudo}
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogAlterarVeiculo);