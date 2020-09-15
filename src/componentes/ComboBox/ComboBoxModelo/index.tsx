import React, { useContext, useCallback, memo, useState, useEffect } from 'react';
import ApiContext from '../../../contexts/ApiContext';
import ComboBox from '../../Form/Fields/ComboBox';
import Modelo from '../../../Types/Modelo';
import { AutocompleteInputChangeReason } from '@material-ui/lab';

interface ComboBoxModeloProps {
  onChange?: (marca: Modelo | null) => void;
  label: string;
  name: string;
  required?: boolean
}

const ComboBoxModelo: React.FC<ComboBoxModeloProps> = ({ onChange, label, name, required }) => {
  const { get } = useContext(ApiContext);
  const [options, setOptions] = useState<Modelo[]>([]);

  const getOptions = useCallback(async () => {
    console.log("obtendo opções")
    const resposta = await get(`/modelo/?pagina=1&limite=100`, true) as any;
    if (resposta) {
      setOptions(resposta.modelos as Modelo[]);
    }
  }, [get]);

  const getMoreOptions = useCallback(async (consulta) => {
    const resposta = await get(`/modelo/consulta?descricao=${consulta}&pagina=1&limite=100`, true) as any;
    if (resposta) {
      setOptions(resposta.modelos as Modelo[]);
    }
  }, [get]);

  const getDefaultValueInOptions = useCallback((value) => {
    return options.find((modelo) => modelo._id === value);
  }, [options]);

  const getDefaultValue = useCallback(async (value) => {
    let defaultValue = getDefaultValueInOptions(value);
    if (defaultValue) {
      return defaultValue;
    }
    else {
      defaultValue = await get(`/modelo/id?_id=${value}`) as any;
      if (defaultValue) {
        setOptions(options => [...options, defaultValue as Modelo])
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
      getOptionLabel={(option) => option.descricao}
      getOptionSelected={(option, value) => option.descricao === value.descricao}
    />
  );
}

export default memo(ComboBoxModelo);