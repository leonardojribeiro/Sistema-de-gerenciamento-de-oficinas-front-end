import React, { memo } from 'react';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Fornecedor from '../../../Types/Fornecedor';
import AutoComplete from '../../Form/Fields/AutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteFornecedor: React.FC<AutoCompleteProps<Fornecedor>> = props => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Fornecedor>("fornecedores", "fornecedor", "nomeFantasia");
  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      path=""
      fullWidth
      options={options}
      loading={options?.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      getOptionLabel={(option) => option ? option.nomeFantasia : ""}
      getOptionSelected={(option, value) => option?._id === value?._id}
      {...props}
    />
  );
}

export default memo(AutoCompleteFornecedor);
