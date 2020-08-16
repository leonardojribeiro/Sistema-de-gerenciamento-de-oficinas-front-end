import React, { createContext, useState, useCallback, SetStateAction } from 'react';
import { useEffect } from 'react';
import Usuario from '../../Types/Usuario';

interface AuthContextValues {
  logout: () => void,
  usuario: Usuario | undefined,
  setUsuario: React.Dispatch<React.SetStateAction<Usuario | undefined>>
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const AuthProvider: React.FC = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);

  const logout = useCallback(() => {
    localStorage.removeItem("tokenUsuario");
    setUsuario(undefined);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("tokenUsuario");
    if (token && !usuario) {
      setUsuario({ token } as Usuario);
    }
  }, [usuario])

  return (
    <AuthContext.Provider value={{ logout, usuario, setUsuario, }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;