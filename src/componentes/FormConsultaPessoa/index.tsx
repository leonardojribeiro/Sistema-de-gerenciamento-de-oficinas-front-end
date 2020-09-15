import { Box, FormControlLabel, Radio } from '@material-ui/core';
import React, { memo, useCallback } from 'react';
import { CampoDeRadio, Form } from '../Form';
import SearchField from '../Form/Fields/SearchField';

export interface FormConsultaPessoaValues {
  consulta: string,
  filtro: string,
}

interface FormConsultaPessoaProps {
  onSubmit: (data: FormConsultaPessoaValues) => void;
}

const FormConsultaPessoa: React.FC<FormConsultaPessoaProps> = ({ onSubmit }) => {

  const handleSubmit = useCallback((event, data) => {
    onSubmit(data);
  }, [onSubmit]);

  return (
    <Form onSubmit={handleSubmit} initialData={{ filtro: "nome" }}>
      <Box display="flex">
        <SearchField name="consulta" fullWidth label="Consulta" />
        <CampoDeRadio required name="filtro" label="Fitrar por">
          <FormControlLabel value="nome" label="Nome" control={<Radio color="primary" />} />
          <FormControlLabel value="email" label="E-mail" control={<Radio color="primary" />} />
          <FormControlLabel value="cpfCnpj" label="CPF/CNPJ" control={<Radio color="primary" />} />
          <FormControlLabel value="telefone" label="Telefone" control={<Radio color="primary" />} />
        </CampoDeRadio>
      </Box>
    </Form>
  );
}

export default memo(FormConsultaPessoa);