import React, { useContext, useCallback, memo } from 'react';
import ApiContext from '../../../contexts/ApiContext';
import ComboBox from '../../Form/Fields/ComboBox';
import Modelo from '../../../Types/Modelo';

interface ComboBoxModeloProps {
  onChange?: (marca: Modelo | null) => void;
  label: string;
  name: string;
  required?: boolean
}

const ComboBoxModelo: React.FC<ComboBoxModeloProps> = ({ onChange, label, name, required }) => {
  const { get } = useContext(ApiContext);

  const getOptions = useCallback(async () => {
    const resposta = await get(`/modelo/?pagina=1&limite=100`, true) as any;
    return resposta.modelos as Modelo[];
  }, [get]);

  const getMoreOptions = useCallback(async (consulta) => {
    console.log(consulta)
    const resposta = await get(`/modelo/consulta?descricao=${consulta}&pagina=1&limite=100`, true) as any;
    if (resposta) {
      return resposta.modelos as Modelo[];
    }
    return []
  }, [get]);

  const getDefaultValue = useCallback(async (value) => {
    const resposta = await get(`/modelo/id?_id=${value}`,) as any;
    return resposta ? resposta : null;
  }, [get]);

  const getDefaultValueInOptions = useCallback((value, option) => {
    return value === option._id;
  }, []);

  return (
    <ComboBox
      getOptions={getOptions}
      getMoreOptions={getMoreOptions}
      getDefaultValue={getDefaultValue}
      getDefaultValueInOptions={getDefaultValueInOptions}
      name={name}
      disablePortal
      label={label}
      path="current._id"
      fullWidth
      options={[]}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      openOnFocus
      required={required}
      getOptionLabel={(option) => option.descricao}
      getOptionSelected={(option, value) => option.descricao === value.descricao}
    />
  );
}

export default memo(ComboBoxModelo);