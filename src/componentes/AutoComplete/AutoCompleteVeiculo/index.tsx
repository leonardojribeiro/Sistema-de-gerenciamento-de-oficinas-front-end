import React, { memo } from 'react';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Veiculo from '../../../Types/Veiculo';
import AutoComplete from '../../Form/Fields/AutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteVeiculo: React.FC<AutoCompleteProps<Veiculo>> = props => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Veiculo>("veiculos", "veiculo", "placa");
  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      path="_id"
      fullWidth
      options={options}
      loading={options?.length === 0}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      getOptionLabel={(option) => option ? option.placa : ""}
      getOptionSelected={(option, value) => option?._id === value?._id}
      {...props}
    />
  );
}

export default memo(AutoCompleteVeiculo);
