import React, { createContext, useCallback } from "react";
import api from "../servicos/api";
import ProgressoCircular from "../componentes/ProgressoCircular";
import dot from "dot-object";
import Alerta from "../componentes/Alerta";
import { useRef } from "react";

const ApiContext = createContext();

export function ApiProvider({ children }) {
  const refAlerta = useRef();
  const refProgresso = useRef();

  function handleProgresso(e) {
    const progresso = (e.loaded * 100 / e.total);
    refProgresso.current.setValor(progresso === 100 ? 0 : progresso);
  }

  function handleErro(erro) {
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

  function handleResposta(resposta) {
    if (resposta) {
      if (resposta.status === 201 || resposta.status === 200) {
        if (resposta.data.mensagem) {
          refAlerta.current.setTipo("success")
          refAlerta.current.setMensagem(resposta.data.mensagem);
          refAlerta.current.setAberto(true);
        }
      }
      if (resposta.data) {
        return resposta.data
      }
    }
    return null;
  }

  const get = useCallback(async (url) => {
    let resposta = null;
    try {
      resposta = await api.get(url, );
    }
    catch (e) {
      handleErro(e)
    }
    return handleResposta(resposta);
  }, []);

  const getTipoBlob = useCallback(async (url) => {
    let resposta = null;
    try {
      resposta = await api.get(url, {
        responseType: "blob",
      });
    }
    catch (e) {
      handleErro(e)
    }
    return handleResposta(resposta);
  }, []);

  const post = useCallback(async (url, dados) => {
    refProgresso.current.setAberto(true);
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
      handleErro(e)
    }
    refProgresso.current.setAberto(false);
    return handleResposta(resposta)
  }, []);

  const put = useCallback(async (url, dados) => {
    refProgresso.current.setAberto(true);
    let resposta = null;
    try {
      resposta = await api
        .put(
          url,
          dados,
          {
            onUploadProgress: handleProgresso
          }
        );
    }
    catch (e) {
      handleErro(e)
    }
    refProgresso.current.setAberto(false);
    return handleResposta(resposta)
  }, []);

  const prepararDados = useCallback((dados) => {
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

  const multipartPost = useCallback((url, dados) => {
    const formDados = prepararDados(dados);
    return post(url, formDados);
  }, [post, prepararDados]);

  const multipartPut = useCallback((url, dados) => {
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