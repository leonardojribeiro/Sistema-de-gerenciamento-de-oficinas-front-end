import React, { useContext, memo } from 'react';
import FormularioContexto from '../Contexto/FormularioContexto';
import PropTypes from 'prop-types';

function No({ no, children }) {
  const { caminho, ...context } = useContext(FormularioContexto);
  return (
    <FormularioContexto.Provider value={{
      ...context,
      caminho: caminho.concat(caminho ? `.${no}` : no)
    }}>
      {children}
    </FormularioContexto.Provider>
  );
}

No.propTypes = {
  no: PropTypes.string,
}

export default memo(No);