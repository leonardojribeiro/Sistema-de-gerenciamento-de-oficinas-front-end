import { Box, Button, Container, Grid, Hidden, makeStyles, Step, StepButton, Stepper, Typography } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import CampoTexto from '../../componentes/CampoTextohook';
import DragAndDrop from '../../componentes/DragAndDrop';
import GoogleMaps from '../../componentes/GoogleMaps';
import CustomIconButton from '../../componentes/IconButton';
import SeletorImagem from '../../componentes/SeletorImagem';
import MascaraNumererica from '../../recursos/MascaraNumerica';
import { useMemo } from 'react';

const useStyles = makeStyles({
  fundo: {
    padding: "8px",
    backgroundColor: "inherit",
    '& .MuiStepIcon-root': {
      color: "#888"
    },
    '& .MuiStepIcon-active': {
      color: "var(--cor)"
    },
    '& .MuiStepLabel-label': {
      color: "var(--cor)"
    },
    '& .MuiStepIcon-text': {
      fill: "var(--cor)"
    },
    '& .MuiStepIcon-active .MuiStepIcon-text': {
      fill: "var(--bg-cor)"
    },
    '& .MuiStepIcon-completed': {
      color: "var(--cor)"
    }
  },
  container: {
    minHeight: "var(--h-livre-assistente)",
  }
});

function CadastroOficina({ setItensBarraNavegacao, }) {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [telefoneCelular, setTelefoneCelular] = useState("");
  const [email, setEmail] = useState("");
  const [webSite, setWebsite] = useState("");
  const [logomarca, setLogomarca] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [urlLogomarca, setUrlLogomarca] = useState("");

  const classes = useStyles();

  const [passoAtivo, setPassoAtivo] = useState(0);

  const teste = useCallback(() => {
    setItensBarraNavegacao({
      itens: {
        botoes: (
          <CustomIconButton tooltip="Página Inicial" component={Link} to="/">
            <Home />
          </CustomIconButton>
        )
      }
    });
  }, [setItensBarraNavegacao]);

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      })
    }
    teste();
  }, []);


  const onChangeImagem = imagem => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUrlLogomarca(reader.result);
    }
    if (imagem[0]) {
      reader.readAsDataURL(imagem[0]);
      setLogomarca(imagem[0]);
    }
    else {
      setLogomarca(null);
    }
  };


  const campoNomeFantasia = useMemo(() =>
    <Grid xs={12} sm={12} md={6} item>
      <CampoTexto
        required
        fullWidth
        label="Nome Fantasia / Nome"
        onChange={e => setNomeFantasia(e.target.value)}
        value={nomeFantasia}
      />
    </Grid>,
    [nomeFantasia]
  );

  const campoRazaoSocial = useMemo(() =>
    <Grid xs={12} sm={12} md={6} item>
      <CampoTexto
        required
        fullWidth
        label="Razão Social"
        onChange={e => setRazaoSocial(e.target.value)}
        value={razaoSocial}
      />
    </Grid>,
    [razaoSocial]
  );

  const campoCpfCnpj = useMemo(() =>
    <Grid xs={12} sm={6} md={4} item>
      <CampoTexto
        required
        fullWidth
        label="CPF/CNPJ"
        onChange={e => setCpfCnpj(
          MascaraNumererica(
            e.target.value,
            tamanho => {
              return tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
                ? "000.000.000-00"
                : "00.000.000/0000-00"
            }
          )
        )}
        value={cpfCnpj}
      />
    </Grid>,
    [cpfCnpj]
  );

  const campoTelefoneFixo = useMemo(() =>
    <Grid xs={12} sm={6} md={4} item>
      <CampoTexto
        required
        fullWidth
        label="Telefone Fixo"
        onChange={e => setTelefoneFixo(
          MascaraNumererica(
            e.target.value,
            tamanho => {
              return tamanho < 11
                ? "(00) 0000-0000"
                : "(00) 00000-0000"
            }
          )
        )}
        value={telefoneFixo}
      />
    </Grid>,
    [telefoneFixo]
  );

  const campoTelefoneCelular = useMemo(() =>
    <Grid xs={12} sm={6} md={4} item>
      <CampoTexto
        required
        fullWidth
        label="Telefone Celular"
        onChange={e => setTelefoneCelular(
          MascaraNumererica(
            e.target.value,
            tamanho => {
              return tamanho < 11
                ? "(00) 0000-0000"
                : "(00) 00000-0000"
            }
          )
        )}
        value={telefoneCelular}
      />
    </Grid>,
    [telefoneCelular]
  );

  const campoEmail = useMemo(() =>
    <Grid xs={12} sm={6} md={4} item>
      <CampoTexto
        required
        type="email"
        fullWidth
        label="E-mail"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
    </Grid>,
    [email]
  );

  const campoWebsite = useMemo(() =>
    <Grid xs={12} md={8} item>
      <CampoTexto
        required
        fullWidth
        label="Website"
        onChange={e => setWebsite(e.target.value)}
        value={webSite}
      />
    </Grid>,
    [webSite]
  );

  const campoSeletorImagem = useMemo(() =>
    <Hidden smUp>
      <SeletorImagem
        urlImagem={urlLogomarca}
        onChange={onChangeImagem}
      />
    </Hidden>,
    [urlLogomarca]
  );

  const campoLogradouro = useMemo(() =>
    <Grid xs={12} md={6} item>
      <CampoTexto
        required
        fullWidth 
        label="Logradouro"
        onChange={e => setLogradouro(e.target.value)}
        value={logradouro}
      />
    </Grid>,
    [logradouro]
  );

  const campoBairro = useMemo(() =>
    <Grid xs={12} md={6} item>
      <CampoTexto
        required
        fullWidth
        label="Bairro"
        onChange={e => setBairro(e.target.value)}
        value={bairro}
      />
    </Grid>,
    [bairro]
  );

  const campoNumero = useMemo(() =>
    <Grid xs={6} sm={6} md={3} item>
      <CampoTexto
        required
        fullWidth
        label="Número"
        onChange={e => setNumero(e.target.value)}
        value={numero}
      />
    </Grid>,
    [numero]
  );

  const campoCep = useMemo(() =>
    <Grid xs={6} md={3} item>
      <CampoTexto
        required
        fullWidth
        label="CEP"
        onChange={e => setCep(
          MascaraNumererica(
            e.target.value,
            () => {
              return "00000-000"
            }
          )
        )}
        value={cep}
      />
    </Grid>,
    [cep]
  );

  const campoComplemento = useMemo(() =>
    <Grid xs={12} md={6} item>
      <CampoTexto
        required
        fullWidth
        label="Complemento"
        onChange={e => setComplemento(e.target.value)}
        value={complemento}
      />
    </Grid>,
    [complemento]
  )

  const campoCidade = useMemo(() =>
    <Grid xs={12} sm={6} item>
      <CampoTexto
        required
        fullWidth 
        label="Cidade"
        onChange={e => setCidade(e.target.value)}
        value={cidade}
      />
    </Grid>,
    [cidade]
  );

  const campoEstado = useMemo(() =>
    <Grid xs={12} sm={6} item>
      <CampoTexto
        required
        fullWidth
        label="Estado"
        onChange={e => setEstado(e.target.value)}
        value={estado}
      />
    </Grid>,
    [estado]
  );

  const campoLatitude = useMemo(() =>
    <Grid xs={12} sm={6} item>
      <CampoTexto
        required
        fullWidth
        label="Latitude"
        onChange={e => setLatitude(e.target.value)}
        value={latitude}
        type="number"
      />
    </Grid>,
    [latitude]
  );

  const campoLongitude = useMemo(() =>
    <Grid xs={12} sm={6} item>
      <CampoTexto
        required
        fullWidth
        label="Longitude"
        onChange={e => setLongitude(e.target.value)}
        value={longitude}
        type="number"
      />
    </Grid>,
    [longitude]
  );

  const dragAndDrop = useMemo(() =>
    <Grid xs={12} lg={4} item>
      <Box mt={2} p={2} display="flex" justifyContent="center">
        <DragAndDrop
          urlImagem={urlLogomarca}
          onChange={onChangeImagem}
        />
      </Box>
    </Grid>,
    [urlLogomarca]
  );

  const googleMaps = useMemo(() =>
    <Box p={2}>
      <GoogleMaps
        initialCenter={{ lat: latitude, lng: longitude }}
        onClick={(x, y, e) => {
          setLatitude(e.latLng.lat());
          setLongitude(e.latLng.lng());
        }}
      />
    </Box>,
    [latitude, longitude]
  );



  const handleNext = () => {

    setPassoAtivo(passoAtivo + 1);

  };

  const handleBack = () => {
    setPassoAtivo((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setPassoAtivo(step);
  };

  const botaoProximo = (
    <Box px={2}>
      <Button type="submit" variant="contained" color="primary" onClick={e=>console.log(e)}>
        Próximo
      </Button>
    </Box>
  );

  const botaoAnterior = (
    <Box px={2}>
      <Button onClick={handleBack} variant="contained">
        Voltar
      </Button>
    </Box>
  );

  const formOficina = (
    <form method="post" action="" onSubmit={e => e.preventDefault()}>
      <Grid container className={classes.container} alignItems="center">
        <Grid item lg={8}>
          <Grid container justify="center" alignItems="center">
            {campoNomeFantasia}
            {campoRazaoSocial}
            {campoCpfCnpj}
            {campoTelefoneFixo}
            {campoTelefoneCelular}
            {campoEmail}
            {campoWebsite}
            {campoSeletorImagem}
          </Grid>
        </Grid>
        <Hidden xsDown>
          {dragAndDrop}
        </Hidden>
      </Grid>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item>
          {botaoProximo}
        </Grid>
      </Grid>
    </form>
  );


  const formEndereco = (
    <form method="post" action="" onSubmit={e => e.preventDefault()}>
      <Grid container className={classes.container} alignItems="center">
        <Grid container justify="center" alignItems="center">
          <Grid lg={8} item>
            <Grid container >
              {campoLogradouro}
              {campoBairro}
              {campoNumero}
              {campoCep}
              {campoComplemento}
              {campoCidade}
              {campoEstado}
              {campoLatitude}
              {campoLongitude}
            </Grid>
          </Grid>
          <Grid xs={12} lg={4} item>
            {googleMaps}
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="space-between" spacing={2}>
        <Grid item>
          {botaoAnterior}
        </Grid>
        <Grid item>
          {botaoProximo}
        </Grid>
      </Grid>
    </form>
  );


  const confirmaDados = (
    <Grid container>
      <Grid xs={12} item>
        <Typography>Nome Fantasia: {nomeFantasia}</Typography>
      </Grid>
    </Grid>
  );


  const passos =
    [{
      label: "Dados",
      dados: formOficina
    },
    {
      label: "Endereço",
      dados: formEndereco
    },
    {
      label: "Confirmar",
      dados: confirmaDados
    }]

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center">
        <Grid xs={12} item>
          <Stepper className={classes.fundo} nonLinear activeStep={passoAtivo} orientation="horizontal" >
            {passos.map((passo, index) => {
              return (
                <Step key={index}>
                  <StepButton onClick={handleStep(index)}>{passo.label}</StepButton>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        {passos[passoAtivo].dados}
      </Grid>
    </Container>
  );
};
export default memo(CadastroOficina);