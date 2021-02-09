import React, { memo } from 'react';
import Marca from '../../../Types/Marca';
import AutoComplete from '../../Form/Fields/AutoComplete';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteMarca: React.FC<AutoCompleteProps<Marca>> = props => {
  const { handleInputChange, getDefaultValue, options } = useAutoComplete<Marca>("marcas", "marca", "descricao");
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
      getOptionLabel={(option) => option ? option.descricao : ""}
      getOptionSelected={(option, value) => option?.descricao === value?.descricao}
      {...props}
    />
  );
}

export default memo(AutoCompleteMarca);