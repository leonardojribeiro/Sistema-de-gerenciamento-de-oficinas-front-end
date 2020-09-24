import React, { memo } from 'react';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Veiculo from '../../../Types/Veiculo';
import AutoComplete from '../../Form/Fields/AutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteVeiculo: React.FC<AutoCompleteProps<Veiculo>> = ({ label, name, onChange, required, listOptionsIn, disabled }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Veiculo>("veiculos", "veiculo", "placa", listOptionsIn);

  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="current._id"
      fullWidth
      options={options}
      loading={options?.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option.placa}
      getOptionSelected={(option, value) => option._id === value._id}
      disabled={disabled}
    />
  );
}

export default memo(AutoCompleteVeiculo);
