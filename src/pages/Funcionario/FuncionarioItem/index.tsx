import React, { memo } from 'react';
import { Box, IconButton, Grid, Tooltip, Hidden, Accordion, Typography, AccordionSummary, AccordionDetails, AccordionActions, } from '@material-ui/core';
import formato from '../../../recursos/Formato';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Funcionario from '../../../Types/Funcionario';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import BreakWord from '../../../componentes/BreakWord';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SchoolIcon from '@material-ui/icons/School';

interface FuncionarioItemProps {
  funcionario: Funcionario;
}


const FuncionarioItem: React.FC<FuncionarioItemProps> = ({ funcionario }) => {
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} >
        <Grid container justify="space-between" alignItems="center" >
          <Grid item sm={5} md={5}>
            <Box display="flex" alignItems="center">
              <PersonIcon />
              <Typography > {funcionario.nome}</Typography>
            </Box>
          </Grid>
          <Hidden xsDown>
            <Grid item>
              <Box display="flex" alignItems="center">
                <PhoneAndroidIcon />
                <Typography> {formato.formatarTelefone(funcionario.telefoneCelular)}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Tooltip title={`Alterar o funcionario ${funcionario.nome}`}>
                <IconButton component={Link} to={`/funcionarios/alterarfuncionario?id=${funcionario._id}`}>
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
                CPF/CNPJ: {formato.formatarCpfCnpj(funcionario.cpf)}
              </Typography>
            </Grid>
            {funcionario.email &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <EmailIcon />
                  <BreakWord>{funcionario.email}</BreakWord>
                </Box>
              </Grid>
            }
            {funcionario.telefoneFixo &&
              <Grid item>
                <Box display="flex" alignItems="center">
                  <PhoneIcon />
                  <Typography>{formato.formatarTelefone(funcionario.telefoneFixo)}</Typography>
                </Box>
              </Grid>
            }
            <Hidden smUp>
              <Grid item >
                <Box display="flex" alignItems="center">
                  <PhoneAndroidIcon />
                  <Typography>
                    {formato.formatarTelefone(funcionario.telefoneCelular)}
                  </Typography>
                </Box>
              </Grid>
            </Hidden>
            <Grid item>
              <Box display="flex" alignItems="center">
                <CakeIcon />
                <Typography >{formato.formatarData(funcionario.dataNascimento)}</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography >Sexo: {formato.formatarSexo(funcionario.sexo)}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item>
              <Typography >Endereço</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={12}>
              <Typography >
                {`${funcionario.endereco.logradouro}, ${funcionario.endereco.numero} - ${funcionario.endereco.bairro}. ${funcionario.endereco.cidade} - ${funcionario.endereco.estado}. CEP: ${funcionario.endereco.cep}`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <SchoolIcon/>
                <Typography>
                  {
                    funcionario.especialidades.map((especialidade, index) => `${especialidade.descricao}, `)
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
        <Hidden smUp>
          <Grid item>
            <Tooltip title={`Alterar o funcionario ${funcionario.nome}`}>
              <IconButton component={Link} to={`/funcionarios/alterarfuncionario?id=${funcionario._id}`}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Hidden>
      </AccordionActions>
    </Accordion>
  );
}

export default memo(FuncionarioItem);