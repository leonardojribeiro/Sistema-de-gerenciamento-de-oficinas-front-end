import React, { memo } from 'react';
import { Box, IconButton, Grid, Tooltip, Hidden, Typography, Accordion, AccordionSummary, AccordionDetails, AccordionActions, } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, useLocation } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import Formato from '../../recursos/Formato';
import BreakWord from '../BreakWord';
import SchoolIcon from '@material-ui/icons/School';
import Fornecedor from '../../Types/Fornecedor';
import Cliente from '../../Types/Cliente';
import Funcionario from '../../Types/Funcionario';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

interface PessoaItemProps extends Funcionario, Cliente, Fornecedor {
  linkToChangeText: string;
  linkToChangePath: string;
}

const PessoaItem: React.FC<PessoaItemProps> = (
  { _id, nome, nomeFantasia, razaoSocial, cpf, cpfCnpj, dataNascimento, telefoneFixo, telefoneCelular, sexo, email, endereco, especialidades, linkToChangeText, linkToChangePath }) => {

  const { pathname } = useLocation();
  return (
    <Accordion>
      <AccordionSummary onClick={()=>{}} expandIcon={<ExpandMoreIcon />}>
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
                  <Typography> {` ${Formato.formatarTelefone(telefoneCelular)}`}</Typography>
                </Box>
              </Grid>
            }
            <Grid item sm={1}>
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                {pathname === '/clientes' && (
                  <Tooltip title="Veículos desse cliente">
                    <IconButton component={Link} to={`clientes/veiculos?cliente=${_id}`}>
                      <DriveEtaIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title={linkToChangeText}>
                  <IconButton component={Link} to={linkToChangePath}>
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
                  <Typography>{" "+ Formato.formatarTelefone(telefoneFixo)}</Typography>
                </Box>
              </Grid>
            }
            {telefoneCelular &&
              <Hidden smUp>
                <Grid item >
                  <Box display="flex" alignItems="center">
                    <PhoneAndroidIcon />
                    <Typography>
                      {" "+Formato.formatarTelefone(telefoneCelular)}
                    </Typography>
                  </Box>
                </Grid>
              </Hidden>
            }
            {dataNascimento &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <CakeIcon />
                  <Typography >{" "+Formato.formatarData(dataNascimento)}</Typography>
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
              <Typography >Endereço:</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12}>
              <Typography >
                {endereco && `${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}. ${endereco.cidade} - ${endereco.estado}. CEP: ${endereco.cep}`}
              </Typography>
            </Grid>
            {especialidades &&
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <SchoolIcon />
                  <Typography>
                    {
                      especialidades?.map((especialidade, index) => `${especialidade.descricao}, `)
                    }
                  </Typography>
                </Box>
              </Grid>
            }
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Hidden smUp>
          <Grid item>
            <Tooltip title={linkToChangeText}>
              <IconButton component={Link} to={linkToChangePath}>
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