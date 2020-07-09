import React, { useEffect, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

import { makeStyles, Box } from "@material-ui/core";
import './arrastar e soltar/style.css';
import { memo } from "react";
import useCampo from "./Formulario/useCampo";

const useStyles = makeStyles((theme) => ({
  drag: {
    transition: "border 0.3s",
    border: "1px dashed",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "256px",
    '&:hover': {
      border: "1px solid",
    }
  },
  dragActive: {
    transition: "all 0.3s",
    border: `1px solid ${theme.palette.success.main}`,
    backgroundColor: "theme.palette.",
    color: theme.palette.success.main,
    cursor: "pointer",
    textAlign: "center",
    height: "256px",
  },
  dragReject: {
    transition: "all 0.3s",
    border: `1px solid ${theme.palette.error.main}`,
    backgroundColor: "rgba(255, 0, 0, 0.1) ",
    cursor: "pointer",
    textAlign: "center",
    height: "256px",
    color: theme.palette.error.main,
  },
  mensagem: {
    backgroundColor: "rgba(255, 255, 255, 0.1) ",
    width: "192px",
    padding: "8px",
    borderRadius: "3px",
    position: "absolute",
    zIndex: 1
  },
  mensagemErro: {
    backgroundColor: "rgba(255, 255, 255, 0.1) ",
    color: theme.palette.error.main,
    width: "192px",
    padding: "8px",
    borderRadius: "3px",
    position: "absolute",
    zIndex: 1,
    bottom: 0
  },
  imagem: {
    maxHeight: "240px",
    maxWidth: "calc( 100%  - (24px))"
  },
  container: {
    position: "relative",
    height: "256px",
    minWidth: "256px",
    width: "100%",
    maxWidth: "512px"
  },
}));


function DragAndDrop({ nome, ...props }) {
  const classes = useStyles();

  const [urlImagem, setUrlImagem] = useState(null);
  const [valido, setValido] = useState(true);

  const onDrop = useCallback(async imagem => {
    const reader = new FileReader();
    if (imagem[0]) {
      reader.readAsDataURL(imagem[0]);
      reader.onloadend = () => {
        setUrlImagem(reader.result)
      }
    }
    else {
      setUrlImagem("");
    }
  }, [])



  const { getRootProps, getInputProps, isDragActive, isDragReject, inputRef  } = useDropzone({ onDrop, accept: "image/*" })

  const { registrarCampo, valorPadrao, nomeCampo } = useCampo(nome);

  const validar = useCallback(() => {
    if (props.required) {
      if (inputRef.current) {
        if (!inputRef.current.files[0]) {
          setValido(false)
          return false
        }
      }
    }
    setValido(true)
    return true
  }, [inputRef, props.required])

  useEffect(() => {
    registrarCampo({
      ref: inputRef.current,
      validar,
      nome: nomeCampo,
      caminho: "files[0]"
    });
    inputRef.current.defaultValue = valorPadrao;
  }, [inputRef, nomeCampo, registrarCampo, validar, valorPadrao])

  const imagemContainer = (
    <Box p={1}>
      <img src={urlImagem} className={classes.imagem} alt="Logomarca" />
    </Box>
  );

  const drag = (
    <Box className={classes.drag} display="flex" alignItems="center" justifyContent="center">
      <div className={classes.mensagem}>
        Clique ou arraste uma logomarca aqui.
      </div>
      <div>
        {urlImagem ? imagemContainer : ""}
      </div>
    </Box>
  );

  const dragActive = (
    <Box className={classes.dragActive} display="flex" alignItems="center" justifyContent="center">
      Solte a logomarca!
    </Box>
  );

  const dragReject = (
    <Box className={classes.dragReject} display="flex" alignItems="center" justifyContent="center">
      Somente arquivos de imagem!
    </Box>
  );

  const erro = (
    <Box className={classes.mensagemErro}>
      <span>A logomarca é obrigatória</span>
    </Box>
  );

  return (
    <div className={classes.container} {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragReject ? dragReject : isDragActive ? dragActive : drag
      }
      {
        !valido && erro
      }
    </div>
  );
}

export default memo(DragAndDrop);