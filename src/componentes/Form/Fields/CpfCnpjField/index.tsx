import React, { useCallback, memo } from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import validacao from '../../../../recursos/Validacao';
import numberMask from '../../../../recursos/NumberMask';
import useFormField from '../../Hooks/useFormField';

interface CpfCnpjFieldProps extends StandardTextFieldProps {
  name: string;
  onlyCpf?: boolean;
  noValidate?: boolean;
}

const CampoCpfCnpj: React.FC<CpfCnpjFieldProps> = ({ name, onlyCpf, onChange, ...props }) => {
  const getMask = useCallback((value) =>
    numberMask(
      value,
      length =>
        length < 12
          ? "000.000.000-00"
          : "00.000.000/0000-00"
    ), []);
  const getUnmask = useCallback((value) => value.replace(/[^\d]/, ""), []);
  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validacao.validarCpfCnpj,
    getMask,
    noValidate: props.noValidate,
    required: props.required,
    onChange: onChange,
    getUnmask,
  })

  return (
    <TextField
      type="tel"
      onChange={handleInputChange}
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
      value={value}
      {...props}
    />
  );
}

export default memo(CampoCpfCnpj);