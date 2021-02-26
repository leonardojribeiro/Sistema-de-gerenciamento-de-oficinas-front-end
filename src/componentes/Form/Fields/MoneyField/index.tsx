import React, { useState, useCallback, useRef, memo } from 'react';
import TextFieldMUI, { StandardTextFieldProps as TextFieldPropsMUI } from '@material-ui/core/TextField';
import { useEffect } from 'react';
import useField from '../../Hooks/useField';

interface TextFieldProps extends TextFieldPropsMUI {
  name: string,
  min?: number;
  max?: number;
}

const MoneyField: React.FC<TextFieldProps> = ({ name, min, max, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("0,00");
  const ref = useRef<HTMLInputElement | undefined>(undefined);
  const { registerField, fieldName, defaultValue } = useField(name);
  const invalidReason = useRef<"less" | "bigger" | undefined>(undefined);

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
    let decimals = value.replace(/[^\d]/g, "") as string;
    if (decimals.length) {
      decimals = decimals.substring(0, decimals.length - 2) + "." + decimals.substring(decimals.length - 2);
    }
    return Number(decimals);
  }, []);

  const validateNumberValue = useCallback((numberValue: Number) => {
    if (min !== undefined && max !== undefined) {
      if (numberValue >= min && numberValue <= max) {
        setValid(true);
        return true
      }
      else {
        if (numberValue < min) {
          invalidReason.current = 'less';
        }
        else {
          invalidReason.current = 'bigger';
        }
        setValid(false);
        return false;
      }
    }
    if (min !== undefined) {
      if (numberValue < min) {
        invalidReason.current = 'less';
        setValid(false);
        return false;
      }
      setValid(true);
      return true
    }
    if (max !== undefined) {
      if (numberValue > max) {
        invalidReason.current = 'bigger';
        setValid(false);
        return false;
      }
      setValid(true);
      return true;
    }
    return true;
  }, [max, min]);

  const validate = useCallback(() => {
    if (ref.current) {
      console.log(ref.current.value, convertToNumber(ref.current.value))
      if (!validateNumberValue(convertToNumber(ref.current.value))) {
        ref.current.focus();
        return (false);
      }
      return true;
    }
    else {
      throw new Error("");
    }
  }, [convertToNumber, validateNumberValue]);

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, [])


  const setFieldValue = useCallback((ref, value) => {
    setValue(convertToLocaleString(convertToNumber(convertToLocaleString(Number(value)))));
    if (ref.current) {
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
    validateNumberValue(convertToNumber(value));
    setValue(convertToLocaleString(convertToNumber(value)));
    if (props.onChange) {
      props.onChange(event);
    }
  }, [convertToLocaleString, convertToNumber, props, validateNumberValue]);

  const helperText = useCallback(() => {
    if (!valid) {
      switch (invalidReason.current) {
        case 'bigger': {
          return "Valor deve ser menor do que o valor máximo.";
        }
        case 'less': {
          return "Valor deve ser maior do que o valor mínimo."
        }
      }
    }
    return ""
  }, [valid]);

  return (
    <TextFieldMUI
      type="number"
      {...props}
      onChange={handleChange}
      value={value}
      error={!valid}
      inputRef={ref}
      helperText={helperText()}
    />
  );
}

export default memo(MoneyField);