import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";


const TemaContexto = createContext();

export const TemaProvider = ({ children }) => {
  const [temaEscuro, setTemaEscuro] = useState(false);

  const alterarTema = () => {
    if (temaEscuro) {
      setTemaEscuro(false);
      localStorage.setItem("temaEscuro", false);
    }
    else {
      setTemaEscuro(true);
      localStorage.setItem("temaEscuro", true);
    }
  }

  useEffect(() => {
    const temaEscuro = localStorage.getItem("temaEscuro");
    if (temaEscuro) {
      setTemaEscuro(temaEscuro);
    }
  }, []);

  const tema = createMuiTheme({
    palette: {
      type: temaEscuro ? "dark" : "light",
    },
  });
  
  return (
    <TemaContexto.Provider value={alterarTema}>
      <ThemeProvider theme={tema}>
        {children}
      </ThemeProvider>
    </TemaContexto.Provider>
  )
}

export default TemaContexto;