import React, { createContext, useState, useCallback } from 'react';
import { useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);


  const deslogar = useCallback(() => {
    localStorage.removeItem("tokenUsuario");
    setUsuario(null);
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem("tokenUsuario");
    if (token && !usuario) {
      setUsuario({token});
    }
  }, [usuario])

  return (
    <AuthContext.Provider value={{ deslogar, usuario, setUsuario, }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;