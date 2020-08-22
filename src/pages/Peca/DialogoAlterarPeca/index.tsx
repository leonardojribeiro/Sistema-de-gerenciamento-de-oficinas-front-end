import React, { useContext, useRef, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import CampoDeSelecao from '../../../componentes/Form/Fields/SelectField';
import { useState } from 'react';
import useQuery from '../../../hooks/useQuery';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { useMemo } from 'react';
import { Form, CampoDeTexto } from '../../../componentes/Form';
import Marca from '../../../Types/Marca';
import Peca from '../../../Types/Peca';

const useStyles = makeStyles((theme) => ({
  listagem: {
    minHeight: "50vh",
  },
  imgLogomarca: {
    maxHeight: "32px",
    maxWidth: "32px",
    objectFit: "scale-down"
  },
  itemMenu: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const DialogoAlterarModelo: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { get, put } = useContext(ApiContext);
  const history = useHistory();
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [peca, setPeca] = useState<Peca | undefined>();
  const refAlerta = useRef<AlertaHandles>();
  const id = useQuery("id");

  const manipularEnvio = useCallback(async (pecaASerAlterada) => {
    if (pecaASerAlterada && peca) {
      if (!(pecaASerAlterada.descricao === peca.descricao) || !(pecaASerAlterada.idMarca === peca.idMarca)) {
        pecaASerAlterada._id = peca._id;
        const resposta = await put("/peca", pecaASerAlterada);
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
  }, [history, peca, put]);


  const popular = useCallback(async () => {
    const resposta = await get(`/peca/id?_id=${id}`) as Peca;
    if (resposta) {
      setPeca(resposta)
    }
  }, [get, id,]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get("/marca") as Marca[];
    if (marcas) {
      setMarcas(marcas);
    }
    popular()
  }, [get, popular]);

  useEffect(() => {
    popular();
    listarMarcas();
  }, [popular, listarMarcas])

  const conteudo = useMemo(() => (
    <Form onSubmit={manipularEnvio} initialData={peca}>
      <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus />
      <CampoDeSelecao name="marca" label="Marca" fullWidth required >
        {
          marcas.map((marca, index) => (
            <MenuItem key={index} value={marca._id} className={classes.itemMenu}>
              <Grid container justify="space-between">
                <Typography>{marca.descricao}</Typography>
                <img src={`${imagensUrl}/${marca.uriLogo}`} alt="" className={classes.imgLogomarca} />
              </Grid>
            </MenuItem>
          ))
        }
      </CampoDeSelecao>
      <DialogActions >
        <Button type="submit">Salvar</Button>
      </DialogActions>
    </Form>
  ), [classes, imagensUrl, manipularEnvio, marcas, peca])

  return (
    <Dialogo open title="Alterar peça">
      {conteudo}
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogoAlterarModelo);