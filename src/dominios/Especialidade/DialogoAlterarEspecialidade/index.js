import React, { useRef, useEffect, useContext, useState, memo, useCallback, } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import useQuery from '../../../hooks/useQuery';
import { DialogActions, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import Alerta from '../../../componentes/Alerta';
import { Formulario, CampoDeTexto, } from '../../../componentes/Formulario';

function DialogoAlterarEspecialidade({ aberto }) {
  const id = useQuery("id");
  const [especialidade, setEspecialidade] = useState({});
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const refAlerta = useRef();

  const manipularEnvio = useCallback(async (especialidadeASerAlterada) => {
    if (especialidadeASerAlterada) {
      if (!(especialidadeASerAlterada.descricao === especialidade.descricao)) {
        especialidadeASerAlterada._id = especialidade._id
        const resposta = await put("/especialidade", especialidadeASerAlterada);
        if (resposta) { history.goBack();
        }
      }
      else {
        if (refAlerta.current) { refAlerta.current.setTipo("warning"); refAlerta.current.setMensagem("Nenhuma alteração foi efetuada."); refAlerta.current.setAberto(true);
        }
      }
    }
  }, [especialidade.descricao, especialidade._id, put, history]);

  const popular = useCallback(async () => {
    const resposta = await get(`/especialidade/id?_id=${id}`)
    if (resposta) {
      setEspecialidade(resposta)
    }
  }, [get, id,]);

  useEffect(() => {
    if (aberto) {
      popular();
    }
  }, [popular, aberto])

  return (
    <Dialogo aberto={aberto} titulo="Editar marca">
      <Formulario dadosIniciais={especialidade} aoEnviar={manipularEnvio}>
        <CampoDeTexto nome="descricao" label="Descrição" fullWidth required autoFocus/>
        <DialogActions>
           <Button type="submit">Salvar</Button>
        </DialogActions>
      </Formulario>
      <Alerta ref={refAlerta} />
    </Dialogo>
  )
}

export default memo(DialogoAlterarEspecialidade);