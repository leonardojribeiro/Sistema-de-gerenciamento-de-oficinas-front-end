import React, { memo, useState, useContext,} from 'react';
import FormCadastro from './FormCadastro';
import { useEffect } from 'react';
import BackdropContext from '../../componentes/BackdropContext';
import BarraSuperiorContext from '../../componentes/BarraSuperiorContext';
import CustomIconButton from '../../componentes/IconButton';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';


function CadastroOficina({ ...props }) {

  const { setItens } = useContext(BarraSuperiorContext);
  const {setBackdropOpen} = useContext(BackdropContext);

  useEffect(() => {
    setItens({
      itens: {
        botoes: (
          <CustomIconButton tooltip="Página Inicial" component={Link} to="/">
            <Home />
          </CustomIconButton>
        )
      }
    });
    setBackdropOpen(true);
    setTimeout(()=>setBackdropOpen(false),500);
  }, [setBackdropOpen, setItens]);



  function handleSubmit(dados) {
    
    console.log(dados)
  }

  return (
    <FormCadastro onSubmit={handleSubmit} />
  );
};
export default memo(CadastroOficina);