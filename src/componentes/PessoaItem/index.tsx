import React, { memo } from 'react';
import { Box, IconButton, Grid, Tooltip, Hidden, Typography, Accordion, AccordionSummary, AccordionDetails, AccordionActions, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import Formato from '../../recursos/Formato';
import BreakWord from '../BreakWord';
import Endereco from '../../Types/Endereco';

interface PessoaItemProps {
  _id?: string;
  nome?: string;
  nomeFantasia?: string;
  cpf?: string;
  cpfCnpj?: string;
  razaoSocial?: string;
  sexo?: string;
  email?: string;
  dataNascimento?: Date;
  telefoneCelular?: string;
  telefoneFixo?: string;
  endereco?: Endereco;
  linkText: string;
  linkToChange: string;
}

const PessoaItem: React.FC<PessoaItemProps> = (
  { _id, nome, nomeFantasia, razaoSocial, cpf, cpfCnpj, dataNascimento, telefoneFixo, telefoneCelular, sexo, email, endereco, linkText, linkToChange }) => {
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container justify="space-between" alignItems="center" >
          <Grid item sm={6} md={4}>
            {nome &&
              <Box display="flex" alignItems="center">
                <PersonIcon />
                <Typography > {nome}</Typography>
              </Box>
            }
            {nomeFantasia &&
              <Box display="flex" alignItems="center">
                <PersonIcon />
                <Typography > {nomeFantasia}</Typography>
              </Box>
            }
          </Grid>
          <Hidden xsDown>
            {telefoneCelular &&
              <Grid item sm={5} md={3}>
                <Box display="flex" alignItems="center">
                  <PhoneAndroidIcon />
                  <Typography> {Formato.formatarTelefone(telefoneCelular)}</Typography>
                </Box>
              </Grid>
            }
            <Grid item sm={1}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Tooltip title={linkText}>
                  <IconButton component={Link} to={`${linkToChange}?id=${_id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid container spacing={2} justify="space-between" alignItems="center">
            <Grid item>
              {razaoSocial &&
                <Typography >
                  Razão social: {razaoSocial}
                </Typography>
              }
              {cpfCnpj &&
                <Typography >
                  CPF/CNPJ: {Formato.formatarCpfCnpj(cpfCnpj)}
                </Typography>
              }
              {cpf &&
                <Typography >
                  CPF: {Formato.formatarCpfCnpj(cpf)}
                </Typography>
              }
            </Grid>
            {email &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <EmailIcon />
                  <BreakWord>{email}</BreakWord>
                </Box>
              </Grid>
            }
            {telefoneFixo &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <PhoneIcon />
                  <Typography>{Formato.formatarTelefone(telefoneFixo)}</Typography>
                </Box>
              </Grid>
            }
            {telefoneCelular &&
              <Hidden smUp>
                <Grid item >
                  <Box display="flex" alignItems="center">
                    <PhoneAndroidIcon />
                    <Typography>
                      {Formato.formatarTelefone(telefoneCelular)}
                    </Typography>
                  </Box>
                </Grid>
              </Hidden>
            }
            {dataNascimento &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <CakeIcon />
                  <Typography >{Formato.formatarData(dataNascimento)}</Typography>
                </Box>
              </Grid>
            }
            {sexo &&
              <Grid item>
                <Typography >Sexo: {Formato.formatarSexo(sexo)}</Typography>
              </Grid>
            }
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography >Endereço</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography >
                {endereco && `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}. ${endereco.cidade} - ${endereco.estado}. CEP: ${endereco.cep}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Hidden smUp>
          <Grid item>
            <Tooltip title={linkText}>
              <IconButton component={Link} to={`${linkToChange}?id=${_id}`}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Hidden>
      </AccordionActions>
    </Accordion >
  );
}

export default memo(PessoaItem);