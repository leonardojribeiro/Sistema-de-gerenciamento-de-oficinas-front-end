import React, { memo } from 'react';
import { Box, IconButton, Grid, Tooltip, Hidden, Typography, Accordion, AccordionSummary, AccordionDetails, AccordionActions, makeStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formato from '../../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Cliente from '../../../Types/Cliente';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import BreakWord from '../../../componentes/BreakWord';

interface ClienteItemProps {
  cliente: Cliente;
}

const useStyles = makeStyles((theme) => ({
  summary: {
    background: theme.palette.background.default
  }
}))

const ClienteItem: React.FC<ClienteItemProps> = ({ cliente }) => {
  const classes = useStyles();
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes.summary}>
        <Grid container justify="space-between" alignItems="center" >
          <Grid item sm={5} md={5}>
            <Box display="flex" alignItems="center">
              <PersonIcon />
              <Typography > {cliente.nome}</Typography>
            </Box>
          </Grid>
          <Hidden xsDown>
            <Grid item>
              <Box display="flex" alignItems="center">
                <PhoneAndroidIcon />
                <Typography> {formato.formatarTelefone(cliente.telefoneCelular)}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Tooltip title={`Alterar o cliente ${cliente.nome}`}>
                <IconButton component={Link} to={`/clientes/alterarcliente?id=${cliente._id}`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Hidden>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>
              <Typography >
                CPF/CNPJ: {formato.formatarCpfCnpj(cliente.cpfCnpj)}
              </Typography>
            </Grid>
            {cliente.email &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <EmailIcon />
                  <BreakWord>{cliente.email}</BreakWord>
                </Box>
              </Grid>
            }
            {cliente.telefoneFixo &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <PhoneIcon />
                  <Typography>{formato.formatarTelefone(cliente.telefoneFixo)}</Typography>
                </Box>
              </Grid>
            }
            <Hidden smUp>
              <Grid item >
                <Box display="flex" alignItems="center">
                  <PhoneAndroidIcon />
                  <Typography>
                    {formato.formatarTelefone(cliente.telefoneCelular)}
                  </Typography>
                </Box>
              </Grid>
            </Hidden>
            <Grid item>
              <Box display="flex" alignItems="flex-end">
                <CakeIcon />
                <Typography >{formato.formatarData(cliente.dataNascimento)}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography >Sexo: {formato.formatarSexo(cliente.sexo)}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography >Endereço</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography >
                {`${cliente.endereco.logradouro}, ${cliente.endereco.numero} - ${cliente.endereco.bairro}. ${cliente.endereco.cidade} - ${cliente.endereco.estado}. CEP: ${cliente.endereco.cep}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Hidden smUp>
          <Grid item>
            <Tooltip title={`Alterar o cliente ${cliente.nome}`}>
              <IconButton component={Link} to={`/clientes/alterarcliente?id=${cliente._id}`}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Hidden>
      </AccordionActions>
    </Accordion>
  );
}

export default memo(ClienteItem);