import React, { useCallback, useState, } from 'react';
import Dialog from '../../../componentes/Dialog';
import FormItensDePeca from '../ItensDePeca/FormItensDePeca';
import ItemDePeca from '../../../Types/ItemDePeca';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
  root:{
    '&:nth-child(odd)':{
      background: theme.palette.background.default,
    },
    '&:nth-child(even)':{
      background: theme.palette.background.paper,
    },
  }
}));

const DialogInserirOrdemDeServico: React.FC = () => {
  const classes = useStyles();
  const [itensDePeca, setItensDePeca] = useState<ItemDePeca[]>([]);

  const handleSubmitItemDePeca = useCallback((itemDePeca) => {
    setItensDePeca([...itensDePeca, itemDePeca]);
  }, [itensDePeca]);

  return (
    <Dialog title="Nova ordem de serviço" open maxWidth="lg" fullWidth>
      <Box>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="h5">Itens de Peça</Typography>
          </Grid>
        </Grid>
        <Box mt={2} className="tabela">
          {itensDePeca.map((itemDePeca, indice) => (
            <Grid key={indice} container justify="space-between" spacing={2}>
              <Grid item>
                <Typography>Peça: {itemDePeca.peca.descricao}</Typography>
              </Grid>
              <Grid item>
                <Typography>Fornecedor: {itemDePeca.fornecedor.nomeFantasia}</Typography>
              </Grid>
              <Grid item>
                <Typography>Valor unitário: {itemDePeca.valorUnitario}</Typography>
              </Grid>
              <Grid item>
                <Typography>Quantidade: {itemDePeca.quantidade}</Typography>
              </Grid>
              <Grid item>
                <Typography>Valor total: {itemDePeca.valorTotal}</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Box>
      <FormItensDePeca onSubmit={handleSubmitItemDePeca} />
    </Dialog>
  )
}

export default DialogInserirOrdemDeServico;