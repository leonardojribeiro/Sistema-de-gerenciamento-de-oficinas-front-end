import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import { Select, FormControl, InputLabel, FormHelperText, SelectProps } from '@material-ui/core';
import useField from '../../Hooks/useField';


interface SelectFieldProps extends SelectProps {
  name: string;
}

interface SelectRef {
  value: any | any[] | undefined;
}

const SelectField: React.FC<SelectFieldProps> = ({ name, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<SelectRef['value']>(props.multiple ? [] : '');
  const [aberto, setAberto] = useState(false);
  const ref = useRef<SelectRef>({} as SelectRef);
  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (!props.required) {
      return true;
    }
    if (ref.current && ref.current.value !== '' && ref.current.value !== undefined) {
      setValid(true);
      return (true);
    }
    else {
      if (ref) {
        setAberto(true);
      }
      setValid(false);
      return (false);
    }
  }, [props.required]);

  const setFieldValue = useCallback((ref, value) => {
    setValue(value);
    if (ref.current) {
      ref.current.value = value;
    }
  }, [])

  const clear = useCallback(() => {
    setValue('');
    ref.current.value = '';
    setValid(true);
  }, [])

  useEffect(() => {
    registerField({
      validate,
      setFieldValue,
      ref: ref.current,
      name: fieldName,
      path: "value",
      clear
    });
  }, [clear, fieldName, registerField, setFieldValue, validate]);

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setValue(defaultValue);
      ref.current.value = defaultValue;
    }
  }, [defaultValue, fieldName]);

  const handleChange = useCallback((event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
  }>, child: React.ReactNode) => {
    setValue(event.target.value);
    ref.current.value = event.target.value;
    setAberto(false);
    if (!valid) {
      validate();
    }
    if (props.onChange) {
      props.onChange(event, child);
    }
  }, [props, validate, valid])

  const manipularFechamento = useCallback(() => {
    setAberto(false);
  }, [])

  const manipularAbertura = useCallback(() => {
    setAberto(true);
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel error={!valid} required={props.required}>{props.label}</InputLabel>
      <Select
        {...props}
        open={aberto}
        onClose={manipularFechamento}
        onOpen={manipularAbertura}
        error={!valid}
        onChange={handleChange}
        value={value}
        fullWidth
      >
        {props.children}
      </Select>
      {
        !valid &&
        <FormHelperText error={!valid}>{
          props.required
          && !value
          && !valid
          && "Campo obrigatório."}
        </FormHelperText>
      }
    </FormControl>
  );
}

export default memo(SelectField);