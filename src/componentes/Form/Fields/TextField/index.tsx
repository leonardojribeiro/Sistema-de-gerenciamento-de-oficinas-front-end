import React, { useState, useCallback, useRef, memo, ChangeEvent } from 'react';
import { TextField as TextFieldMUI, StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core';
import { useEffect } from 'react';
import useField from '../../Hooks/useField';

interface TextFieldProps extends TextFieldPropsMUI {
  name: string;
  noValidate?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({ name, onChange, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);

  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if(props.noValidate){
        return true;
      }
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
  }, [props.noValidate, props.required]);

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, []);

  const setFieldValue = useCallback((ref, value) => {
    setValue(value as string);
    if (ref.current) {
      ref.current.value = value;
    }
  }, []);

  useEffect(() => {
    registerField({
      validate,
      ref: ref.current,
      name: fieldName,
      setFieldValue,
      path: "value",
      clear,
    });
  }, [clear, fieldName, registerField, setFieldValue, validate]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValue(value)
    if (!valid) {
      validate();
    }
    if (onChange) {
      onChange(event);
    }
  }, [onChange, valid, validate]);

  return (
    <TextFieldMUI
      {...props}
      onChange={handleChange}
      value={value}
      error={!valid}
      inputRef={ref}
      helperText={
        ref.current &&
        props.required
        && !ref.current.value.length
        && !valid
        && "Campo obrigatório."
      }
    />
  );
}

export default memo(TextField);