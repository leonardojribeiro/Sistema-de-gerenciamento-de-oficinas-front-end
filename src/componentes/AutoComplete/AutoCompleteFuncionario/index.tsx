import React, { memo } from 'react';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Funcionario from '../../../Types/Funcionario';
import AutoComplete from '../../Form/Fields/AutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteFornecedor: React.FC<AutoCompleteProps<Funcionario>> = ({ label, name, onChange, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Funcionario>("funcionarios", "funcionario", "nome", listOptionsIn);

  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path=""
      fullWidth
      options={options}
      loading={options?.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option ? option.nome : ""}
      getOptionSelected={(option, value) => option?._id === value?._id}
    />
  );
}

export default memo(AutoCompleteFornecedor);
