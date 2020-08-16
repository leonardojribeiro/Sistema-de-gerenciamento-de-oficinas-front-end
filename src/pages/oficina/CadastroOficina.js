import React, { memo, } from 'react';
import FormCadastro from './FormCadastro';

function CadastroOficina({ ...props }) {
  function handleSubmit(dados) {
    console.log(dados)
  }

  return (
    <FormCadastro onSubmit={handleSubmit} />
  );
};
export default memo(CadastroOficina);