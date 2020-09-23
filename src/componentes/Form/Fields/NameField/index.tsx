import React, { useCallback, memo, } from 'react';
import { TextField as TextFieldMUI, StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core';
import { validarNome } from '../../../../recursos/Validacao';
import useFormField from '../../Hooks/useFormField';

interface NameFieldProps extends TextFieldPropsMUI {
  name: string;
  noValidate?: boolean;
}

const NameField: React.FC<NameFieldProps> = ({ name, onChange, ...props }) => {
  const getMask = useCallback(value => value.replace(/[^A-zÀ-ÿ' ]/, ""), [])
  const { handleInputChange, ref, valid, value } = useFormField(name, validarNome, getMask, props.noValidate, props.required)

  return (
    <TextFieldMUI
      {...props}
      onChange={handleInputChange}
      value={value}
      error={!valid}
      inputRef={ref}
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
    />
  );
}

export default memo(NameField);