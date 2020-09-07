import React, { useState, useContext, useCallback, memo } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import Marca from '../../../Types/Marca';
import ApiContext from '../../../contexts/ApiContext';
import ComboBox from '../../Form/Fields/ComboBox';

interface ComboBoxMarcaProps {
  onChange?: (marca: Marca | null) => void;
  label: string;
  name: string;
}

const ComboBoxMarca: React.FC<ComboBoxMarcaProps> = ({ onChange, label, name }) => {
  const { get } = useContext(ApiContext);
  const [progresso, setProgresso] = useState(false);

  const getOptions = useCallback(async () => {
    setProgresso(true);
    const resposta = await get(`/marca/?pagina=1&limite=100`, true) as any;
    setProgresso(false);
    return resposta.marcas as Marca[];
  }, [get]);

  const getMoreOptions = useCallback(async (consulta) => {
    setProgresso(true);
    const resposta = await get(`/marca/consulta?descricao=${consulta}&pagina=1&limite=100`, true) as any;
    setProgresso(false);
    return resposta.marcas as Marca[];
  }, [get]);

  const getDefaultValue = useCallback(async (consulta) => {
    const resposta = await get(`/marca/id?_id=${consulta}`,) as any;
    return resposta ? resposta : null;
  }, [get]);

  return (
    <ComboBox
      getOptions={getOptions}
      getMoreOptions={getMoreOptions}
      getDefaultValue={getDefaultValue}
      name={name}
      path="current._id"
      fullWidth
      options={[]}
      noOptionsText="Nenhuma Opção"
      loadingText="Carregando"
      clearText="Limpar"
      openText="Abrir"
      openOnFocus
      loading={progresso}
      getOptionLabel={(option) => option.descricao}
      getOptionSelected={(option, value) => option.descricao === value.descricao}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {progresso ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default memo(ComboBoxMarca);