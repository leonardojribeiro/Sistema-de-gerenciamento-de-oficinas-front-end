import React, { createContext, useCallback, useState } from "react";
import api from "../servicos/api";
import { Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ProgressoCircular from "../componentes/ProgressoCircular";
import dot from "dot-object";

export default function ApiProvider() {

  function handleProgresso(e) {
    return (e.loaded * 100 / e.total);
  }

  function handleErro(erro) {

    if (erro.response && erro.response.data) {
      const mensagem = (erro.response.data.mensagem);
      return Array.isArray(mensagem)
        ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
        : mensagem
    }
    else if (erro.response && erro.response.request && erro.response.request.response && erro.response.request.response.mensagem) {
      const { mensagem } = JSON.parse(erro.response.request.response);
      return Array.isArray(mensagem)
        ? mensagem.map((mensagem, index) => <p key={index}>{mensagem}</p>)
        : mensagem
    }
    else {
      return erro.message === "Network Error" ? "Erro ao se conectar com o servidor." : erro.message;
    }
  }

  function handleResposta(resposta) {
    if (resposta) {
      if (resposta.status === 201) {
        // if (resposta.data.mensagem) {
        //   setTipoAlerta("success")
        //   setMensagemSnackbar(resposta.data.mensagem);
        //   setSnackbarAberta(true);
        // }
      }
      if (resposta.data) {
        return resposta.data
      }
    }
    return null;
  }

  const get = useCallback(async (url, erro = null) => {
    let resposta = null;
    try {
      resposta = await api.get(url);
    }
    catch (e) {
      erro && erro(handleErro(e));
    }
    return handleResposta(resposta);
  }, []);

  const getComApiUrl = useCallback(async (url, erro=null) => {
    return get(`${process.env.REACT_APP_API_URL}${url}`, erro);
  }, [get]);

  const getTipoBlob = useCallback(async (url, erro) => {
    let resposta = null;
    try {
      resposta = await api.get(url, {
        responseType: "blob"
      });
    }
    catch (e) {
      erro && erro(handleErro(e));
    }
    return handleResposta(resposta);
  }, []);


  const post = useCallback(async (url, dados) => {
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
    return handleResposta(resposta)
  }, []);

  const put = useCallback(async (url, dados, emProgresso, emErro=null) => {
    
    let resposta = null;
    try {
      resposta = await api
        .put(
          `${process.env.REACT_APP_API_URL}${url}`,
          dados,
          {
            onUploadProgress: emProgresso && emProgresso(handleProgresso)
          }
        );
    }
    catch (e) {
      emErro && emErro(handleErro(e));
    }
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

  const multipartPut = useCallback((url, dados, emProgresso, emErro=null) => {
    const formDados = prepararDados(dados);
    return put(url, formDados, emProgresso, emErro);
  }, [prepararDados, put]);

  return {
    get,
    getComApiUrl,
    getTipoBlob,
    post,
    multipartPost,
    multipartPut,
  }
}
