import React, { memo } from 'react';
import Marca from '../../../Types/Marca';
import ComboBox from '../../Form/Fields/ComboBox';
import useAutoComplete from '../../../hooks/useAutoComplete';

interface ComboBoxMarcaProps {
  onChange?: (marca: Marca | null) => void;
  label: string;
  name: string;
  required?: boolean
}

const AutoCompleteMarca: React.FC<ComboBoxMarcaProps> = ({ onChange, label, name, required }) => {
  const { handleInputChange, getDefaultValue, options } = useAutoComplete("marcas", "marca", "descricao");

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