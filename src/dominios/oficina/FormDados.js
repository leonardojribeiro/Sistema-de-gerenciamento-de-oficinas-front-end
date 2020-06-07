import React, { useState, memo, useCallback, useMemo, useRef } from 'react';
import { Box, Grid, Hidden, makeStyles, Button } from '@material-ui/core';
import CampoTexto from '../../componentes/CampoTexto';
import DragAndDrop from '../../componentes/DragAndDrop';
//import Button from "../../componentes/Button";
import SeletorImagem from '../../componentes/SeletorImagem';
import MascaraNumererica from '../../recursos/MascaraNumerica';
import validacao from '../../recursos/Validacao';

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
});

function FormDados({ onSubmit, ...props }) {
  //estados que irão cotrolar os campos de texto
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [telefoneCelular, setTelefoneCelular] = useState("");
  const [email, setEmail] = useState("");
  const [webSite, setWebsite] = useState("");
  const [logomarca, setLogomarca] = useState("");
  const [urlLogomarca, setUrlLogomarca] = useState("");

  //referências dos campos de textos
  const refNomeFantasia = useRef();
  const refRazaoSocial = useRef();
  const refCpfCnpj = useRef();
  const refTelefoneFixo = useRef();
  const refTelefoneCelular = useRef();
  const refEmail = useRef();
  //const refWebSite = useRef();

  const [nomeFantasiaValido, setNomeFantasiaValido] = useState(true);
  const [cpfCnpjValido, setCpfCnpjValido] = useState(true);
  const [razaoSocialValido, setRazaoSocialValido] = useState(true);
  const [telefoneCelularValido, setTelefoneCelularValido] = useState(true);
  const [telefoneFixoValido, setTelefoneFixoValido] = useState(true);

  const classes = useStyles();

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

  function validarDados() {
    return validarNomeFantasia()
      && validarCpfCnpj()
      && validarRazaoSocial()
      && validarTelefoneFixo()
      && validarTelefoneCelular();
  }


  function handleSubmit() {
    if (validarDados()) {
      onSubmit({
        nomeFantasia,
        cpfCnpj,
        razaoSocial,
        telefoneFixo,
        telefoneCelular,
        email,
        webSite,
        logomarca,
        urlLogomarca
      });
    }
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  }


  const campoNomeFantasia = useMemo(() => {
    function handleChange(e){
      setNomeFantasia(e.target.value);
      if (!nomeFantasiaValido) {
        validarNomeFantasia(e.target.value);
      }
    }
    return (
      <Grid xs={12} item>
        <CampoTexto
          inputRef={refNomeFantasia}
          required
          fullWidth
          label="Nome Fantasia / Nome"
          onChange={handleChange}
          value={nomeFantasia}
          error={!nomeFantasiaValido}
          helperText={
            nomeFantasiaValido
              ? ""
              : nomeFantasia.length ? "O nome deve ter pelo menos 3 caracteres."
                : "O Nome fantasia é obrigatório."
          }
        />
      </Grid>
    )
  },
    [nomeFantasia, nomeFantasiaValido, validarNomeFantasia]
  );


  const campoCpfCnpj = useMemo(() => {
    function handleChange(e){
      setCpfCnpj(
        MascaraNumererica(
          e.target.value,
          tamanho =>
            tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
              ? "000.000.000-00"
              : "00.000.000/0000-00"
        )
      );
      if (!cpfCnpjValido) {
        validarCpfCnpj(e.target.value);
      }
    }

    return (
      <Grid xs={12} md={4} item>
        <CampoTexto
          inputRef={refCpfCnpj}
          type="cpf"
          required
          fullWidth
          label="CPF/CNPJ"
          onChange={handleChange}
          value={cpfCnpj}
          error={!cpfCnpjValido}
          helperText={
            cpfCnpjValido
              ? ""
              : cpfCnpj.length
                ? "CPF/CNPJ inválido."
                : "O CPF/CNPJ é obrigatório."
          }
        />
      </Grid>
    )
  },
    [refCpfCnpj, cpfCnpj, cpfCnpjValido, validarCpfCnpj]
  );

  const campoRazaoSocial = useMemo(() => {
    function handleChange(e){
      setRazaoSocial(e.target.value);
      if (!razaoSocialValido) {
        validarRazaoSocial(e.target.value);
      }
    }
    return (
      <Grid xs={12} md={8} item>
        <CampoTexto
          inputRef={refRazaoSocial}
          required={cpfCnpj.length === 18}
          fullWidth
          label="Razão Social"
          onChange={handleChange}
          value={razaoSocial}
          error={!razaoSocialValido}
          helperText={razaoSocialValido ? "" : "A razão social deve ter pelo menos 1 caractere."}
        />
      </Grid>
    )
  },
    [cpfCnpj, razaoSocial, razaoSocialValido, validarRazaoSocial]
  );

  const campoTelefoneFixo = useMemo(() => {
    function handleChange(e){
      setTelefoneFixo(
        MascaraNumererica(
          e.target.value,
          tamanho =>
            tamanho < 11
              ? "(00) 0000-0000"
              : "(00) 00000-0000"
        )
      );
      if (!telefoneFixoValido) {
        validarTelefoneFixo(e.target.value);
      }

    }
    return (
      <Grid xs={12} sm={6} item>
        <CampoTexto
          inputRef={refTelefoneFixo}
          type="tel"
          fullWidth
          label="Telefone Fixo"
          onChange={handleChange}
          value={telefoneFixo}
          error={!telefoneFixoValido}
          helperText={telefoneFixoValido ? "" : "Número de telefone fixo inválido."}
        />
      </Grid>
    )
  },
    [telefoneFixo, telefoneFixoValido, validarTelefoneFixo]
  );

  const campoTelefoneCelular = useMemo(() => {
    function handleChange(e){
      setTelefoneCelular(
        MascaraNumererica(
          e.target.value,
          tamanho =>
            tamanho < 11
              ? "(00) 0000-0000"
              : "(00) 00000-0000"

        )
      );
      if (!telefoneCelularValido) {
        validarTelefoneCelular(e.target.value);
      }
    }
    return (
      <Grid xs={12} sm={6} item>
        <CampoTexto
          type="tel"
          inputRef={refTelefoneCelular}
          required
          fullWidth
          label="Telefone Celular"
          onChange={handleChange}
          value={telefoneCelular}
          error={!telefoneCelularValido}
          helperText={
            telefoneCelularValido
              ? ""
              : telefoneCelular.length
                ? "Número de telefone celular inválido."
                : "O número de telefone celular é obrigatório."
          }
        />
      </Grid>
    )
  },
    [telefoneCelular, telefoneCelularValido, validarTelefoneCelular]
  );

  const campoEmail = useMemo(() =>
    <Grid xs={12} md={4} item>
      <CampoTexto
        inputRef={refEmail}
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

  const botaoProximo = (
    <Box px={2}>
      <Button onClick={handleSubmit} variant="outlined">
        Próximo
      </Button>
    </Box>
  );


  const formOficina = (
    <form method="post" action="" onKeyDown={handleKeyDown}>
      <Grid container className={classes.container} alignItems="center">
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
      <Grid container justify="space-between" spacing={2}>

        <Grid item>
          <Button variant="outlined">
            Voltar
              </Button>
        </Grid>
        <Grid item>
          {botaoProximo}
        </Grid>
      </Grid>
    </form>
  );

  return formOficina;
};
export default memo(FormDados);