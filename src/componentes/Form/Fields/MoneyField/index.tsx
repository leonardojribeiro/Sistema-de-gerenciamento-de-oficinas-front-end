import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField as TextFieldMUI, StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core';
import { useEffect } from 'react';
import useField from '../../Hooks/useField';

interface TextFieldProps extends TextFieldPropsMUI {
  name: string,
}

const MoneyField: React.FC<TextFieldProps> = ({ name, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("0,00");
  const ref = useRef<HTMLInputElement | undefined>(undefined);
  const { registerField, fieldName, defaultValue } = useField(name);

  const convertToLocaleString = useCallback((value: number) => {
    return value.toLocaleString(
      'pt-br',
      {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }
    );
  }, []);

  const convertToNumber = useCallback((value: string) => {
    let valueNumeric = value.replace(/[^\d]/g, "") as string;
    if (valueNumeric.length) {
      valueNumeric = valueNumeric.substring(0, valueNumeric.length - 2) + "." + valueNumeric.substring(valueNumeric.length - 2);
    }
    return Number(valueNumeric);
  }, []);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (!props.required) {
        return true;
      }
      if (convertToNumber(ref.current.value)) {
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
  }, [convertToNumber, props.required]);

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, [])


  const setFieldValue = useCallback((ref, value) => {
    setValue(convertToLocaleString(convertToNumber(convertToLocaleString(Number(value)))));
    if (ref.current){
      ref.current.value = convertToLocaleString(convertToNumber(convertToLocaleString(Number(value))));
    }
  }, [convertToLocaleString, convertToNumber])


  const getValue = useCallback((ref: HTMLInputElement) => {
    if (ref) {
      return convertToNumber(ref.value);
    }
    return 0;
  }, [convertToNumber]);

  useEffect(() => {
    registerField({
      validate,
      setFieldValue,
      ref: ref.current,
      name: fieldName,
      getValue,
      clear,
    });
  }, [clear, fieldName, getValue, registerField, setFieldValue, validate]);

  useEffect(() => {
    if (defaultValue) {
      setValue(convertToLocaleString(Number(defaultValue)));
    }
  }, [convertToLocaleString, defaultValue]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = event.target.value;
    setValue(convertToLocaleString(convertToNumber(value)));
    if (!valid) {
      validate();
    }
    if (props.onChange) {
      props.onChange(event);
    }
  }, [convertToLocaleString, convertToNumber, props, valid, validate]);

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
        && !Number(ref.current.value)
        && !valid
        && "Campo obrigatório."
      }
    />
  );
}

export default memo(MoneyField);