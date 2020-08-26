import React, { createContext, useState, useCallback, SetStateAction } from 'react';
import { useEffect } from 'react';
import Usuario from '../../Types/Usuario';

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

  useEffect(() => {
    const token = localStorage.getItem("tokenUsuario");
    if (token && !usuario.token) {
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