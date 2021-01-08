import React, { memo } from 'react';
import AutoComplete from '../../Form/Fields/AutoComplete';
import Cliente from '../../../Types/Cliente';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteCliente: React.FC<AutoCompleteProps<Cliente>> = ({ onChange, label, name, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Cliente>("clientes", "cliente", "nome", listOptionsIn);

  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="_id"
      fullWidth
      options={options}
      loading={options.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option ? option.nome : ""}
      getOptionSelected={(option, value) => option?.nome === value?.nome}
    />
  );
}

export default memo(AutoCompleteCliente);