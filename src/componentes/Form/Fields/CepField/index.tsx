import React, { useCallback, memo } from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import validacao from '../../../../recursos/Validacao';
import numberMask from '../../../../recursos/NumberMask';
import useFormField from '../../Hooks/useFormField';

interface CepFieldProps extends StandardTextFieldProps {
  name: string,
}

const CepField: React.FC<CepFieldProps> = ({ name, ...props }) => {
  const getMask = useCallback((value) =>
    numberMask(
      value,
      () => "00000-000"
    ), []);
  const { handleInputChange, ref, valid, value } = useFormField(name, validacao.validarCep, getMask, undefined, props.required, props.onChange)


  return (
    <TextField
      onChange={handleInputChange}
      error={!valid}
      value={value}
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
      {...props}
    />
  );
}

export default memo(CepField);