import React, { memo } from 'react';
import AutoComplete from '../../Form/Fields/AutoComplete';
import useAutoComplete from '../../../hooks/useAutoComplete';
import Modelo from '../../../Types/Modelo';
import AutoCompleteProps from '../Types';
import { AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab';

interface Props{
  onChange?: (event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => void;
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  InputProps?: {
    startAdornment?: React.ReactNode;
  }
}

const AutoCompleteModelo: React.FC<Props> = ({ onChange, label, name, required , InputProps }) => {
  const { getDefaultValue, handleInputChange, options } = useAutoComplete<Modelo>("modelos", "modelo", "descricao", );
  return (
    <AutoComplete
      getDefaultValue={getDefaultValue}
      onInputChange={handleInputChange}
      name={name}
      label={label}
      path="_id"
      fullWidth
      options={options}
      loading={options.length === 0}
      onChange={onChange}
      InputProps={InputProps}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      required={required}
      getOptionLabel={(option) => option ? option.descricao : ""}
      getOptionSelected={(option, value) => option?.descricao === value?.descricao}
    />
  );
}

export default memo(AutoCompleteModelo);