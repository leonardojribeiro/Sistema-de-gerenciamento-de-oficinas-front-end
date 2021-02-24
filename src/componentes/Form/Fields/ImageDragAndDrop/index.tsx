import React, { useEffect, useCallback, useState, useRef, memo } from "react";
import { useDropzone } from "react-dropzone";
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import useField from '../../Hooks/useField';

interface DragAndDropProps {
  name: string,
  required: boolean
}

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
    backgroundColor: `${theme.palette.success.main}22`,
    color: theme.palette.success.main,
    cursor: "pointer",
    textAlign: "center",
    height: "256px",
  },
  dragReject: {
    transition: "all 0.3s",
    border: `1px solid ${theme.palette.error.main}`,
    backgroundColor: `${theme.palette.error.main}22`,
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

interface InputRef {
  files: Blob | undefined,
}

const ImageDragAndDrop: React.FC<DragAndDropProps> = ({ name, required, ...props }) => {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [valid, setValid] = useState(true);
  let inputRef = useRef<InputRef>({} as InputRef);

  const onDrop = useCallback(async image => {
    if (image[0]) {
      inputRef.current.files = image;
      setImgUrl(URL.createObjectURL(image[0]))
    }
    else {
      setImgUrl("");
    }
  }, [setImgUrl])

  const { getRootProps, getInputProps, isDragActive, isDragReject, } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/gif, image/jpg, image/pjpeg",
    multiple: false,
  })

  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (required) {
      if (!(inputRef.current && inputRef.current.files)) {
        setValid(false)
        return false
      }
    }
    setValid(true)
    return true
  }, [inputRef, required])

  const clear = useCallback(() => {
    inputRef.current.files = undefined;
    setValid(true);
    setImgUrl("");
  }, [])

  useEffect(() => {
    registerField({
      ref: inputRef.current,
      validate,
      name: fieldName,
      path: "files[0]",
      clear
    });
  }, [inputRef, clear, fieldName, validate, registerField])

  useEffect(() => {
    if (defaultValue) {
      onDrop(defaultValue);
    }
  }, [onDrop, defaultValue])

  const imagemContainer = (
    <Box p={1}>
      <img src={imgUrl} className={classes.imagem} alt="Logomarca" />
    </Box>
  );

  const drag = (
    <Box className={classes.drag} display="flex" alignItems="center" justifyContent="center">
      <div className={classes.mensagem}>
        <Typography>Clique ou arraste a logomarca aqui.</Typography>
      </div>
      <div>
        {imgUrl ? imagemContainer : ""}
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
      <input {...getInputProps()} />
      {
        isDragReject ? dragReject : isDragActive ? dragActive : drag
      }
      {
        !valid && erro
      }
    </div>
  );
}

export default memo(ImageDragAndDrop);