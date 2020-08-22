import React, { useContext, useState, useCallback, useEffect, memo } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, MenuItem, Typography, makeStyles, Grid } from '@material-ui/core';
import { Form, CampoDeSelecao, CampoDeTexto } from '../../../componentes/Form';
import Marca from '../../../Types/Marca';

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

const DialogoInserirModelo: React.FC = () => {
  const classes = useStyles();
  const imagensUrl = process.env.REACT_APP_IMAGENS_URL;
  const { get, post } = useContext(ApiContext);
  const history = useHistory();
  const [marcas, setMarcas] = useState<Marca[]>([]);

  const manipularEnvio = useCallback(async (modelo) => {
    if (modelo) {
      const resposta = await post("/modelo", modelo);
      if (resposta) {
        history.goBack();
      }
    }
  },[history, post]);

  const listarMarcas = useCallback(async () => {
    const marcas = await get(`/marca`) as Marca[];
    if (marcas) {
      setMarcas(marcas);
    }
  }, [get,]);

  useEffect(() => {
    listarMarcas();
  }, [listarMarcas]);

  return (
    <Dialogo open title="Inserir modelo">
      <Form onSubmit={manipularEnvio}>
        <CampoDeTexto name="descricao" label="Descrição" fullWidth required autoFocus /> 
        <CampoDeSelecao  name="marca" label="Marca" fullWidth required>
          <MenuItem value="" className={classes.itemMenu}>Nenhum</MenuItem>
          {
            marcas.map((marca, index) => (
              <MenuItem key={index} value={marca._id} className={classes.itemMenu}>
                <Grid container justify="space-between">
                  <Typography>{marca.descricao}</Typography>
                  <img src={`${imagensUrl}/${marca.uriLogo}`} alt={`logomarca da marca ${marca.descricao}`} className={classes.imgLogomarca} />
                </Grid>
              </MenuItem>
            ))
          }
        </CampoDeSelecao>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
    </Dialogo>
  );
}

export default memo(DialogoInserirModelo);