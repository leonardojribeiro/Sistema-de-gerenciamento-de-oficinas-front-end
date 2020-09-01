import React, { memo } from 'react';
import { Collapse, Box, IconButton, Grid, makeStyles, Tooltip, Hidden, Typography } from '@material-ui/core';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import formato from '../../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Fornecedor from '../../../Types/Fornecedor';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  linhaTabela: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    borderTop: `1px solid ${theme.palette.divider}`,
    height: "64px",
    position: "static"
  },
}));

interface FornecedorItemProps{
  fornecedor: Fornecedor;
}

const FornecedorItem: React.FC<FornecedorItemProps> = ({ fornecedor }) => {
  const [aberto, setAberto] = useState<boolean>(false);
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.linhaTabela} justify="space-between" alignItems="center">
        <Grid item xs={5}>
          <Typography>{fornecedor.nomeFantasia}</Typography>
        </Grid>
        <Hidden smDown>
          <Grid item>
            <Typography >Telefone Celular{formato.formatarTelefone(fornecedor.telefoneCelular)}</Typography>
          </Grid>
        </Hidden>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Tooltip title={aberto ? "Recolher" : "Expandir"} >
                <IconButton onClick={() => setAberto(!aberto)}>
                  {aberto ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={`Alterar o fornecedor ${fornecedor.nomeFantasia}`}>
                <IconButton component={Link} to={`/fornecedores/alterarfornecedor?id=${fornecedor._id}`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Collapse in={aberto} timeout="auto" unmountOnExit>
        <Box mb={1} pt={2}>
          <Grid container spacing={2} justify="space-between">
            <Grid item>CPF/CNPJ: {formato.formatarCpfCnpj(fornecedor.cpfCnpj)}</Grid>
            {fornecedor.razaoSocial && <Grid item>Razão social: {fornecedor.razaoSocial}</Grid>}
            {fornecedor.email && <Grid item>E-mail: {fornecedor.email}</Grid>}
            {fornecedor.telefoneFixo && <Grid item>Telefone Fixo: {formato.formatarTelefone(fornecedor.telefoneCelular)}</Grid>}
            <Hidden mdUp>
              <Grid item >Telefone Celular {formato.formatarTelefone(fornecedor.telefoneCelular)}</Grid>
            </Hidden>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>Endereço</Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>Logradouro: {fornecedor.endereco.logradouro}</Grid>
            <Grid item>Bairro: {fornecedor.endereco.bairro}</Grid>
            <Grid item>CEP: {fornecedor.endereco.cep}</Grid>
            {fornecedor.endereco.complemento && <Grid item>Complemento: {fornecedor.endereco.complemento}</Grid>}
            <Grid item>Cidade: {fornecedor.endereco.cidade}</Grid>
            <Grid item>Estado: {fornecedor.endereco.estado}</Grid>
          </Grid>
        </Box>
      </Collapse>
    </>
  );
}

export default memo(FornecedorItem);