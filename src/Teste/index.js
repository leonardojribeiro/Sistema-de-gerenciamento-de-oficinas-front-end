import React from 'react';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

// import { Container } from './styles';

function Teste() {
  const t = useContext(AuthContext);
  console.log(t)
  return <div />;
}

export default Teste;