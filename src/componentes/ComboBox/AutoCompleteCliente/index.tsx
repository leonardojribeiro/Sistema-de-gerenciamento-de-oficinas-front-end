import React, { memo } from 'react';
import ComboBox from '../../Form/Fields/ComboBox';
import Cliente from '../../../Types/Cliente';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteCliente: React.FC<AutoCompleteProps<Cliente>> = ({ onChange, label, name, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Cliente>("clientes", "cliente", "nome", listOptionsIn);

  return (
    <ComboBox
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="current._id"
      fullWidth
      options={options}
      loading={options.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option.nome}
      getOptionSelected={(option, value) => option.nome === value.nome}
    />
  );
}

export default memo(AutoCompleteCliente);