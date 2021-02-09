import React, { memo } from 'react';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Servico from '../../../Types/Servico';
import AutoComplete from '../../Form/Fields/AutoComplete';
import AutoCompleteProps from '../Types';

const AutoCompleteServico: React.FC<AutoCompleteProps<Servico>> = props => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Servico>("servicos", "servico", "descricao");
  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      path=""
      fullWidth
      options={options}
      loading={options?.length === 0}
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

export default memo(AutoCompleteServico);
