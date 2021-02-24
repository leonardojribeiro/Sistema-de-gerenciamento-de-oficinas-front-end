import React, { useCallback, memo, } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import validacao from '../../../../recursos/Validacao';
import numberMask from '../../../../recursos/NumberMask';
import useFormField from '../../Hooks/useFormField';

interface PhoneFieldProps extends StandardTextFieldProps {
  name: string;
  noValidate?: boolean;
}

const PhoneField: React.FC<PhoneFieldProps> = ({ name, onChange, ...props }) => {
  const getMask = useCallback(value => numberMask(
    value,
    length => length < 11
      ? "(00) 0000-0000"
      : "(00) 00000-0000"
  ), []);
  const getUnmask = useCallback((value) => value.replace(/[^\d]/, ""), []);
  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validacao.validarTelefone,
    getMask, noValidate: props.noValidate,
    required: props.required,
    onChange: onChange,
    getUnmask,
  })

  return (
    <TextField
      onChange={handleInputChange}
      error={!valid}
      value={value}
      inputRef={ref}
      type="tel"
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

export default memo(PhoneField);