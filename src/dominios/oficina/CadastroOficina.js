import React, { useEffect, useState, memo, useContext, useCallback, useMemo, useRef } from 'react';
import { Box, Container, Grid, Hidden, makeStyles, Step, StepButton, Stepper, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import DragAndDrop from '../../componentes/DragAndDrop';
import GoogleMaps from '../../componentes/GoogleMaps';
import Button from "../../componentes/Button";
import CustomIconButton from '../../componentes/IconButton';
import SeletorImagem from '../../componentes/SeletorImagem';
import BarraSuperiorContext from '../../componentes/BarraSuperiorContext';
import validacao from '../../recursos/Validacao';
import CampoTexto from './CampoTexto';
import BackdropContext from '../../componentes/BackdropContext';

import { animateScroll } from 'react-scroll';

const useStyles = makeStyles({
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
  containerGoogleMaps: {
    height: "400px",
    width: "100%",
    position: "relative"
  },
  fundo: {
    padding: "8px",
  },
  containerPreviaLocalizacao: {
    height: "192px",
    width: "100%",
    position: "relative"
  },
  previaImagem: {
    maxHeight: "192px",
    maxWidth: "80%"
  }
});

function CadastroOficina({ ...props }) {
  const styles = useStyles();
  const { setItens } = useContext(BarraSuperiorContext);
  const {setBackdropOpen} = useContext(BackdropContext);

  const [passoAtivo, setPassoAtivo] = useState(0);

  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [telefoneCelular, setTelefoneCelular] = useState("");
  const [email, setEmail] = useState("");
  const [webSite, setWebsite] = useState("");
  const [logomarca, setLogomarca] = useState("");
  const [urlLogomarca, setUrlLogomarca] = useState("");

  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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

  const [nomeFantasiaValido, setNomeFantasiaValido] = useState(true);
  const [cpfCnpjValido, setCpfCnpjValido] = useState(true);
  const [razaoSocialValido, setRazaoSocialValido] = useState(true);
  const [telefoneCelularValido, setTelefoneCelularValido] = useState(true);
  const [telefoneFixoValido, setTelefoneFixoValido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);

  const [logradouroValido, setLogradouroValido] = useState(true);
  const [bairroValido, setBairroValido] = useState(true);
  const [numeroValido, setNumeroValido] = useState(true);
  const [cepValido, setCepValido] = useState(true);
  const [complementoValido, setComplementoValido] = useState(true);
  const [estadoValido, setEstadoValido] = useState(true);
  const [cidadeValido, setCidadeValido] = useState(true);
  const [latitudeValido, setLatitudeValido] = useState(true);
  const [longitudeValido, setLongitudeValido] = useState(true);

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

  const getLocalizacao = () => {
    if (navigator && navigator.geolocation && latitude === "") {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      })
    };
  }

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

  const validarNomeFantasia = useCallback((nomeFantasiaCopia = nomeFantasia) => {
    if (validacao.validarNome(nomeFantasiaCopia)) {
      setNomeFantasiaValido(true);
      return true;
    }
    else {
      setNomeFantasiaValido(false);
      refNomeFantasia.current.focus();
      return false;
    }
  }, [nomeFantasia]);

  const validarCpfCnpj = useCallback((cpfCnpjCopia = cpfCnpj) => {
    if (validacao.validarCpfCnpj(cpfCnpjCopia)) {
      setCpfCnpjValido(true);
      return true;
    }
    else {
      setCpfCnpjValido(false);
      refCpfCnpj.current.focus();
      return false;
    }
  }, [cpfCnpj]);

  const validarRazaoSocial = useCallback((razaoSocialCopia = razaoSocial) => {
    if (cpfCnpj.length === 18) {
      if (validacao.validarTexto(razaoSocialCopia)) {
        setRazaoSocialValido(true);
        return true;
      }
      else {
        setRazaoSocialValido(false);
        refRazaoSocial.current.focus();
        return false;
      }
    }
    return true;
  },
    [cpfCnpj, razaoSocial]
  );

  const validarTelefoneFixo = useCallback((telefoneFixoCopia = telefoneFixo) => {
    if (telefoneFixo.length > 0) {
      if (validacao.validarTelefone(telefoneFixoCopia)) {
        setTelefoneFixoValido(true);
        return true;
      }
      else {
        setTelefoneFixoValido(false);
        refTelefoneFixo.current.focus()
        return false;
      }
    }
    return true;
  },
    [telefoneFixo]
  );

  const validarTelefoneCelular = useCallback((telefoneCelularCopia = telefoneCelular) => {
    if (validacao.validarTelefone(telefoneCelularCopia)) {
      setTelefoneCelularValido(true);
      return true;
    }
    else {
      setTelefoneCelularValido(false);
      refTelefoneCelular.current.focus();
      return false;
    }
  },
    [telefoneCelular]
  );

  const validarEmail = useCallback((emailCopia = email) => {
    if (validacao.validarEmail(emailCopia)) {
      setEmailValido(true);
      return true;
    }
    else {
      setEmailValido(false);
      refEmail.current.focus();
      return false;
    }
  },
    [email]
  );

  const validarLogradouro = useCallback((logradouroCopia = logradouro) => {
    if (validacao.validarTexto(logradouroCopia)) {
      setLogradouroValido(true);
      return true;
    }
    else {
      setLogradouroValido(false);
      refLogradouro.current.focus();
      return false;
    }
  },
    [logradouro]
  );

  const validarBairro = useCallback((bairroCopía = bairro) => {
    if (validacao.validarTexto(bairroCopía)) {
      setBairroValido(true);
      return true;
    }
    else {
      setBairroValido(false);
      refBairro.current.focus();
      return false;
    }
  },
    [bairro]
  );

  const validarNumero = useCallback((numeroCopia = numero) => {
    if (validacao.validarTexto(numeroCopia)) {
      setNumeroValido(true);
      return true;
    }
    else {
      setNumeroValido(false);
      refNumero.current.focus();
      return false;
    }
  },
    [numero]
  );

  const validarCep = useCallback((cepCopia = cep) => {
    if (validacao.validarCep(cepCopia)) {
      setCepValido(true);
      return true;
    }
    else {
      setCepValido(false);
      refCep.current.focus();
      return false;
    }
  }, [cep]
  );

  const validarComplemento = useCallback((complementoCopia = complemento) => {
    if (validacao.validarTexto(complementoCopia)) {
      setComplementoValido(true);
      return true;
    }
    else {
      setComplementoValido(false);
      refComplemento.current.focus();
      return false;
    }
  },
    [complemento]
  );

  const validarLatitude = (latitudeCopia = latitude) => {
    if (validacao.validarNumero(latitudeCopia)) {
      setLatitudeValido(true);
      return true;
    }
    else {
      setLatitudeValido(false);
      refLatitude.current.focus();
      return false;
    }
  }

  const validarLongitude = (longitudeCopia = longitude) => {
    if (validacao.validarNumero(longitudeCopia)) {
      setLongitudeValido(true);
      return true;
    }
    else {
      setLongitudeValido(false);
      refLongitude.current.focus();
      return false;
    }
  }

  function validarDados(passoAtivoCopia = passoAtivo) {
    if (passoAtivoCopia === 0) {
      return validarNomeFantasia()
        && validarCpfCnpj()
        && validarRazaoSocial()
        && validarTelefoneFixo()
        && validarTelefoneCelular()
        && validarEmail();
    }
    if (passoAtivoCopia === 1) {
      return validarLogradouro()
        && validarBairro()
        && validarNumero()
        && validarCep()
        && validarComplemento()
        && validarLatitude()
        && validarLongitude();
    }
    return true;
  }

  const handleNext = () => {
    setPassoAtivo(passoAtivo + 1);
    animateScroll.scrollToTop({duration: 300});
  };

  const handleBack = () => {
    if (passoAtivo > 0) {
      setPassoAtivo(passoAtivo - 1);
      animateScroll.scrollToTop({duration: 300});
    }
  };

  const handleStep = (passo) => {
    if (passoAtivo !== passo) {
      if (passo < passoAtivo) {
        setPassoAtivo(passo);
      }
      else {
        if (passoAtivo === passo - 1) {
          if (validarDados()) {
            handleNext();
          }
        }
      }
    }
  };

  function handleSubmit() {
    if (validarDados()) {
      if (passoAtivo < 2) {
        handleNext();
      }
      else{
        setBackdropOpen(true);
      }
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }

  const campoNomeFantasia = (
    <Grid item xs={12}>
      <CampoTexto
        ref={refNomeFantasia}
        obrigatorio
        label="Nome / Nome fantasia"
        valor={nomeFantasia}
        valido={nomeFantasiaValido}
        onChange={setNomeFantasia}
        validar={validarNomeFantasia}
        erroInvalido="O nome / nome fantasia deve ter pelo menos 3 caracteres."
        erroObrigatorio={"O nome / nome fantasia é obrigatório."}
      />
    </Grid>
  );


  const campoCpfCnpj = (
    <Grid xs={12} md={4} item>
      <CampoTexto
        ref={refCpfCnpj}
        obrigatorio
        label="CPF/CNPJ"
        valor={cpfCnpj}
        onChange={setCpfCnpj}
        validar={validarCpfCnpj}
        valido={cpfCnpjValido}
        erroInvalido="CPF/CNPJ inválido."
        erroObrigatorio="O CPF/CNPJ é obrigatório."
        mascara={
          tamanho =>
            tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
              ? "000.000.000-00"
              : "00.000.000/0000-00"
        }
        type="tel"
      />
    </Grid>
  );

  const campoRazaoSocial = (
    <Grid xs={12} md={8} item>
      <CampoTexto
        ref={refRazaoSocial}
        obrigatorio={cpfCnpj.length === 18}
        label="Razão Social"
        onChange={setRazaoSocial}
        validar={validarRazaoSocial}
        valor={razaoSocial}
        valido={razaoSocialValido}
        erroInvalido="A razão social deve ter pelo menos 1 caractere."
        erroObrigatorio="A razão social é obrigatória."
      />
    </Grid>
  );

  const campoTelefoneFixo = (
    <Grid xs={12} sm={6} item>
      <CampoTexto
        ref={refTelefoneFixo}
        type="tel"
        label="Telefone Fixo"
        onChange={setTelefoneFixo}
        validar={validarTelefoneFixo}
        valor={telefoneFixo}
        valido={telefoneFixoValido}
        erroInvalido="Número de telefone fixo inválido."
        mascara={
          tamanho =>
            tamanho < 11
              ? "(00) 0000-0000"
              : "(00) 00000-0000"
        }
      />
    </Grid>
  );

  const campoTelefoneCelular = (
    <Grid xs={12} sm={6} item>
      <CampoTexto
        type="tel"
        ref={refTelefoneCelular}
        obrigatorio
        label="Telefone Celular"
        onChange={setTelefoneCelular}
        validar={validarTelefoneCelular}
        valor={telefoneCelular}
        valido={telefoneCelularValido}
        erroInvalido="Número de telefone celular inválido."
        erroObrigatorio="O número de telefone celular é obrigatório."
        mascara={
          tamanho =>
            tamanho < 11
              ? "(00) 0000-0000"
              : "(00) 00000-0000"
        }
      />
    </Grid>
  );

  const campoEmail = (
    <Grid xs={12} md={4} item>
      <CampoTexto
        ref={refEmail}
        obrigatorio
        type="email"
        label="E-mail"
        onChange={setEmail}
        valor={email}
        valido={emailValido}
        validar={validarEmail}
        erroInvalido="E-mail inválido."
        erroObrigatorio="O E-mail é obrigatório."
      />
    </Grid>
  );

  const campoWebsite = useMemo(() =>
    <Grid xs={12} md={8} item>
      <CampoTexto
        label="Website"
        onChange={setWebsite}
        valor={webSite}
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

  const campoLogradouro = (
    <Grid xs={12} md={6} item>
      <CampoTexto
        ref={refLogradouro}
        obrigatorio
        label="Logradouro"
        onChange={setLogradouro}
        validar={validarLogradouro}
        valor={logradouro}
        valido={logradouroValido}
        erroInvalido="O logradouro deve ter pelo menos 3 caracteres."
        erroObrigatorio="O logradouro é obrigatório."
      />
    </Grid>
  );

  const campoBairro = (
    <Grid xs={12} md={6} item>
      <CampoTexto
        ref={refBairro}
        obrigatorio
        label="Bairro"
        onChange={setBairro}
        validar={validarBairro}
        valor={bairro}
        valido={bairroValido}
        erroInvalido="O bairro deve ter pelo menos 3 caracteres."
        erroObrigatorio="O bairro é obrigatório."
      />
    </Grid>
  );

  const campoNumero = (
    <Grid xs={6} sm={6} md={3} item>
      <CampoTexto
        ref={refNumero}
        obrigatorio
        label="Número"
        onChange={setNumero}
        validar={validarNumero}
        valor={numero}
        valido={numeroValido}
        erroObrigatorio="O número é obrigatório."
        erroInvalido="Número inválido"
      />
    </Grid>
  );

  const campoCep = (
    <Grid xs={6} md={3} item>
      <CampoTexto
        ref={refCep}
        obrigatorio
        label="CEP"
        onChange={setCep}
        validar={validarCep}
        valor={cep}
        valido={cepValido}
        erroInvalido="CEP inválido."
        erroObrigatorio="O CEP é obrigatório."
        mascara={() => "00000-000"}
        type="tel"
      />
    </Grid>
  );

  const campoComplemento = (
    <Grid xs={12} md={6} item>
      <CampoTexto
        ref={refComplemento}
        obrigatorio
        label="Complemento"
        onChange={setComplemento}
        validar={validarComplemento}
        valor={complemento}
        valido={complementoValido}
        erroInvalido="O complemento deve ter pelo menos 3 caracteres"
        erroObrigatorio="O complemento é obrigatório"
      />
    </Grid>
  );

  const campoCidade = (
    <Grid xs={12} sm={6} item>
      <CampoTexto
        ref={refCidade}
        obrigatorio
        label="Cidade"
        onChange={setCidade}
        valor={cidade}
      />
    </Grid>
  );


  const campoEstado = useMemo(() =>
    <Grid xs={12} sm={6} item>
      <Box mt={2} p={2}>
        <FormControl fullWidth>
          <InputLabel className={styles.label} id="estado">Estado</InputLabel>
          <Select className={styles.select} labelId="estado" id="estado" fullWidth value={estado} onChange={(e) => setEstado(e.target.value)}>
            <MenuItem value={10}>Goiás</MenuItem>
            <MenuItem value={20}>São Paulo</MenuItem>
            <MenuItem value={30}>Minas Gerais</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Grid>,
    [styles.label, styles.select, estado]
  );

  const campoLatitude = (
    <Grid xs={12} sm={6} item>
      <CampoTexto
        ref={refLatitude}
        obrigatorio
        label="Latitude"
        onChange={setLatitude}
        validar={validarLatitude}
        valor={latitude}
        valido={latitudeValido}
        type="number"
      />
    </Grid>
  );

  const campoLongitude = (
    <Grid xs={12} sm={6} item>
      <CampoTexto
        ref={refLongitude}
        obrigatorio
        label="Longitude"
        onChange={setLongitude}
        validar={validarLongitude}
        valor={longitude}
        valido={longitudeValido}
        type="number"
      />
    </Grid>
  );

  const googleMaps = useMemo(() =>
    <Box className={styles.containerGoogleMaps}>
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
    [latitude, longitude, styles.containerGoogleMaps]
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

  const botaoAnterior = (
    <Box px={2}>
      <Button onClick={handleBack} variant="outlined">
        {passoAtivo === 0 ? "Cancelar" : "Voltar"}
      </Button>
    </Box>
  );

  const botaoProximo = (
    <Box px={2}>
      <Button onClick={handleSubmit} variant="outlined">
        {passoAtivo === 2 ? "Salvar" : "Próximo"}
      </Button>
    </Box>
  );

  const formOficina = (
    <form method="post" action="" onKeyDown={handleKeyDown}>
      <Grid container className={styles.container} alignItems="center">
        <Grid item lg={8}>
          <Grid container justify="center" alignItems="center">
            {campoNomeFantasia}
            {campoCpfCnpj}
            {campoRazaoSocial}
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
    </form>
  );

  const formEndereco = (
    <form method="post" action="" onClick={() => getLocalizacao()} onKeyDown={handleKeyDown}>
      <Grid container className={styles.container} justify="center" alignItems="center">
        <Grid lg={8} item>
          <Grid container >
            {campoLogradouro}
            {campoBairro}
            {campoNumero}
            {campoCep}
            {campoComplemento}
            {campoEstado}
            {campoCidade}
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
    </form>
  );

  const frameConfirma = (
    <Grid container className={styles.container} alignItems="center" spacing={2}>
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
            <Box className={styles.containerPreviaImagem}>
              {urlLogomarca && (<img src={urlLogomarca} className={styles.previaImagem} alt="Logomarca" />)}
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
            <Box className={styles.containerPreviaLocalizacao}>
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
      componente: formOficina
    },
    {
      label: "Endereço",
      componente: formEndereco
    },
    {
      label: "Confirmar",
      componente: frameConfirma
    }]


  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center">
        <Grid xs={12} item>
          <Stepper nonLinear color="primary" activeStep={passoAtivo} orientation="horizontal" >
            {passos.map((passo, index) => {
              return (
                <Step key={index}>
                  <StepButton onClick={() => handleStep(index)}>{passo.label}</StepButton>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
        {passos[passoAtivo].componente}
        <Grid container justify="space-between" spacing={2}>
          <Grid item>
            {botaoAnterior}
          </Grid>
          <Grid item>
            {botaoProximo}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
export default memo(CadastroOficina);