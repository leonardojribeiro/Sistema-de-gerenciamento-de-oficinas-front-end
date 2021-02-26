import React, { createContext, useCallback, useMemo, useRef, useState } from "react";
import api from "../../services/api";
import dot from "dot-object";
import useAuth from "../../hooks/useAuth";
import { AxiosError, AxiosRequestConfig } from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "../../componentes/CircularProgress";

interface ApiContextValues {
  get: (url: string, options?: Options, axiosRequestConfig?: AxiosRequestConfig) => Promise<object>,
  getTipoBlob: (url: string) => Promise<object>,
  post: (url: string, dados: object) => Promise<object>,
  put: (url: string, dados: object) => Promise<object>,
  multipartPost: (url: string, dados: object) => Promise<object>,
  multipartPut: (url: string, dados: object) => Promise<object>
  inProgress: boolean;
}

interface AlertValues {
  severity: "success" | "info" | "warning" | "error" | undefined;
  message: JSX.Element | string;
}

export interface Options {
  disableCircularProgress?: boolean;
  disableAllProgress?: boolean;
}

const ApiContext = createContext<ApiContextValues>({} as ApiContextValues);

export const ApiProvider: React.FC = ({ children }) => {
  const { token, verificarTempoRestante, logout } = useAuth();
  const [alert, setAlert] = useState<AlertValues | null>(null)
  const [progress, setProgress] = useState<boolean>(false);
  const useCircularProgress = useRef<boolean>(true);

  const headers = useCallback(() => {
    verificarTempoRestante();
    return { authorization: token };
  }, [token, verificarTempoRestante]);

  const handleProgresso = useCallback((e: any) => {
    const progresso = (e.loaded * 100 / e.total);
    //setProgress(progresso);
    console.log(progresso)
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

  const get = useCallback(async (url: string, options?: Options, axiosRequestConfig?: AxiosRequestConfig) => {
    if (options !== undefined) {
      if(options.disableCircularProgress){
        useCircularProgress.current = false;
      }
      if(!options.disableAllProgress){
        setProgress(true);
      }
    }
    else{
      setProgress(true);
    }
    let resposta = null;
    try {
      if (axiosRequestConfig) {
        resposta = await api.get(url, axiosRequestConfig);
      }
      else {
        resposta = await api.get(url, { headers: headers() });
      }
    }
    catch (e) {
      handleErro(e)
    }
    if (options !== undefined) {
      if(options.disableCircularProgress){
        useCircularProgress.current = true;
      }
      if(!options.disableAllProgress){
        setProgress(false);
      }
    }
    else{
      setProgress(false);
    }
    return handleResposta(resposta);
  }, [handleErro, handleResposta, headers]);

  const getTipoBlob = useCallback(async (url) => {
    setProgress(true);
    let resposta = null;
    try {
      resposta = await api.get(url, {
        responseType: "blob",
      });
    }
    catch (e) {
      handleErro(e)
    }
    setProgress(false)
    return handleResposta(resposta) as Blob;
  }, [handleErro, handleResposta]);

  const post = useCallback(async (url: string, dados: object) => {
    setProgress(true)
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
    setProgress(false);
    return handleResposta(resposta)
  }, [handleErro, handleProgresso, handleResposta, headers]);

  const put = useCallback(async (url: string, dados: object) => {
    setProgress(true)
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
    setProgress(false)
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

  const content = useMemo(() => (
    <ApiContext.Provider
      value={{
        get,
        getTipoBlob,
        post,
        put,
        multipartPost,
        multipartPut,
        inProgress: !useCircularProgress.current && progress,
      }}
    >
      {children}
    </ApiContext.Provider>
  ), [children, get, getTipoBlob, multipartPost, multipartPut, post, progress, put]);

  return (
    <>
      {content}
      <CircularProgress open={progress && useCircularProgress.current} />
      <Snackbar open={alert !== null} autoHideDuration={5000} onClose={handleClose}>
        <Alert severity={alert?.severity} onClose={handleClose} closeText="Fechar">
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ApiContext;