import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import React, { createContext, useState, useCallback, useContext, useMemo } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { formatarData } from '../../recursos/Formato';
import Usuario from '../../Types/Usuario';
import ApiContext, { ApiProvider } from '../ApiContext';
import ptLocale from 'date-fns/locale/pt-BR';

interface AuthContextValues {
  logout: () => void,
  usuario: Usuario,
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>,
  verificarTempoRestante: () => void;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);

  const logout = useCallback(() => {
    localStorage.removeItem("tokenUsuario");
    setUsuario({} as Usuario);
  }, []);

  const verificarTempoRestante = useCallback(() => {
    console.log("verificando")
    if (usuario.token) {
      const partes = usuario.token.split('.');
      const decodificado = JSON.parse(atob(partes[1]));
      const expireToken = decodificado.exp * 1000;
      const diferenca = differenceInMinutes(expireToken, Date.now())
      console.log(diferenca)
      if (diferenca < 10) {
        console.log(formatDistanceToNow(expireToken, { locale: ptLocale, includeSeconds: true }))
      }
    }
  }, [usuario.token]);

  return (
    <AuthContext.Provider value={{ logout, usuario, setUsuario, verificarTempoRestante }}>
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
  const { get } = useContext(ApiContext);
  const { logado } = useAuth();
  const { pathname } = useLocation()
  const { push, } = useHistory();
  const [mensagem, setMensagem] = useState<string>("")

  const efetuarLoginPorToken = useCallback(async (token: String) => {
    const resposta = await get(
      "/usuario/loginPorToken", undefined, { headers: { authorization: `Bearer ${token}` } }
    ) as Usuario;
    if (resposta) {
      if (setUsuario) {
        setUsuario({ ...resposta, token } as Usuario);
      }
    }
  }, [get, setUsuario]);

  useEffect(() => {
    const token = localStorage.getItem("tokenUsuario");
    if (token && !logado) {
      const partes = token.split('.');
      const decodificado = JSON.parse(atob(partes[1]));
      const expireToken = decodificado.exp * 1000;
      if (Date.now() < expireToken) {
        efetuarLoginPorToken(token);
      }
      else if (pathname !== '/login') {
        setMensagem(`Sessão expirada em ${formatarData(new Date(expireToken), 'completaComHora')}.`);
        localStorage.removeItem("tokenUsuario");
      }
    }
    if (!token && pathname !== '/' && pathname !== '/login') {
      push('/login');
    }
  }, [efetuarLoginPorToken, logado, pathname, push, setUsuario, usuario.token]);

  const conteudo = useMemo(() => children, [children])

  const handleClose = useCallback(() => {
    setMensagem('');
  }, [])

  return (
    <>
      {conteudo}
      <Snackbar open={mensagem.length > 0} onClose={handleClose} >
        <Alert severity="warning" onClose={handleClose} closeText="Fechar">
          {mensagem}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AuthContext;