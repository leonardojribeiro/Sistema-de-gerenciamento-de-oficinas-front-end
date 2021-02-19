import React, { useRef, useEffect, useContext, useState, memo, useCallback, } from 'react';
import Dialogo from '../../../componentes/Dialog';
import useQuery from '../../../hooks/useQuery';
import { useHistory } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeTexto, } from '../../../componentes/Form';
import Especialidade from '../../../Types/Especialidade';
import BotaoIncluirOuAlterar from '../../../componentes/BotaoIncluirOuAlterar';

const FormEspecialidade: React.FC = () => {
  const id = useQuery("id");
  const [especialidade, setEspecialidade] = useState<Especialidade | undefined>();
  const { get, put, post } = useContext(ApiContext);
  const history = useHistory();
  const refAlerta = useRef<AlertaHandles | undefined>();
  const isEdit = id !== null;

  const manipularEnvio = useCallback(async (especialidadeASerAlterada) => {
    if (isEdit) {
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
    }
    else {
      const resposta = await post("/especialidade", especialidadeASerAlterada);
      if (resposta) {
        history.goBack();
      }
    }
  }, [isEdit, especialidade, put, history, post]);

  const popular = useCallback(async () => {
    const resposta = await get(`/especialidade/id?_id=${id}`) as Especialidade;
    if (resposta) {
      setEspecialidade(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    if (isEdit) {
      popular();
    }
  }, [isEdit, popular])

  return (
    <Dialogo open title={isEdit ? "Alterar especialidade" : "Incluir especialidade"}>
      <Form initialData={especialidade} onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" autoComplete="no" label="Descrição" fullWidth required autoFocus />
        <BotaoIncluirOuAlterar isEdit={isEdit} />
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  )
}

export default memo(FormEspecialidade);