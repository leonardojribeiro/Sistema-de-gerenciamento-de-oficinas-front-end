import React from "react";

import Dropzone from "react-dropzone";

import { makeStyles, Box} from "@material-ui/core";
import './arrastar e soltar/style.css';

const useStyles = makeStyles({
  drag: {
    transition: "border 0.3s",
    border: "3px dashed var(--cor-borda)",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "156px",
  },
  dragActive: {
    transition: "all 0.3s",
    border: "3px solid #0f0",
    backgroundColor: "rgba(0, 255, 0, 0.1) ",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
    height: "156px",
  },
  dragReject: {
    transition: "all 0.3s",
    border: "3px dashed #f00",
    backgroundColor: "rgba(255, 0, 0, 0.1) ",
    borderRadius: "4px",
    cursor: "pointer",
    textAlign: "center",
    height: "156px",
  },
  mensagem: {
    backgroundColor: "var(--cor-transparente)",
    width:"192px",
    padding: "8px",
    borderRadius: "3px",
    position: "absolute",
    zIndex: 1
  },
  imagem: {
    maxHeight : "142px",
    maxWidth: "182px"
  },
  container: {
    height: "156px",
    minWidth: "100%",
  }
});


export default function ArrastarESoltar({ onChange, urlImagem}) {
  const classes = useStyles();

  const imagemContainer = (
    <Box p={1}>
      <img src={urlImagem} className={classes.imagem} alt="Logomarca"/>
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


  return (
    <Dropzone accept="image/*" multiple={false} onDropAccepted={onChange}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
        return (
          <div className={classes.container} {...getRootProps()}>
            <input {...getInputProps()} />
            {
              isDragReject ? dragReject : isDragActive ? dragActive : drag
            }
          </div>
        )
      }}
    </Dropzone>
  );
}