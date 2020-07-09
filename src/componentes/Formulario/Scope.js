import React, { useContext } from 'react';
import FormContext from '../../contexts/FormContext';


function Scope({ path, children }) {
  const { scopePath, ...context } = useContext(FormContext);

  return (
    <FormContext.Provider value={{
      ...context,
      scopePath: scopePath.concat(scopePath ? `.${path}` : path)
    }}>
      {children}
    </FormContext.Provider>
  );
}

export default Scope;