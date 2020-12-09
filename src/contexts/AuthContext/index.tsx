import React, { createContext, useState, useCallback, SetStateAction, useContext } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import useAuth from '../../hooks/useAuth';
import Usuario from '../../Types/Usuario';
import ApiContext, { ApiProvider } from '../ApiContext';

interface AuthContextValues {
  logout: () => void,
  usuario: Usuario,
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
  const urlToken = useQuery('token');

  console.log(usuario)

  const logout = useCallback(() => {
    localStorage.removeItem("tokenUsuario");
    setUsuario({} as Usuario);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("tokenUsuario");
    if (token && !usuario.token) {
      setUsuario({ token } as Usuario);
    }
    if (urlToken && !usuario.token) {
      setUsuario({ token: urlToken } as Usuario);
    }
  }, [urlToken, usuario]);


  return (
    <AuthContext.Provider value={{ logout, usuario, setUsuario, }}>
      <ApiProvider>
        <AuthHelper>
          {children}
        </AuthHelper>
      </ApiProvider>
    </AuthContext.Provider>
  )
}

const AuthHelper: React.FC = ({ children }) => {
  const authContext = useContext(AuthContext);
  const apiContext = useContext(ApiContext);
  const { logado } = useAuth();
  const { pathname } = useLocation()
  const { push, } = useHistory();

  const efetuarLoginPorToken = useCallback(async () => {
    if (apiContext) {
      const resposta = await apiContext.get(
        "/usuario/loginPorToken"
      )
      if (resposta) {
        if (authContext) {
          authContext.setUsuario({ ...authContext.usuario, ...resposta } as Usuario);
        }
        else {
          throw new Error("Esse componente deve estar em uma sub-árvore depois do <AuthContext.Provider>.");
        }
      }
    }
    else {
      throw new Error("Esse componente deve estar em uma sub-árvore depois do <ApiContext.Provider>.");
    }
  }, [apiContext, authContext]);


  useEffect(() => {
    console.log(logado);
    if (!logado && authContext && authContext.usuario.token) {
      efetuarLoginPorToken();
    }
    else {
      if (pathname !== '/' && pathname !== '/login' && !logado) {
        push('/login', { login: true });
      }
    }
  }, [authContext, efetuarLoginPorToken, logado, pathname, push]);

  return (
    <>
      {
        children
      }
    </>
  );
}

export default AuthContext;