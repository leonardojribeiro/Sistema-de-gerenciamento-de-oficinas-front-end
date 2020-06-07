import React, { memo } from 'react';
import { Grid, Box, Typography, makeStyles } from '@material-ui/core';
import GoogleMaps from '../../componentes/GoogleMaps';

const useStyles = makeStyles({
  container: {
    minHeight: "var(--h-livre-assistente)",
  },
  containerPreviaLocalizacao: {
    height: "192px",
    width: "100%",
    position: "relative"
  },
});

function FrameConfirmaDados({dados}) {
  const classes = useStyles();
  const { nomeFantasia,
    razaoSocial,
    cpfCnpj,
    telefoneFixo,
    telefoneCelular,
    email,
    webSite,
    urlLogomarca,
    logradouro,
    bairro,
    numero,
    cep,
    complemento,
    cidade,
    estado,
    latitude,
    longitude } = dados;

  return (
    <Grid container className={classes.container} alignItems="center" spacing={2}>
      <Grid xs={12} md={6} item>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">Dados da Oficina</Typography>
          </Box>
          <Typography>Nome Fantasia: {nomeFantasia}</Typography>
          <Typography>Razão Social: {razaoSocial}</Typography>
          <Typography>CPF/CNPJ: {cpfCnpj}</Typography>
          <Typography>Telefone Fixo: {telefoneFixo}</Typography>
          <Typography>Telefone Celular: {telefoneCelular}</Typography>
          <Typography>E-mail: {email}</Typography>
          <Typography>Website: {webSite}</Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography>Logomarca:</Typography>
            <Box className={classes.containerPreviaImagem}>
              {urlLogomarca && (<img src={urlLogomarca} className={classes.previaImagem} alt="Logomarca" />)}
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} md={6} item>
        <Box p={2}>
          <Box display="flex" justifyContent="center">
            <Typography variant="h6">Dados do Endereço</Typography>
          </Box>
          <Typography>Logradouro: {logradouro}</Typography>
          <Typography>Bairro: {bairro}</Typography>
          <Grid container>
            <Grid xs={6} item>
              <Typography>Número: {numero}</Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography>CEP: {cep}</Typography>
            </Grid>
          </Grid>
          <Typography>Complemento: {complemento}</Typography>
          <Typography>Cidade: {cidade}</Typography>
          <Typography>Estado: {estado}</Typography>
          <Grid container>
            <Grid xs={6} item>
              <Typography>Latitude: {latitude}</Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography>Longitude: {longitude}</Typography>
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <Typography>Localização</Typography>
            <Box className={classes.containerPreviaLocalizacao}>
              <GoogleMaps
                initialCenter={{ lat: latitude, lng: longitude }}
                zoom={14}
              />
            </Box>
          </Box>
        </Box>

      </Grid>
    </Grid>
  );
}

export default memo(FrameConfirmaDados);