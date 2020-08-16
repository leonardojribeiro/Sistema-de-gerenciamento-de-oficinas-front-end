import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import { TextField, StandardTextFieldProps } from '@material-ui/core';
import useField from '../../Hooks/useField';

interface DateFieldProps extends StandardTextFieldProps {
  name: string,
}

const DateField: React.FC<DateFieldProps> = ({ name, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);
  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (!props.required && !ref.current.value.length) {
        return true;
      }
      if (ref.current.value.length) {
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
      clear
    });
  }, [clear, fieldName, registerField, validate]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue.split('T')[0]);
    }
  }, [defaultValue]);

  const handleChange = useCallback((evento) => {
    if (!valid) {
      validate();
    }
    setValue(evento.target.value);
  }, [validate, valid]);

  return (
    <TextField
      inputRef={ref}
      type="date"
      value={value}
      onChange={handleChange}
      error={!valid}
      helperText={
        ref.current &&
        props.required
        && !ref.current.value.length
        && !valid
        && "Campo obrigatório."
      }
      InputLabelProps={{
        shrink: true,
      }}
      {...props}
    />
  );
}

export default memo(DateField);