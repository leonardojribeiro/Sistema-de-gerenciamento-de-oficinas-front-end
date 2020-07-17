import React, { useEffect, useCallback, useState, useRef,  memo } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles, Box, Typography } from "@material-ui/core";
import useCampo from '../../../hooks/useCampo';

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
    [theme.breakpoints.up("xs")]: {
      minWidth: "256px"
    },
    width: "100%",
  },
}));


function DragAndDrop({ nome, ...props }) {
  const classes = useStyles();

  const [urlImagem, setUrlImagem] = useState("");
  const [valido, setValido] = useState(true);
  let inputRef = useRef({ current: {} });

  const onDrop = useCallback(async imagem => {
    if (imagem[0]) {
      inputRef.current.files = imagem;
      setUrlImagem(URL.createObjectURL(imagem[0]))
    }
    else {
      setUrlImagem("");
    }
  }, [setUrlImagem])

  const { getRootProps, getInputProps, isDragActive, isDragReject, } = useDropzone({ 
    onDrop, 
    accept: "image/jpeg, image/png, image/gif, image/jpg, image/pjpeg" ,
     multiple: false, 
  })

  const { registrarCampo, nomeCampo, valorPadrao } = useCampo(nome);

  const validar = useCallback(() => {
    if (props.required) {
      if (!(inputRef.current && inputRef.current.files)) {
        setValido(false)
        return false
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
    if(valorPadrao){
      onDrop(valorPadrao);
    }
  }, [inputRef, nomeCampo, onDrop, registrarCampo, validar, valorPadrao])

  const imagemContainer = (
    <Box p={1}>
      <img src={urlImagem} className={classes.imagem} alt="Logomarca" />
    </Box>
  );

  const drag = (
    <Box className={classes.drag} display="flex" alignItems="center" justifyContent="center">
      <div className={classes.mensagem}>
        <Typography>Clique ou arraste a logomarca aqui.</Typography>
      </div>
      <div>
        {urlImagem ? imagemContainer : ""}
      </div>
    </Box>
  );

  const dragActive = (
    <Box className={classes.dragActive} display="flex" alignItems="center" justifyContent="center">
      <Typography>Solte a logomarca!</Typography>
    </Box>
  );

  const dragReject = (
    <Box className={classes.dragReject} display="flex" alignItems="center" justifyContent="center">
      <Typography>Somente arquivos de imagem!</Typography>
    </Box>
  );

  const erro = (
    <Box className={classes.mensagemErro}>
      <Typography>A logomarca é obrigatória</Typography>
    </Box>
  );

  return (
    <div className={classes.container} {...getRootProps()}>
      <input {...getInputProps()}/>
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