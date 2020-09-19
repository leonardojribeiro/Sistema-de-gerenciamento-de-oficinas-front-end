import React, { useCallback, memo } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Form, CampoDeBusca } from '../../../componentes/Form';
import AutoCompleteMarca from '../../../componentes/ComboBox/AutoCompleteMarca';

export interface ConsultaValues {
  marca: String;
  consulta: String;
}

interface FormConsultaProps {
  onSubmit: (data: ConsultaValues) => void;
}
const FormConsultaPeca: React.FC<FormConsultaProps> = ({ onSubmit }) => {
  const handleSubmit = useCallback((data: any) => {
    onSubmit(data)
  }, [onSubmit]);

  return (
    <Card>
      <CardHeader title="Consulta" />
      <CardContent>
        <Form onSubmit={handleSubmit}>
          <AutoCompleteMarca name="marca" label="Filtrar pela marca" listOptionsIn/>
          <CampoDeBusca name="consulta" fullWidth label="Consulta" />
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(FormConsultaPeca);