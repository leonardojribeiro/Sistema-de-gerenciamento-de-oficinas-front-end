import React, { useRef, useEffect, useContext, useState, memo, useCallback, } from 'react';
import Dialogo from '../../../componentes/Dialog';
import useQuery from '../../../hooks/useQuery';
import { DialogActions, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeTexto, } from '../../../componentes/Form';
import Especialidade from '../../../Types/Especialidade';

const DialogAlterarEspecialidade: React.FC = () => {
  const id = useQuery("id");
  const [especialidade, setEspecialidade] = useState<Especialidade | undefined>();
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const refAlerta = useRef<AlertaHandles | undefined>();

  const manipularEnvio = useCallback(async (especialidadeASerAlterada) => {
    if (especialidadeASerAlterada) {
      if (!(especialidadeASerAlterada.descricao === especialidade?.descricao)) {
        especialidadeASerAlterada._id = especialidade?._id
        const resposta = await put("/especialidade", especialidadeASerAlterada);
        if (resposta) {
          history.goBack();
        }
      }
      else {
        if (refAlerta.current) {
          if (refAlerta.current) {
            refAlerta.current.setTipo("warning");
            refAlerta.current.setMensagem("Nenhuma alteração foi efetuada.");
            refAlerta.current.setAberto(true);
          }
        }
      }
    }
  }, [especialidade, put, history]);

  const popular = useCallback(async () => {
    const resposta = await get(`/especialidade/id?_id=${id}`) as Especialidade;
    if (resposta) {
      setEspecialidade(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    popular();
  }, [popular])

  return (
    <Dialogo open title="Editar marca">
      <Form initialData={especialidade} onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <DialogActions>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  )
}

export default memo(DialogAlterarEspecialidade);