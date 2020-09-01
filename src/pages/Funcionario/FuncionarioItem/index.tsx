import React, { memo } from 'react';
import { TableRow, TableCell, Collapse, Box, IconButton, Grid, makeStyles, Tooltip, Hidden, Container } from '@material-ui/core';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import formato from '../../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Funcionario from '../../../Types/Funcionario';

interface FuncionarioItemProps {
  funcionario: Funcionario;
}

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

const FuncionarioItem: React.FC<FuncionarioItemProps> = ({ funcionario }) => {
  const [aberto, setAberto] = useState(false);
  const classes = useStyles();
  return (
    <>
      <TableRow hover className={classes.root}>
        <TableCell>{funcionario.nome}</TableCell>
        <Hidden xsDown>
          <TableCell >{formato.formatarTelefone(funcionario.telefoneCelular)}</TableCell>
        </Hidden>
        <TableCell align="right">
          <Tooltip title={aberto ? "Recolher" : "Expandir"} >
            <IconButton onClick={() => setAberto(!aberto)}>
              {aberto ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          <Tooltip title={`Alterar o funcionario ${funcionario.nome}`}>
            <IconButton component={Link} to={`/funcionarios/alterarfuncionario?id=${funcionario._id}`}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={aberto} timeout="auto" unmountOnExit>
            <Box mb={1} className={classes.expansao}>
              <Container>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>CPF/CNPJ: {formato.formatarCpfCnpj(funcionario.cpf)}</Grid>
                  {funcionario.email && <Grid item>E-mail: {funcionario.email}</Grid>}
                  {funcionario.telefoneFixo && <Grid item>Telefone Fixo: {formato.formatarTelefone(funcionario.telefoneCelular)}</Grid>}
                  <Hidden smUp>
                    <Grid item >Telefone Celular {formato.formatarTelefone(funcionario.telefoneCelular)}</Grid>
                  </Hidden>
                  <Grid item>Data de nascimento: {formato.formatarData(funcionario.dataNascimento)}</Grid>
                  <Grid item>Sexo: {formato.formatarSexo(funcionario.sexo)}</Grid>
                </Grid>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>Endereço</Grid>
                </Grid>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>Logradouro: {funcionario.endereco.logradouro}</Grid>
                  <Grid item>Bairro: {funcionario.endereco.bairro}</Grid>
                  <Grid item>CEP: {funcionario.endereco.cep}</Grid>
                  {funcionario.endereco.complemento && <Grid item>Complemento: {funcionario.endereco.complemento}</Grid>}
                  <Grid item>Cidade: {funcionario.endereco.cidade}</Grid>
                  <Grid item>Estado: {funcionario.endereco.estado}</Grid>
                </Grid>
                <Grid container spacing={2} justify="space-between">
                  <Grid item>Especialidades</Grid>
                </Grid>
                <Grid container spacing={2}>
                  {
                    funcionario.especialidades.map((especialidade, index) => (
                      <Grid item key={index}>
                        {especialidade.descricao}
                      </Grid>
                    ))
                  }
                </Grid>
              </Container>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </ >
  );
}

export default memo(FuncionarioItem);