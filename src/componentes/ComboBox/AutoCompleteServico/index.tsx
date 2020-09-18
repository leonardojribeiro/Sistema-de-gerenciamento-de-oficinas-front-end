import React, { memo } from 'react';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Servico from '../../../Types/Servico';
import ComboBox from '../../Form/Fields/ComboBox';

interface ComboBoxModeloProps {
  onChange?: (marca: Servico | null) => void;
  label: string;
  name: string;
  required?: boolean;
}

const AutoCompleteServico: React.FC<ComboBoxModeloProps> = ({ label, name, onChange, required }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete("servicos", "servico", "descricao");

  return (
    <ComboBox
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="current"
      fullWidth
      options={options}
      loading={options?.length === 0}
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

export default memo(AutoCompleteServico);
