import React, { memo, useCallback } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Form, CampoDeBusca } from '../../../componentes/Form';

interface FormConsultaMarcaProps {
  onSubmit: (data: any) => void;
}

const FormConsultaMarca: React.FC<FormConsultaMarcaProps> = ({ onSubmit }) => {
  const handleSubmit = useCallback((data: any) => {
    onSubmit(data.descricao)
  }, [onSubmit]);

  return (
    <Card>
      <CardHeader title="Consulta" />
      <CardContent>
        <Form onSubmit={handleSubmit}>
          <CampoDeBusca name="descricao" fullWidth label="Consulta" />
        </Form>
      </CardContent>
    </Card>
  );
}

export default memo(FormConsultaMarca);