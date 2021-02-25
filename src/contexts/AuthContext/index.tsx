import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DialogActions from '@material-ui/core/DialogActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import React, { createContext, useState, useCallback, useContext, useMemo, useRef } from 'react';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { formatarData } from '../../recursos/Formato';
import Usuario from '../../Types/Usuario';
import ApiContext, { ApiProvider } from '../ApiContext';
import ptLocale from 'date-fns/locale/pt-BR';
import Dialog from '../../componentes/Dialog';

interface AuthContextValues {
  logout: () => void,
  usuario: Usuario,
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>,
  verificarTempoRestante: () => void;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario>({} as Usuario);
  const [open, setOpen] = useState<boolean>(false);
  const showAgain = useRef<boolean>(true);
  const distanceToNow = useRef<string>("");
  const { push } = useHistory();

  const logout = useCallback(() => {
    localStorage.removeItem("tokenUsuario");
    setUsuario({} as Usuario);
    setOpen(false);
  }, []);

  const verificarTempoRestante = useCallback(() => {
    if (usuario.token) {
      const partes = usuario.token.split('.');
      const decodificado = JSON.parse(atob(partes[1]));
      const expireToken = decodificado.exp * 1000;
      const diferenca = differenceInMinutes(expireToken, Date.now())
      if (diferenca < 10 && diferenca >= 0 && showAgain.current && usuario._id) {
        distanceToNow.current = formatDistanceToNow(expireToken, { locale: ptLocale, includeSeconds: true });
        setOpen(true);
      }
    }
  }, [usuario._id, usuario.token]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleDontShowAgainClick = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    showAgain.current = !checked;
  }, []);

  const content = useMemo(() => (
    <AuthContext.Provider value={{ logout, usuario, setUsuario, verificarTempoRestante }}>
      <ApiProvider>
        <AuthHelper>
          {children}
        </AuthHelper>
      </ApiProvider>
    </AuthContext.Provider>
  ), [children, logout, usuario, verificarTempoRestante])

  const handleClickLogin = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();
    logout();
    push('/login');
  }, [logout, push]);

  return (
    <>
      {content}
      <Dialog open={open && usuario._id !== undefined} title="Sessão prestes a encerrar" maxWidth="xs" fullWidth onClose={handleClose}>
        <Typography>
          {`Sua sessão será encerrada em ${distanceToNow.current}.`}
          <br />
          Nehuma informação poderá ser incluída, listada ou alterada após o encerramento da sessão.
          <br />
          Todo trabalho não salvo será perdido.
          <br />
          <Link href="#" onClick={handleClickLogin} color="inherit">Clique aqui</Link> para refazer seu login e evitar perda de trabalho.
        </Typography>
        <DialogActions>
          <FormControlLabel label="Não mostrar novamente" control={<Checkbox onChange={handleDontShowAgainClick} color="primary" />} />
          <Button onClick={handleClose} variant="outlined" color="default">Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const AuthHelper: React.FC = ({ children }) => {
  const { setUsuario, logout } = useContext(AuthContext);
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

  const readToken = useCallback(() => {
    return localStorage.getItem("tokenUsuario");
  }, []);

  useEffect(() => {
    const token = readToken();
    if (token && !logado) {
      const partes = token.split('.');
      const decodificado = JSON.parse(atob(partes[1]));
      const expireToken = decodificado.exp * 1000;
      if (Date.now() < expireToken) {
        console.log('fzd login por token')
        efetuarLoginPorToken(token);
      }
      else if (pathname !== '/login') {
        setMensagem(`Sessão expirada em ${formatarData(new Date(expireToken), 'completaComHora')}.`);
        localStorage.removeItem("tokenUsuario");
      }
    }
    if (!token && pathname !== '/' && pathname !== '/login') {
      logout();
      push('/login');
    }
  }, [efetuarLoginPorToken, logado, logout, pathname, push, readToken]);

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