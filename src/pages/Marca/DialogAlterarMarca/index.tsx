import React, { useRef, useEffect, useContext, useState, memo, useCallback, } from 'react';
import Dialogo from '../../../componentes/Dialog';
import useQuery from '../../../hooks/useQuery';
import { DialogActions, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ApiContext from '../../../contexts/ApiContext';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeTexto, DragAndDrop } from '../../../componentes/Form';
import Marca from '../../../Types/Marca';

const DialogAlterarMarca: React.FC = () => {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const id = useQuery("id");
  const [marca, setMarca] = useState<Marca | undefined>(undefined);
  const { get, getTipoBlob, multipartPut } = useContext(ApiContext);
  const history = useHistory();
  const refAlerta = useRef<AlertaHandles | undefined>(undefined);

  const manipularEnvio = useCallback(async (marcaASerAlterada) => {
    if (marcaASerAlterada && marca) {
      if (!(marcaASerAlterada.descricao === marca.descricao) || !(marca.logomarca && marcaASerAlterada.logomarca === marca.logomarca[0])) {
        marcaASerAlterada._id = marca._id
        marcaASerAlterada.uriLogo = marca.uriLogo;
        const resposta = await multipartPut("/marca", marcaASerAlterada);
        if (resposta) {
          history.goBack();
        }
      }
      else {
        if (refAlerta && refAlerta.current) {
          refAlerta.current.setTipo("warning");
          refAlerta.current.setMensagem(<span></span>);
          refAlerta.current.setAberto(true);
        }
      }
    }
  }, [history, marca, multipartPut]);

  const popular = useCallback(async () => {
    const resposta = await get(`/marca/id?_id=${id}`) as Marca
    if (resposta) {
      let logomarca = null;
      if (resposta.uriLogo) {
        logomarca = await getTipoBlob(`${imagensUrl}/${resposta.uriLogo}`) as Blob;
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

  console.log(marca);

  useEffect(() => {
    popular();
  }, [popular])

  return (
    <Dialogo open  maxWidth="xs" fullWidth title="Alterar marca">
      <Form initialData={marca} onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
        <DragAndDrop name="logomarca" required />
        <DialogActions>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  )
}

export default memo(DialogAlterarMarca);