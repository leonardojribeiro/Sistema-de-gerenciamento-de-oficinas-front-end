import React, { createContext, useState, useCallback, SetStateAction, useContext } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

  const logout = useCallback(() => {
    localStorage.removeItem("tokenUsuario");
    setUsuario({} as Usuario);
  }, []);

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
  const { setUsuario, usuario } = useContext(AuthContext);
  const apiContext = useContext(ApiContext);
  const { logado } = useAuth();
  const { pathname } = useLocation()
  const { push, } = useHistory();

  const efetuarLoginPorToken = useCallback(async (token: String) => {
    if (apiContext) {
      const resposta = await apiContext.get(
        "/usuario/loginPorToken", undefined, { headers: { authorization: `Bearer ${token}` } }
      ) as Usuario;
      if (resposta) {
        if (setUsuario) {
          setUsuario({ ...resposta, token } as Usuario);
        }
      }
    }
  }, [apiContext, setUsuario]);


  useEffect(() => {
    const token = localStorage.getItem("tokenUsuario");
    if (token && !logado) {
      efetuarLoginPorToken(token);
    }
    if (!token && pathname !== '/' && pathname !== '/login') {
      push('/login');
    }
  }, [efetuarLoginPorToken, logado, pathname, push, setUsuario, usuario.token]);


  return (
    <>
      {children}
    </>
  );
}

export default AuthContext;