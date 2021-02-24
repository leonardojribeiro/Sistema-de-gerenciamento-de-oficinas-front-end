import React, { useCallback, memo, } from 'react';
import TextFieldMUI, { StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core/TextField';
import { validarNome } from '../../../../recursos/Validacao';
import useFormField from '../../Hooks/useFormField';

interface NameFieldProps extends TextFieldPropsMUI {
  name: string;
  noValidate?: boolean;
  maxLength?: Number;
}

const NameField: React.FC<NameFieldProps> = ({ name, onChange, maxLength, ...props }) => {
  const getMask = useCallback(value => value.replace(/[^A-zÀ-ÿ' ]/, ""), [])

  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validarNome,
    getMask,
    noValidate: props.noValidate,
    required: props.required,
    onChange: onChange,
  });

  console.log(value)

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