import React, { memo } from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import validacao from '../../../../recursos/Validacao';
import useFormField from '../../Hooks/useFormField';

interface EmailFieldProps extends StandardTextFieldProps {
  name: string;
  noValidate?: boolean;
  maxLength?: Number
}

const EmailField: React.FC<EmailFieldProps> = ({ name, maxLength, ...props }) => {
  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validacao.validarEmail,
    required: props.required,
    onChange: props.onChange
  })

  return (
    <TextField
      onChange={handleInputChange}
      error={!valid}
      value={value}
      inputRef={ref}
      inputProps={{
        maxLength,
      }}
      helperText={
        ref.current ?
          props.required
            ? valid
              ? ""
              : ref.current.value.length
                ? "Campo inválido."
                : "Campo obrigatório."
            : ref.current.value.length
              ? valid
                ? null
                : "Campo inválido."
              : null
          : null
      }
      {...props}
    />
  );
}

export default memo(EmailField);