import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import validacao from '../../../../recursos/Validacao';
import { useEffect } from 'react';
import useField from '../../Hooks/useField';

interface EmailFieldProps extends StandardTextFieldProps {
  name: string,
}

const EmailField: React.FC<EmailFieldProps> = ({ name, ...props }) => {
  const [valid, setValido] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);

  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (!props.required && !ref.current.value.length) {
        return true;
      }
      if (validacao.validarEmail(ref.current.value)) {
        setValido(true);
        return (true);
      }
      else {
        if (ref) {
          ref.current.focus();
        }
        setValido(false);
        return (false);
      }
    }
    else{
      throw new Error("");
      
    }
  }, [props.required]);

  const clear = useCallback(() => {
    setValue("");
    setValido(true);
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
  }, [defaultValue]);

  const manipularAlteracao = useCallback((evento) => {
    setValue(
      evento.target.value
    )
    if (!valid) {
      validate();
    }
  }, [validate, valid]);

  return (
    <TextField
      onChange={manipularAlteracao}
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

export default memo(EmailField);