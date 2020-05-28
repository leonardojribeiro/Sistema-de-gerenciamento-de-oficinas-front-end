import React, { useEffect, useState, memo, useContext, useCallback, useMemo, useRef } from 'react';
import { Box, Container, Grid, Hidden, makeStyles, Step, StepButton, Stepper, Typography } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import CampoTexto from '../../componentes/CampoTexto';
import DragAndDrop from '../../componentes/DragAndDrop';
import GoogleMaps from '../../componentes/GoogleMaps';
import Button from "../../componentes/Button";
import CustomIconButton from '../../componentes/IconButton';
import SeletorImagem from '../../componentes/SeletorImagem';
import MascaraNumererica from '../../recursos/MascaraNumerica';
import validaCpfCnpj from '../../recursos/ValidaCpfCnplj';
import BarraSuperiorContext from '../../componentes/BarraSuperiorContext';

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
  },
  containerPreviaImagem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "192px",
    width: "80%",
    border: "dashed 1px "
  },
  previaImagem: {
    maxHeight: "192px",
    maxWidth: "80%",
  },
  containerPreviaLocalizacao: {
    height: "192px",
    width: "100%",
    position: "relative"
  },
  containerGoogleMaps: {
    height: "400px",
    width: "100%",
    position: "relative"
  }
});

function CadastroOficina({ ...props }) {
  //estados que irão cotrolar os campos de texto
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
  //referências dos campos de textos
  const refNomeFantasia = useRef();
  const refRazaoSocial = useRef();
  const refCpfCnpj = useRef();
  const refTelefoneFixo = useRef();
  const refTelefoneCelular = useRef();
  const refEmail = useRef();
  //const refWebSite = useRef();
  const refLogradouro = useRef();
  const refBairro = useRef();
  const refNumero = useRef();
  const refCep = useRef();
  const refComplemento = useRef();
  const refCidade = useRef();
  const refEstado = useRef();
  const refLatitude = useRef();
  const refLongitude = useRef();


  const [cpfCnpjValido, setCpfCnpjValido] = useState(true);

  const classes = useStyles();

  const [passoAtivo, setPassoAtivo] = useState(0);

  const { setItens } = useContext(BarraSuperiorContext);

  const getLocalizacao = () => {
    if (navigator && navigator.geolocation && latitude === "") {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      })
    };
  }


  useEffect(() => {
    setItens({
      itens: {
        botoes: (
          <CustomIconButton tooltip="Página Inicial" component={Link} to="/">
            <Home />
          </CustomIconButton>
        )
      }
    });
  }, [setItens]);



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



  const validarCpfCnpj = useCallback((cpfCnpj) => {
    if (validaCpfCnpj(cpfCnpj)) {
      setCpfCnpjValido(true);
      return true;
    }
    else {
      setCpfCnpjValido(false);
      return false;
    }
  }, []);

  function validarDados() {
    if (validarCpfCnpj(cpfCnpj)) {
      return true;
    }
    else {
      refCpfCnpj.current.focus();
      setCpfCnpjValido(false);
      return false;
    }
  }

  const handleNext = () => {
    setPassoAtivo(passoAtivo + 1);
  };

  const handleBack = () => {
    setPassoAtivo(passoAtivo - 1);
  };

  console.log(passoAtivo);

  const handleStep = (passo) => {
    if (passoAtivo !== passo) {
      if (passo < passoAtivo) {
        setPassoAtivo(passo);
      }
    }
  };

  const handleSubmitDados = evento => {
    console.log(evento);
    evento.preventDefault();
    evento.stopPropagation();

    if (validarDados()) {
      handleNext();
    }
  }

  const handleSubmitEndereco = evento => {
    evento.preventDefault();
    handleNext();
  }


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
        required={cpfCnpj.length === 18}
        fullWidth
        label="Razão Social"
        onChange={e => setRazaoSocial(e.target.value)}
        value={razaoSocial}
      />
    </Grid>,
    [razaoSocial, cpfCnpj]
  );

  const campoCpfCnpj = useMemo(() => {
    const handleChangeCpf = (e) => {
      setCpfCnpj(
        MascaraNumererica(
          e.target.value,
          tamanho => {
            return tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
              ? "000.000.000-00"
              : "00.000.000/0000-00"
          }
        )
      );
      if (!cpfCnpjValido) {
        validarCpfCnpj(e.target.value);
      }
    }

    return (
      <Grid xs={12} sm={6} md={4} item>
        <CampoTexto
          required
          fullWidth
          inputRef={refCpfCnpj}
          error={!cpfCnpjValido}
          helperText={!cpfCnpjValido ? "CPF/CNPJ inválido!" : ""}
          label="CPF/CNPJ"
          onChange={handleChangeCpf}
          value={cpfCnpj}
        />
      </Grid>
    )
  },
    [refCpfCnpj, cpfCnpj, cpfCnpjValido, validarCpfCnpj]
  );

  const campoTelefoneFixo = useMemo(() =>
    <Grid xs={12} sm={6} md={4} item>
      <CampoTexto
        type="tel"
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
        type="tel"
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
    <Box className={classes.containerGoogleMaps}>
      <GoogleMaps
        initialCenter={{ lat: latitude, lng: longitude }}
        center={{ lat: latitude, lng: longitude }}
        onClick={(x, y, e) => {
          setLatitude(e.latLng.lat());
          setLongitude(e.latLng.lng());
        }}
        zoom={10}
      />
    </Box>,
    [latitude, longitude, classes.containerGoogleMaps]
  );

  const botaoProximo = (
    <Box px={2}>
      <Button type="submit" variant="contained">
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
    <form method="post" action="" onSubmit={handleSubmitDados}>
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
      <Grid container justify="space-between" spacing={2}>
        <Grid item>
          <Button>
            Cancelar
          </Button>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Button>
                Voltar
              </Button>
            </Grid>
            <Grid item>
              {botaoProximo}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );

  const formEndereco = (
    <form method="post" action="" onSubmit={handleSubmitEndereco} onClick={() => getLocalizacao()}>
      <>
        <Grid container className={classes.container} justify="center" alignItems="center">
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
            <Box p={2}>
              {googleMaps}
            </Box>
          </Grid>
        </Grid>
      </>
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

  const etapa = [formOficina, formEndereco, confirmaDados];

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center">
        <Grid xs={12} item>
          <Stepper className={classes.fundo} nonLinear activeStep={passoAtivo} orientation="horizontal" >
            {passos.map((passo, index) => {
              return (
                <Step key={index}>
                  <StepButton onClick={() => handleStep(index)}>{passo.label}</StepButton>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        {etapa[passoAtivo]}
      </Grid>
    </Container>
  );
};
export default memo(CadastroOficina);