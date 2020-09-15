import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import validacao from '../../../../recursos/Validacao';
import { useEffect } from 'react';
import useField from '../../Hooks/useField';
import numberMask from '../../../../recursos/NumberMask';

interface CpfCnpjFieldProps extends StandardTextFieldProps {
  name: string;
  onlyCpf?: boolean;
  noValidate?: boolean;
}

const CampoCpfCnpj: React.FC<CpfCnpjFieldProps> = ({ name, onlyCpf, onChange, ...props }) => {
  const [valido, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);

  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (props.noValidate) {
        return true;
      }
      if (!props.required && !ref.current.value.length) {
        return true;
      }
      if (validacao.validarCpfCnpj(ref.current.value)) {
        setValid(true);
        return (true);
      }
      else {
        if (ref) {
          ref.current.focus();
        }
        setValid(false);
        return (false);
      }
    }
    else {
      throw new Error("");

    }
  }, [props.noValidate, props.required]);

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, [])

  useEffect(() => {
    registerField({
      validate,
      ref: ref.current,
      name: fieldName,
      path: "value",
      clear
    });
  }, [clear, fieldName, registerField, validate]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  const manipularAlteracao = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = numberMask(
      event.target.value,
      tamanho =>
        tamanho < 12
          ? "000.000.000-00"
          : "00.000.000/0000-00"
    );
    setValue(value);
    if (!valido) {
      validate();
    }
    if(onChange){
      event.target.value = value;
      onChange(event)
    }
  }, [onChange, validate, valido])

  return (
    <TextField
      onChange={manipularAlteracao}
      error={!valido}
      inputRef={ref}
      helperText={
        ref.current ?
          props.required
            ? valido
              ? ""
              : ref.current.value.length
                ? "Campo inválido."
                : "Campo obrigatório."
            : ref.current.value.length
              ? valido
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