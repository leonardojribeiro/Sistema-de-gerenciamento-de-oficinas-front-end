import React, { memo, } from 'react';
import AutoComplete from '../../Form/Fields/AutoComplete';
import Peca from '../../../Types/Peca';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';


const AutoCompletePeca: React.FC<AutoCompleteProps<Peca>> = ({ onChange, label, name, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Peca>("pecas", "peca", "descricao", listOptionsIn);

  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path=""
      fullWidth
      options={options}
      loading={options.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option.descricao}
      getOptionSelected={(option, value) => option.descricao === value.descricao}
    />
  );
}

export default memo(AutoCompletePeca);