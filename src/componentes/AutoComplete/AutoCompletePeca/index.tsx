import React, { memo, } from 'react';
import AutoComplete from '../../Form/Fields/AutoComplete';
import Peca from '../../../Types/Peca';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';


const AutoCompletePeca: React.FC<AutoCompleteProps<Peca>> = props=> {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Peca>("pecas", "peca", "descricao");
  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      path=""
      fullWidth
      options={options}
      loading={options.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      getOptionLabel={(option) => option ? option.descricao : ""}
      getOptionSelected={(option, value) => option?.descricao === value?.descricao}
      {...props}
    />
  );
}

export default memo(AutoCompletePeca);