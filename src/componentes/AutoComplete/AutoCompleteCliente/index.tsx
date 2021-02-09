import React, { memo } from 'react';
import AutoComplete from '../../Form/Fields/AutoComplete';
import Cliente from '../../../Types/Cliente';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteCliente: React.FC<AutoCompleteProps<Cliente>> = props => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Cliente>("clientes", "cliente", "nome");

  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      path="_id"
      fullWidth
      options={options}
      loading={options.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      getOptionLabel={(option) => option ? option.nome : ""}
      getOptionSelected={(option, value) => option?.nome === value?.nome}
      {...props}
    />
  );
}

export default memo(AutoCompleteCliente);