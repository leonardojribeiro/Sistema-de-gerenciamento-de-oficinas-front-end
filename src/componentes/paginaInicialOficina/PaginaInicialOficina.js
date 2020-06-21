import React, { useContext } from 'react';
import BarraSuperior from '../BarraSuperior';
import { Avatar } from '@material-ui/core';
import AuthContext from '../../contexts/AuthContext';


function PaginaInicialOficina() {
  const {usuario} = useContext(AuthContext);
  console.log(usuario)
  return (
    <>
      <BarraSuperior>
        <Avatar src={`http://localhost:3333/files/${usuario.idOficina.uriLogo}`}/>

          Funcionalidades


          Cadastro

      </BarraSuperior>
    </>
  );
}

export default PaginaInicialOficina;