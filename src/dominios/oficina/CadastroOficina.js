import React, { memo, useState, useContext,} from 'react';
import FormCadastro from './FormCadastro';
import { useEffect } from 'react';
import BackdropContext from '../../componentes/BackdropContext';
import BarraSuperiorContext from '../../componentes/BarraSuperiorContext';
import CustomIconButton from '../../componentes/IconButton';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';

function CadastroOficina({ ...props }) {

  const {setBackdropOpen} = useContext(BackdropContext);

  
  function handleSubmit(dados) {
    
    console.log(dados)
  }

  return (
    <FormCadastro onSubmit={handleSubmit} />
  );
};
export default memo(CadastroOficina);