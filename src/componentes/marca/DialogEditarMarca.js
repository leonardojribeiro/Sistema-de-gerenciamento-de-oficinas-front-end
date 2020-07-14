import React, { useRef, useEffect, useContext, useState, memo } from 'react';
import Dialogo from '../Dialogo';
import useQuery from '../../hooks/useQuery';
import Form from '../Formulario/Form';
import CampoTexto from '../Formulario/Campos/CampoTexto';
import DragAndDrop from '../Formulario/Campos/DragAndDrop';
import { DialogActions, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ApiContext from '../../contexts/ApiContext';
import useAuth from '../../hooks/useAuth';
import Alerta from '../Alerta';

function DialogoEditar() {
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const id = useQuery("id");
  const ref = useRef();
  const [marca, setMarca] = useState({ descricao: " " });
  const { getTipoBlob, getComApiUrl, multipartPut, } = useContext(ApiContext);
  const { idOficina } = useAuth();
  const history = useHistory();
  const refAlerta = useRef();
  async function handleSubmit() {
    const marcaASerAlterada = ref.current.submitForm();
    if (marcaASerAlterada) {
      if (!(marcaASerAlterada.descricao === marca.descricao) || !(marcaASerAlterada.logomarca === marca.logomarca[0])) {
        marcaASerAlterada._id = marca._id
        marcaASerAlterada.uriLogo = marca.uriLogo;
        marcaASerAlterada.idOficina = idOficina;
        const resposta = await multipartPut("/marca", marcaASerAlterada);
        if (resposta) {
          history.goBack();
        }
      }
      else{
        if(refAlerta.current){
          refAlerta.current.setTipo("warning");
          refAlerta.current.setMensagem("Nenuma alteração foi efetuada.");
          refAlerta.current.setAberto(true);
        }
      }
    }
  }

  useEffect(() => {
    async function popular() {
      const resposta = await getComApiUrl(`/marca/id?idOficina=${idOficina}&_id=${id}`)
      console.log(resposta)
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

    }
    popular();
  }, [getComApiUrl, getTipoBlob, id, idOficina, imagensUrl])

  console.log("montado");

  return (
    <Dialogo titulo="Editar marca">
      <Form ref={ref} dadosIniciais={marca}>
        <CampoTexto
          nome="descricao"
          label="Descrição"
          fullWidth
          required
        />
        <DragAndDrop
          nome="logomarca"
          required
        />
      </Form>
      <DialogActions >
        <Button onClick={handleSubmit}>Salvar</Button>
      </DialogActions>
      <Alerta ref={refAlerta}/>
    </Dialogo>
  )
}

export default memo(DialogoEditar);