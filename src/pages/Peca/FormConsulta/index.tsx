import React, { useRef, useState, useContext, useCallback, useEffect, memo } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Marca from '../../../Types/Marca';
import ApiContext from '../../../contexts/ApiContext';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Form, CampoDeBusca } from '../../../componentes/Form';

interface FormConsultaProps {
  onSubmit: (consulta: String, marca: String) => void;
}

export interface ConsultaValues{
  marca: String;
  consulta: String;
}

const FormConsulta: React.FC<FormConsultaProps> = ({ onSubmit }) => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const valorSelecionado = useRef(false);
  const refMarca = useRef<String>("");
  const { get } = useContext(ApiContext);

  const listarMarcas = useCallback(async () => {
    const resposta = await get(`/marca`) as any;
    if (resposta) {
      setMarcas(resposta as Marca[]);
    }

  }, [get]);

  useEffect(() => {
    listarMarcas();
  }, [listarMarcas])

  const handleInputChange = useCallback(async (event: any, value: any) => {
    console.log(value)
    if (valorSelecionado.current) {
      const resposta = await get(`/marca/descricao?descricao=${value}`) as any;
      if (resposta) {
        setMarcas(resposta as Marca[]);
      }
    }
  }, [get]);

  const handleComboChange = useCallback((event: any, value: Marca | null) => {
    valorSelecionado.current = Boolean(value);
    refMarca.current = value ? value._id ? value._id : "" : "";
  }, []);

  const handleSubmit = useCallback((data: any) => {
    onSubmit(data.consulta, refMarca.current)
  }, [onSubmit]);

  return (
    <Card>
      <CardHeader title="Consulta" />
      <CardContent>
        <Form onSubmit={handleSubmit}>
          <Autocomplete
            fullWidth
            onChange={handleComboChange}
            onInputChange={handleInputChange}
            getOptionSelected={(option, value) => option.descricao === value.descricao}
            getOptionLabel={(marca) => marca.descricao}
            options={marcas}
            loading={marcas.length === 0}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filtrar pela marca"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {marcas.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
          <CampoDeBusca name="consulta" fullWidth label="Consulta"/>
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(FormConsulta);