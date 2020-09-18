import React, { memo } from 'react';
import ComboBox from '../../Form/Fields/ComboBox';
import Cliente from '../../../Types/Cliente';
import useAutoComplete from '../../../hooks/useAutoComplete';

interface ComboBoxClienteProps {
  onChange?: (marca: Cliente | null) => void;
  label: string;
  name: string;
  required?: boolean
}

const AutoCompleteCliente: React.FC<ComboBoxClienteProps> = ({ onChange, label, name, required }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete("clientes", "cliente", "nome");

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