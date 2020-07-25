import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme, Dialog } from "@material-ui/core";


const TemaContexto = createContext();

export const TemaProvider = ({ children }) => {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [tamanhoFonte, setTamanhoFonte] = useState(16);


  const alterarTema = () => {
    console.log("alterando tema")
    if (temaEscuro) {
      setTemaEscuro(false);
      localStorage.setItem("temaEscuro", false);
    }
    else {
      setTemaEscuro(true);
      localStorage.setItem("temaEscuro", true);
    }
  }

  console.log(temaEscuro)

  function alterarTamanhoFonte(novoTamanho) {
    if (novoTamanho >= 10 && novoTamanho <= 30) {
      setTamanhoFonte(novoTamanho);
      localStorage.setItem("tamanhoFonte", novoTamanho);
    }
  }

  useEffect(() => {
    const temaEscuro = localStorage.getItem("temaEscuro");
    console.log(temaEscuro)
    if (temaEscuro) {
      setTemaEscuro(JSON.parse(temaEscuro));
    }
    const tamanhoFonte = localStorage.getItem("tamanhoFonte");
    if (tamanhoFonte) {
      setTamanhoFonte(Number(tamanhoFonte));
    }
  }, []);

  const tema = createMuiTheme({
    palette: {
      type: temaEscuro ? "dark" : "light",
    },
    typography: {
      allVariants: {
        fontSize: tamanhoFonte
      }
    },
    
  });

  return (
    <TemaContexto.Provider value={{ alterarTema, alterarTamanhoFonte, temaEscuro, tamanhoFonte }}>
      <ThemeProvider theme={tema}>
        <Dialog disablePortal fullScreen fullWidth open>
          {children}
        </Dialog>
      </ThemeProvider>
    </TemaContexto.Provider>
  )
}

export default TemaContexto;