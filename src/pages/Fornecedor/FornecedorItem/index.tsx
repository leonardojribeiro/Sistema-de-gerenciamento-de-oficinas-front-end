import React, { memo } from 'react';
import { Box, IconButton, Grid, Tooltip, Hidden, Typography, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@material-ui/core';
import formato from '../../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Fornecedor from '../../../Types/Fornecedor';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';
import BreakWord from '../../../componentes/BreakWord';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface FornecedorItemProps {
  fornecedor: Fornecedor;
}

const FornecedorItem: React.FC<FornecedorItemProps> = ({ fornecedor }) => {
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Grid container justify="space-between" alignItems="center" >
          <Grid item sm={5} md={5}>
            <Box display="flex" alignItems="center">
              <PersonIcon />
              <Typography > {fornecedor.nomeFantasia}</Typography>
            </Box>
          </Grid>
          <Hidden xsDown>
            <Grid item>
              <Box display="flex" alignItems="center">
                <PhoneAndroidIcon />
                <Typography> {formato.formatarTelefone(fornecedor.telefoneCelular)}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Tooltip title={`Alterar o fornecedor ${fornecedor.nomeFantasia}`}>
                <IconButton component={Link} to={`/fornecedores/alterarfornecedor?id=${fornecedor._id}`}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Hidden>
        </Grid>
      </AccordionSummary>
      <AccordionDetails >
        <Grid container>
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>
              <Typography >
                CPF/CNPJ: {formato.formatarCpfCnpj(fornecedor.cpfCnpj)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography >
                Razão Social: {fornecedor.razaoSocial}
              </Typography>
            </Grid>
            {fornecedor.email ?
              <Grid item>
                <Box display="flex" alignItems="center">
                  <EmailIcon />
                  <BreakWord>{fornecedor.email}</BreakWord>
                </Box>
              </Grid>
              : null
            }
            {fornecedor.telefoneFixo ?
              <Grid item>
                <Box display="flex" alignItems="center">
                  <PhoneIcon />
                  <Typography>{formato.formatarTelefone(fornecedor.telefoneFixo)}</Typography>
                </Box>
              </Grid>
              : null
            }
            <Hidden smUp>
              <Grid item >
                <Box display="flex" alignItems="center">
                  <PhoneAndroidIcon />
                  <Typography>
                    {formato.formatarTelefone(fornecedor.telefoneCelular)}
                  </Typography>
                </Box>
              </Grid>
            </Hidden>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography >Endereço</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography >
                {`${fornecedor.endereco.logradouro}, ${fornecedor.endereco.numero} - ${fornecedor.endereco.bairro}. ${fornecedor.endereco.cidade} - ${fornecedor.endereco.estado}. CEP: ${fornecedor.endereco.cep}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
      <Hidden smUp>
        <AccordionActions>
          <Grid item>
            <Tooltip title={`Alterar o fornecedor ${fornecedor.nomeFantasia}`}>
              <IconButton component={Link} to={`/fornecedores/alterarfornecedor?id=${fornecedor._id}`}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </AccordionActions>
      </Hidden>
    </Accordion>
  );
}

export default memo(FornecedorItem);