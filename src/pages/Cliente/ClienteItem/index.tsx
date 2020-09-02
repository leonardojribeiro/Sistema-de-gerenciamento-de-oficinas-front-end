import React, { memo } from 'react';
import { Box, IconButton, Grid, Tooltip, Hidden, Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import formato from '../../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Cliente from '../../../Types/Cliente';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';

interface ClienteItemProps {
  cliente: Cliente;
}

const ClienteItem: React.FC<ClienteItemProps> = ({ cliente }) => {
  return (
    <Accordion>
      <AccordionSummary >
        <Grid container justify="space-between" alignItems="center" >
          <Grid item sm={10} md={5}>
            <Box display="flex">
              <PersonIcon />
              <Typography > {cliente.nome}</Typography>
            </Box>
          </Grid>
          <Hidden smDown>
            <Grid item>
              <Box display="flex">
                <PhoneAndroidIcon />
                <Typography > {formato.formatarTelefone(cliente.telefoneCelular)}</Typography>
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
        <Box>
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>
              <Typography >
                CPF/CNPJ: {formato.formatarCpfCnpj(cliente.cpfCnpj)}
              </Typography>
            </Grid>
            {cliente.email &&
              <Grid item>
                <Typography noWrap >{cliente.email}</Typography>
              </Grid>
            }
            {cliente.telefoneFixo &&
              <Grid item>
                <Box display="flex">
                  <PhoneIcon />
                  <Typography>{formato.formatarTelefone(cliente.telefoneFixo)}</Typography>
                </Box>
              </Grid>
            }
            <Hidden smUp>
              <Grid item >
                <Box display="flex">
                  <PhoneAndroidIcon />
                  <Typography>
                    {formato.formatarTelefone(cliente.telefoneCelular)}
                  </Typography>
                </Box>
              </Grid>
            </Hidden>
            <Grid item>
              <Typography >Data de nascimento: {formato.formatarData(cliente.dataNascimento)}</Typography>
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
            <Grid item>Logradouro: {cliente.endereco.logradouro}</Grid>
            <Grid item>Bairro: {cliente.endereco.bairro}</Grid>
            <Grid item>CEP: {cliente.endereco.cep}</Grid>
            {cliente.endereco.complemento && <Grid item>Complemento: {cliente.endereco.complemento}</Grid>}
            <Grid item>Cidade: {cliente.endereco.cidade}</Grid>
            <Grid item>Estado: {cliente.endereco.estado}</Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default memo(ClienteItem);