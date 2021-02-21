import React, { createContext, useCallback, useState } from "react";
import api from "../../services/api";
import ProgressoCircular, { ProgressoCircularHandles } from "../../componentes/ProgressoCircular";
import dot from "dot-object";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { AxiosError, AxiosRequestConfig } from "axios";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

interface ApiContextValues {
  get: (url: string, desablitarProgresso?: boolean, config?: AxiosRequestConfig) => Promise<object>,
  getTipoBlob: (url: string) => Promise<object>,
  post: (url: string, dados: object) => Promise<object>,
  put: (url: string, dados: object) => Promise<object>,
  multipartPost: (url: string, dados: object) => Promise<object>,
  multipartPut: (url: string, dados: object) => Promise<object>
}

interface AlertValues {
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: JSX.Element | string;
}

const ApiContext = createContext<ApiContextValues>({} as ApiContextValues);

export const ApiProvider: React.FC = ({ children }) => {
  const refProgresso = useRef<ProgressoCircularHandles | undefined>(undefined);
  const { token, verificarTempoRestante, logout } = useAuth();
  const [alert, setAlert] = useState<AlertValues | null>(null)

  const headers = useCallback(() => {
    verificarTempoRestante();
    return { authorization: token };
  }, [token, verificarTempoRestante]);

  const handleProgresso = useCallback((e: any) => {
    const progresso = (e.loaded * 100 / e.total);
    if (refProgresso && refProgresso.current) {
      refProgresso.current.setValor(progresso === 100 ? 0 : progresso);
    }
  }, []);


  const handleErro = useCallback((erro: AxiosError) => {
    if (erro && erro.response && erro.response.status === 401) {
      logout();
    }
    if (erro.response && erro.response.data) {
      const mensagem = erro.response.data.mensagem;
      setAlert({
        message: Array.isArray(mensagem)
          ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
          : mensagem,
        severity: "error",
      });
    }
    else if (erro.response && erro.response.request && erro.response.request.response && erro.response.request.response.mensagem) {
      const { mensagem } = JSON.parse(erro.response.request.response);
      setAlert({
        message: Array.isArray(mensagem)
          ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
          : mensagem,
        severity: "error",
      });
    }
    else {
      setAlert({
        message: erro.message === "Network Error" ? "Erro ao se conectar com o servidor." : erro.message,
        severity: "error",
      });
    }
  }, [logout]);

  const handleResposta = useCallback((resposta) => {
    if (resposta) {
      if (resposta.status === 201 || resposta.status === 200) {
        if (resposta.data.mensagem) {
          setAlert({
            message: resposta.data.mensagem,
            severity: 'success',
          });
        }
      }
      if (resposta.data) {
        return resposta.data
      }
    }
    return null;
  }, []);

  const get = useCallback(async (url: string, desablitarProgresso?: boolean, config?: AxiosRequestConfig) => {
    !desablitarProgresso && refProgresso && refProgresso.current && refProgresso.current.setAberto(true);
    let resposta = null;
    try {
      if (config) {
        resposta = await api.get(url, config);
      }
      else {
        resposta = await api.get(url, { headers: headers() });
      }
    }
    catch (e) {
      handleErro(e)
    }
    !desablitarProgresso && refProgresso && refProgresso.current && refProgresso.current.setAberto(false);
    return handleResposta(resposta);
  }, [handleErro, handleResposta, headers]);

  const getTipoBlob = useCallback(async (url) => {
    refProgresso && refProgresso.current && refProgresso.current.setAberto(true);
    let resposta = null;
    try {
      resposta = await api.get(url, {
        responseType: "blob",
      });
    }
    catch (e) {
      handleErro(e)
    }
    refProgresso && refProgresso.current && refProgresso.current.setAberto(false);
    return handleResposta(resposta) as Blob;
  }, [handleErro, handleResposta]);

  const post = useCallback(async (url: string, dados: object) => {
    refProgresso && refProgresso.current && refProgresso.current.setAberto(true);
    let resposta = null;
    try {
      resposta = await api
        .post(
          url,
          dados,
          {
            onUploadProgress: handleProgresso,
            headers: headers(),
          }
        );
    }
    catch (e) {
      handleErro(e)
    }
    refProgresso && refProgresso.current && refProgresso.current.setAberto(false);
    return handleResposta(resposta)
  }, [handleErro, handleProgresso, handleResposta, headers]);

  const put = useCallback(async (url: string, dados: object) => {
    refProgresso && refProgresso.current && refProgresso.current.setAberto(true);
    let resposta = null;
    try {
      resposta = await api
        .put(
          url,
          dados,
          {
            onUploadProgress: handleProgresso,
            headers: headers(),
          }
        );
    }
    catch (e) {
      handleErro(e)
    }
    refProgresso && refProgresso.current && refProgresso.current.setAberto(false);
    return handleResposta(resposta)
  }, [handleErro, handleProgresso, handleResposta, headers]);

  const prepararDados = useCallback((dados: object) => {
    const formDados = new FormData();
    for (let key in dados) {
      if (dot.pick(key, dados) instanceof File) {
        formDados.append(key, dot.pick(key, dados), dot.pick(key, dados).name)
      }
      else {
        formDados.append(key, dot.pick(key, dados));
      }
    }
    return formDados;
  }, []);

  const multipartPost = useCallback((url: string, dados: object) => {
    const formDados = prepararDados(dados);
    return post(url, formDados);
  }, [post, prepararDados]);

  const multipartPut = useCallback((url: string, dados: object) => {
    const formDados = prepararDados(dados);
    return put(url, formDados);
  }, [prepararDados, put]);

  const handleClose = useCallback(() => {
    setAlert(null);
  }, [])

  return (
    <>
      <ApiContext.Provider
        value={{
          get,
          getTipoBlob,
          post,
          put,
          multipartPost,
          multipartPut,
        }}
      >
        {children}
      </ApiContext.Provider>
      <ProgressoCircular ref={refProgresso} />
      <Snackbar open={alert !== null} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={alert?.severity} onClose={handleClose} closeText="Fechar">
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ApiContext;