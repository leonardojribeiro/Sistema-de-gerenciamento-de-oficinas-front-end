import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import validacao from '../../../../recursos/Validacao';
import { useEffect } from 'react';
import useField from '../../Hooks/useField';
import numberMask from '../../../../recursos/NumberMask';

interface CepFieldProps extends StandardTextFieldProps {
  name: string,
}

const CepField: React.FC<CepFieldProps> = ({ name, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);

  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (!props.required && !ref.current.value.length) {
        return true;
      }
      if (validacao.validarCep(ref.current.value)) {
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
  }, [props.required]);

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
      clear,
    });
  }, [clear, fieldName, registerField, validate]);

  useEffect(() => {
    if (defaultValue) {
      setValue(
        numberMask(
          defaultValue,
          () => "00000-000"
        )
      )
    }
  }, [defaultValue]);

  const handleChange = useCallback((evento: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(
      numberMask(
        evento.target.value,
        () => "00000-000"
      )
    )
    if (!valid) {
      validate();
    }
  }, [validate, valid])

  return (
    <TextField
      onChange={handleChange}
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