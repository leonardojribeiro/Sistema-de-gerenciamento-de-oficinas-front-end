import React, { memo } from 'react';
import { TableRow, TableCell, Collapse, Box, IconButton, Grid, makeStyles, Tooltip, Hidden, Container } from '@material-ui/core';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import formato from '../../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Cliente from '../../../Types/Cliente';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  expansao: {
    backgroundColor: theme.palette.action.hover
  }
}));

interface ClienteItemProps {
  cliente: Cliente;
}

const ClienteItem: React.FC<ClienteItemProps> = ({ cliente }) => {
  const [aberto, setAberto] = useState<boolean>(false);
  const classes = useStyles();
  return (
    <>
      <TableRow hover className={classes.root}>
        <TableCell>{cliente.nome}</TableCell>
        <Hidden xsDown>
          <TableCell >{formato.formatarTelefone(cliente.telefoneCelular)}</TableCell>
        </Hidden>
        <TableCell align="right">
          <Tooltip title={aberto ? "Recolher" : "Expandir"} >
            <IconButton onClick={() => setAberto(!aberto)}>
              {aberto ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          <Tooltip title={`Alterar o cliente ${cliente.nome}`}>
            <IconButton component={Link} to={`/clientes/alterarcliente?id=${cliente._id}`}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={aberto} timeout="auto" unmountOnExit>
            <Container>
              <Box mb={1} className={classes.expansao}>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>CPF/CNPJ: {formato.formatarCpfCnpj(cliente.cpfCnpj)}</Grid>
                  {cliente.email && <Grid item>E-mail: {cliente.email}</Grid>}
                  {cliente.telefoneFixo && <Grid item>Telefone Fixo: {formato.formatarTelefone(cliente.telefoneCelular)}</Grid>}
                  <Hidden smUp>
                    <Grid item >Telefone Celular {formato.formatarTelefone(cliente.telefoneCelular)}</Grid>
                  </Hidden>
                  <Grid item>Data de nascimento: {formato.formatarData(cliente.dataNascimento)}</Grid>
                  <Grid item>Sexo: {formato.formatarSexo(cliente.sexo)}</Grid>
                </Grid>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>Endereço</Grid>
                </Grid>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>Logradouro: {cliente.endereco.logradouro}</Grid>
                  <Grid item>Bairro: {cliente.endereco.bairro}</Grid>
                  <Grid item>CEP: {cliente.endereco.cep}</Grid>
                  {cliente.endereco.complemento && <Grid item>Complemento: {cliente.endereco.complemento}</Grid>}
                  <Grid item>Cidade: {cliente.endereco.cidade}</Grid>
                  <Grid item>Estado: {cliente.endereco.estado}</Grid>
                </Grid>
              </Box>
            </Container>
          </Collapse>
        </TableCell>
      </TableRow>
    </ >
  );
}

export default memo(ClienteItem);