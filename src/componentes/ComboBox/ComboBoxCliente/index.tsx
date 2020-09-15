import React, { useContext, useCallback, memo, useState, useEffect } from 'react';
import ApiContext from '../../../contexts/ApiContext';
import ComboBox from '../../Form/Fields/ComboBox';
import Cliente from '../../../Types/Cliente';
import { AutocompleteInputChangeReason } from '@material-ui/lab';

interface ComboBoxClienteProps {
  onChange?: (marca: Cliente | null) => void;
  label: string;
  name: string;
  required?: boolean
}

const ComboBoxCliente: React.FC<ComboBoxClienteProps> = ({ onChange, label, name, required }) => {
  const { get } = useContext(ApiContext);
  const [options, setOptions] = useState<Cliente[]>([]);

  const getOptions = useCallback(async () => {
    console.log("obtendo opções")
    const resposta = await get(`/cliente/?pagina=1&limite=100`, true) as any;
    if (resposta) {
      setOptions(resposta.clientes as Cliente[]);
    }
  }, [get]);

  const getMoreOptions = useCallback(async (consulta) => {
    const resposta = await get(`/cliente/consulta?descricao=${consulta}&pagina=1&limite=100`, true) as any;
    if (resposta) {
      setOptions(resposta.clientes as Cliente[]);
    }
  }, [get]);

  const getDefaultValueInOptions = useCallback((value) => {
    return options.find((cliente) => cliente._id === value);
  }, [options]);

  const getDefaultValue = useCallback(async (value) => {
    let defaultValue = getDefaultValueInOptions(value);
    if (defaultValue) {
      return defaultValue;
    }
    else {
      defaultValue = await get(`/cliente/id?_id=${value}`) as any;
      if (defaultValue) {
        setOptions(options => [...options, defaultValue as Cliente])
        return defaultValue;
      }
      else {
        return null;
      }
    }
  }, [get, getDefaultValueInOptions]);


  useEffect(() => {
    getOptions();
  }, [getOptions]);

  const handleInputChange = useCallback((event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
    if (reason === "input" && value.length > 1) {
      getMoreOptions(value);
    }
  }, [getMoreOptions]);

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
      getOptionLabel={(option) => option.nome}
      getOptionSelected={(option, value) => option.nome === value.nome}
    />
  );
}

export default memo(ComboBoxCliente);