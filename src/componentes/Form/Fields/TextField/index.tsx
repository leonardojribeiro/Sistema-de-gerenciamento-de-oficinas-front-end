import React, { memo, } from 'react';
import { TextField as TextFieldMUI, StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core';
import useFormField from '../../Hooks/useFormField';
import validacao from '../../../../recursos/Validacao';

interface TextFieldProps extends TextFieldPropsMUI {
  name: string;
  noValidate?: boolean;
  maxLength?: Number;
}

const TextField: React.FC<TextFieldProps> = ({ name, onChange, maxLength, ...props }) => {
  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validacao.validarTexto,
    noValidate: props.noValidate,
    required: props.required,
    onChange
  })

  return (
    <TextFieldMUI
      {...props}
      inputProps={{
        maxLength
      }}
      onChange={handleInputChange}
      value={value}
      error={!valid}
      inputRef={ref}
      helperText={
        ref.current &&
        props.required
        && !ref.current.value.length
        && !valid
        && "Campo obrigatório."
      }
    />
  );
}

export default memo(TextField);