import React, { createContext, useCallback } from "react";
import api from "../../servicos/api";
import ProgressoCircular, { ProgressoCircularHandles } from "../../componentes/ProgressoCircular";
import dot from "dot-object";
import Alerta, { AlertaHandles } from "../../componentes/Alerta";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth";

interface ApiContextValues {
  get: (url: string, desablitarProgresso?: boolean) => Promise<object>,
  getTipoBlob: (url: string) => Promise<object>,
  post: (url: string, dados: object) => Promise<object>,
  put: (url: string, dados: object) => Promise<object>,
  multipartPost: (url: string, dados: object) => Promise<object>,
  multipartPut: (url: string, dados: object) => Promise<object>
}

const ApiContext = createContext<ApiContextValues>({} as ApiContextValues);

export const ApiProvider: React.FC = ({ children }) => {
  const refAlerta = useRef<AlertaHandles | undefined>(undefined);
  const refProgresso = useRef<ProgressoCircularHandles | undefined>(undefined);
  const { token } = useAuth();
  const headers = {
    authorization: token,
  }

  function handleProgresso(e: any) {
    const progresso = (e.loaded * 100 / e.total);
    if (refProgresso && refProgresso.current) {
      refProgresso.current.setValor(progresso === 100 ? 0 : progresso);
    }
  }

  function handleErro(erro: any) {
    if (refAlerta && refAlerta.current) {
      refAlerta.current.setTipo("error")
      if (erro.response && erro.response.data) {
        const mensagem = (erro.response.data.mensagem);
        refAlerta.current.setMensagem(
          Array.isArray(mensagem)
            ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
            : mensagem
        )
      }
      else if (erro.response && erro.response.request && erro.response.request.response && erro.response.request.response.mensagem) {
        const { mensagem } = JSON.parse(erro.response.request.response);
        refAlerta.current.setMensagem(
          Array.isArray(mensagem)
            ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
            : mensagem
        )
      }
      else {
        refAlerta.current.setMensagem(erro.message === "Network Error" ? "Erro ao se conectar com o servidor." : erro.message);
      }
      refAlerta.current.setAberto(true);
    }
  }

  const handleResposta = useCallback((resposta) => {
    if (resposta) {
      if (resposta.status === 201 || resposta.status === 200) {
        if (resposta.data.mensagem) {
          if (refAlerta && refAlerta.current) {
            refAlerta.current.setTipo("success")
            refAlerta.current.setMensagem(resposta.data.mensagem);
            refAlerta.current.setAberto(true);
          }
        }
      }
      if (resposta.data) {
        return resposta.data
      }
    }
    return null;
  }, []);

  const get = useCallback(async (url: string, desablitarProgresso?: boolean) => {
    !desablitarProgresso && refProgresso && refProgresso.current && refProgresso.current.setAberto(true);
    let resposta = null;
    try {
      resposta = await api.get(url, { headers });
    }
    catch (e) {
      handleErro(e)
    }
    !desablitarProgresso && refProgresso && refProgresso.current && refProgresso.current.setAberto(false);
    return handleResposta(resposta);
  }, [handleResposta, headers]);

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
  }, [handleResposta]);

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
            headers,
          }
        );
    }
    catch (e) {
      handleErro(e)
    }
    refProgresso && refProgresso.current && refProgresso.current.setAberto(false);
    return handleResposta(resposta)
  }, [handleResposta, headers]);

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
            headers,
          }
        );
    }
    catch (e) {
      handleErro(e)
    }
    refProgresso && refProgresso.current && refProgresso.current.setAberto(false);
    return handleResposta(resposta)
  }, [handleResposta, headers]);

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
      <Alerta ref={refAlerta} />
    </>
  )
}

export default ApiContext;