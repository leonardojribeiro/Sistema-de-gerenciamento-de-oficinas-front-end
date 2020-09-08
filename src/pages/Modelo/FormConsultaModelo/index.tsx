import React from 'react';

export interface ConsultaValues {
  marca: String;
  consulta: String;
}

interface FormConsultaProps {
  onSubmit: (data: ConsultaValues) => void;
}

const FormConsultaModelo: React.FC<FormConsultaProps> = () => {
  return <div />;
}

export default FormConsultaModelo;