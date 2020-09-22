import React, { memo } from 'react';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Fornecedor from '../../../Types/Fornecedor';
import AutoComplete from '../../Form/Fields/AutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteFornecedor: React.FC<AutoCompleteProps<Fornecedor>> = ({ label, name, onChange, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Fornecedor>("fornecedores", "fornecedor", "nomeFantasia", listOptionsIn);

  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="current"
      fullWidth
      options={options}
      loading={options?.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option.nomeFantasia}
      getOptionSelected={(option, value) => option._id === value._id}
    />
  );
}

export default memo(AutoCompleteFornecedor);
