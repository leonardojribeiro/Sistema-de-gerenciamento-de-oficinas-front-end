import { useStaticState } from '@material-ui/pickers';
import React, { useCallback, useEffect, useState } from 'react';
import { useContext } from 'react';
import ApiContext from '../contexts/ApiContext';

function Example() {
  const [text, setText] = useState<string>(""); //Estado "text" do componente

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value); //Altera o estado do componente, 
                                //causando uma nova renderização dele mesmo  
  }

  return (
    <input
      value={text} //Informação do tipo string que o campo de texto irá apresentar
      onChange={handleChange} //Método invocado quando o campo de texto é alterado
    />
  );
}

export default Example;