import React, { createContext, useState, useEffect } from "react";
import { ThemeProvider, createMuiTheme, responsiveFontSizes, Paper, useMediaQuery } from "@material-ui/core";

interface ThemeContextValues {
  alterarTema: () => void,
  alterarTamanhoFonte: (novoTamanho: number) => void,
  temaEscuro: boolean,
  tamanhoFonte: number,
}

const TemaContexto = createContext<ThemeContextValues>({} as ThemeContextValues);

export const TemaProvider: React.FC = ({ children }) => {
  const prefersDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const [temaEscuro, setTemaEscuro] = useState<boolean>(prefersDarkTheme);
  const [tamanhoFonte, setTamanhoFonte] = useState<number>(13);

  useEffect(() => {
    const temaEscuro = localStorage.getItem("temaEscuro");
    if (!temaEscuro) {
      setTemaEscuro(prefersDarkTheme);
    }
  }, [prefersDarkTheme]);

  const alterarTema = () => {
    if (temaEscuro) {
      setTemaEscuro(false);
      localStorage.setItem("temaEscuro", JSON.stringify(false));
    }
    else {
      setTemaEscuro(true);
      localStorage.setItem("temaEscuro", JSON.stringify(true));
    }
  }

  function alterarTamanhoFonte(novoTamanho: number) {
    if (novoTamanho >= 10 && novoTamanho <= 30) {
      setTamanhoFonte(novoTamanho);
      localStorage.setItem("tamanhoFonte", JSON.stringify(novoTamanho));
    }
  }

  useEffect(() => {
    const temaEscuro = localStorage.getItem("temaEscuro");
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
      <ThemeProvider theme={responsiveFontSizes(tema)}>
        <Paper square>
          {children}
        </Paper>
      </ThemeProvider>
    </TemaContexto.Provider>
  )
}

export default TemaContexto;