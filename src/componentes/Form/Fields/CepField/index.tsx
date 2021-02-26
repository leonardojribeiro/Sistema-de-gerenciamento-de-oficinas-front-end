import React, { useCallback, memo } from 'react';
import  TextField, {StandardTextFieldProps } from '@material-ui/core/TextField';
import validacao from '../../../../recursos/Validacao';
import numberMask from '../../../../recursos/NumberMask';
import useFormField from '../../Hooks/useFormField';

interface CepFieldProps extends StandardTextFieldProps {
  name: string,
}

const CepField: React.FC<CepFieldProps> = ({ name, onChange, ...props }) => {
  const getMask = useCallback((value) =>
    numberMask(
      value,
      () => "00000-000"
    ), []);

  const getUnmask = useCallback((value) => value.replace(/[^\d]/, ""), []);
  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validacao.validarCep,
    getMask, required: props.required,
    onChange: onChange,
    getUnmask
  })


  return (
    <TextField
      onChange={handleInputChange}
      type="number"
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