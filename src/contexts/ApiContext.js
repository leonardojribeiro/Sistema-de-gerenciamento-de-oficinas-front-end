import React, { createContext, useCallback, useState } from "react";
import api from "../servicos/api";
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ProgressoIndefinidoCircular from "../componentes/ProgressoIndefinidoCircular";
import dot from "dot-object";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const [snackBarAberta, setSnackbarAberta] = useState(false);
  const [mensagemSnackbar, setMensagemSnackbar] = useState("");
  const [progressoIndefinidoAberto, setProgressoIndefinidoAtivo] = useState(false);
  const [progresso, setProgresso] = useState(-1);
  const [tipoAlerta, setTipoAlerta] = useState("info");

  function handleProgresso(e) {
    const progresso = (e.loaded * 100 / e.total);
    setProgresso(progresso === 100 ? 0 : progresso);
  }

  const get = useCallback(async (dados) => {
    const resposta = await api.get()

  }, []);

  const post = useCallback(async (url, dados) => {
    console.log(process.env.REACT_APP_API_URL);
    setProgressoIndefinidoAtivo(true);
    let resposta = null;
    try {
      resposta = await api
        .post(
          `${process.env.REACT_APP_API_URL}${url}`,
          dados,
          {
            onUploadProgress: handleProgresso
          }
        );
    }
    catch (e) {
      setTipoAlerta("error")
      if (e.response && e.response.request && e.response.request.response) {
        const { mensagem } = JSON.parse(e.response.request.response);
        setMensagemSnackbar(
          Array.isArray(mensagem)
            ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
            : mensagem
        )
      }
      else {
        setMensagemSnackbar(e.message === "Network Error" ? "Erro ao se conectar com o servidor." : e.message);
      }
      setSnackbarAberta(true);
    }
    setProgressoIndefinidoAtivo(false);

    if (resposta) {
      if (resposta.status === 201) {
        if (resposta.data.mensagem) {
          setTipoAlerta("success")
          setMensagemSnackbar(resposta.data.mensagem);
          setSnackbarAberta(true);
        }
      }
      if (resposta.data) {
        return resposta.data
      }
    }

    return null;
  }, []);

  const multipartPost = useCallback((url, dados) => {
    const formDados = new FormData();
    for (let key in dados) {
      if (dot.pick(key, dados) instanceof File) {
        formDados.append(key, dot.pick(key, dados), dot.pick(key, dados).name)
      }
      else {
        formDados.append(key, dot.pick(key, dados));
      }
    }
    return post(url, formDados);
  }, [post]);

  function handleCloseSnackBar() {
    setSnackbarAberta(false);
  }

  return (
    <ApiContext.Provider
      value={{
        get,
        post,
        multipartPost
      }}
    >
      {children}
      <Snackbar open={snackBarAberta} autoHideDuration={5000} onClose={handleCloseSnackBar}>
        <Alert severity={tipoAlerta} onClose={handleCloseSnackBar} closeText="Fechar">
          <Typography>{mensagemSnackbar}</Typography>
        </Alert>
      </Snackbar>
      <ProgressoIndefinidoCircular open={progressoIndefinidoAberto} value={progresso} />
    </ApiContext.Provider>
  )
}

export default ApiContext;