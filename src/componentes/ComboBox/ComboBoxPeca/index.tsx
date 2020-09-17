import React, { useContext, useCallback, memo, useState, useEffect } from 'react';
import ApiContext from '../../../contexts/ApiContext';
import ComboBox from '../../Form/Fields/ComboBox';
import { AutocompleteInputChangeReason } from '@material-ui/lab';
import Peca from '../../../Types/Peca';

interface ComboBoxModeloProps {
  onChange?: (marca: Peca | null) => void;
  label: string;
  name: string;
  required?: boolean
}

const ComboBoxPeca: React.FC<ComboBoxModeloProps> = ({ onChange, label, name, required }) => {
  const { get } = useContext(ApiContext);
  const [options, setOptions] = useState<Peca[]>([]);

  const getOptions = useCallback(async () => {
    console.log("obtendo opções")
    const resposta = await get(`/peca/?pagina=1&limite=100`, true) as any;
    if (resposta) {
      setOptions(resposta.pecas as Peca[]);
    }
  }, [get]);

  const getMoreOptions = useCallback(async (consulta) => {
    const resposta = await get(`/peca/consulta?descricao=${consulta}&pagina=1&limite=100`, true) as any;
    if (resposta) {
      setOptions(resposta.pecas as Peca[]);
    }
  }, [get]);

  const getDefaultValueInOptions = useCallback((value) => {
    return options.find((peca) => peca._id === value);
  }, [options]);

  const getDefaultValue = useCallback(async (value) => {
    let defaultValue = getDefaultValueInOptions(value);
    if (defaultValue) {
      return defaultValue;
    }
    else {
      defaultValue = await get(`/peca/id?_id=${value}`) as any;
      if (defaultValue) {
        setOptions(options => [...options, defaultValue as Peca])
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