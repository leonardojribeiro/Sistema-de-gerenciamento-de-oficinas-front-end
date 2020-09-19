import React, { memo, } from 'react';
import ComboBox from '../../Form/Fields/ComboBox';
import Peca from '../../../Types/Peca';
import useAutoComplete from '../../../hooks/useAutoComplete';
import AutoCompleteProps from '../Types';


const ComboBoxPeca: React.FC<AutoCompleteProps<Peca>> = ({ onChange, label, name, required, listOptionsIn }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete("pecas", "peca", "descricao", listOptionsIn);

  return (
    <ComboBox
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="current"
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

export default memo(ComboBoxPeca);