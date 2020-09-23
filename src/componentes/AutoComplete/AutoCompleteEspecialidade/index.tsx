import React, { memo } from 'react';
import AutoComplete from '../../Form/Fields/AutoComplete';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';
import Especialidade from '../../../Types/Especialidade';

const AutoCompleteEspecialidade: React.FC<AutoCompleteProps<Especialidade>> = ({ onChange, label, name, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Especialidade>("especialidades", "especialidade", "descricao", listOptionsIn);

  return (
    <AutoComplete
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

export default memo(AutoCompleteEspecialidade);