import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import ApiContext from './ApiContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { post } = useContext(ApiContext);
  const [usuario, setUsuario] = useState(null);

  const efetuarLoginPorToken = useCallback(async (token) => {
    const resposta = await post(
      "/usuario/loginPorToken",
      {
        token
      }
    )
    if (resposta) {
      setUsuario(resposta);
    }
  },[post]);


  useEffect(() => {
    const token = localStorage.getItem("tokenUsuario");
    if (token) {
      efetuarLoginPorToken(token);
    }
  }, [efetuarLoginPorToken]);

  async function efetuarLogin({ nomeUsuario, senha }) {
    const resposta = await post(
      "/usuario/login",
      {
        nomeUsuario,
        senha
      }
    );

    if (resposta) {
      setUsuario(resposta);
      localStorage.setItem("tokenUsuario", resposta.token);
    }
  }

  function deslogar() {
    localStorage.removeItem("tokenUsuario");
    setUsuario(null);
  }


  return (
    <AuthContext.Provider value={{ deslogar, usuario, efetuarLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;