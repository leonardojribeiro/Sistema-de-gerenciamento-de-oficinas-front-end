import React, { memo } from 'react';
import AutoComplete from '../../Form/Fields/AutoComplete';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';
import Especialidade from '../../../Types/Especialidade';

const AutoCompleteEspecialidade: React.FC<AutoCompleteProps<Especialidade>> = props => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Especialidade>("especialidades", "especialidade", "descricao");
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
      getOptionSelected={(option, value) => option?._id === value?._id}
      {...props}
    />
  );
}

export default memo(AutoCompleteEspecialidade);