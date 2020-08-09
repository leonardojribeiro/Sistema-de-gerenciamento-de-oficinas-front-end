import React, { useRef, useEffect, useContext, useState, memo, useCallback, } from 'react';
import Dialogo from '../../../componentes/Dialogo';
import useQuery from '../../../hooks/useQuery';
import { DialogActions, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import Alerta from '../../../componentes/Alerta';
import { Formulario, CampoDeTexto, DragAndDrop } from '../../../componentes/Formulario';

function DialogoAlterarMarca({ aberto }) {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const id = useQuery("id");
  const [marca, setMarca] = useState({});
  const { get, getTipoBlob, multipartPut } = useContext(ApiContext);
  const history = useHistory();
  const refAlerta = useRef();

  const manipularEnvio = useCallback(async (marcaASerAlterada) => {
    if (marcaASerAlterada) {
      if (!(marcaASerAlterada.descricao === marca.descricao) || !(marcaASerAlterada.logomarca === marca.logomarca[0])) {
        marcaASerAlterada._id = marca._id
        marcaASerAlterada.uriLogo = marca.uriLogo;
        const resposta = await multipartPut("/marca", marcaASerAlterada);
        if (resposta) { history.goBack();
        }
      }
      else {
        if (refAlerta.current) { refAlerta.current.setTipo("warning"); refAlerta.current.setMensagem("Nenhuma alteração foi efetuada."); refAlerta.current.setAberto(true);
        }
      }
    }
  }, [history, marca, multipartPut]);

  const popular = useCallback(async () => {
    const resposta = await get(`/marca/id?_id=${id}`)
    if (resposta) {
      let logomarca = null;
      if (resposta.uriLogo) {
        logomarca = await getTipoBlob(`${imagensUrl}/${resposta.uriLogo}`);
        const tipo = resposta.uriLogo.split(".");
        logomarca = new File([logomarca], resposta.uriLogo, { type: `image/${tipo[1]}` })
      }
      setMarca({
        _id: resposta._id,
        uriLogo: resposta.uriLogo,
        logomarca: [logomarca],
        descricao: resposta.descricao,
      })
    }
  }, [get, getTipoBlob, id, imagensUrl]);

  useEffect(() => {
    if (aberto) {
      popular();
    }
    return () => {
      setMarca({});
    }
  }, [popular, aberto])

  return (
    <Dialogo aberto={aberto} titulo="Alterar marca">
      <Formulario dadosIniciais={marca} aoEnviar={manipularEnvio}>
        <CampoDeTexto nome="descricao" label="Descrição" fullWidth required autoFocus/>
        <DragAndDrop nome="logomarca" required/>
        <DialogActions>
           <Button type="submit">Salvar</Button>
        </DialogActions>
      </Formulario>
      <Alerta ref={refAlerta} />
    </Dialogo>
  )
}

export default memo(DialogoAlterarMarca);