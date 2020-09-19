import React, { memo } from 'react';
import Marca from '../../../Types/Marca';
import ComboBox from '../../Form/Fields/ComboBox';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteMarca: React.FC<AutoCompleteProps<Marca>> = ({ onChange, label, name, required, listOptionsIn }) => {
  const { handleInputChange, getDefaultValue, options } = useAutoComplete<Marca>("marcas", "marca", "descricao", listOptionsIn);

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
      getOptionLabel={(option) => option.descricao}
      getOptionSelected={(option, value) => option.descricao === value.descricao}
    />
  );
}

export default memo(AutoCompleteMarca);