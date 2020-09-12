import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormHelperText, RadioGroupProps } from '@material-ui/core';
import useField from '../../Hooks/useField';

interface RadioFieldProps extends RadioGroupProps {
  name: string;
  label: string;
  required: boolean;
  children: React.ReactNode;
}

interface RadioRef {
  value: any ;
}

const RadioField: React.FC<RadioFieldProps> = ({ name, required, label, children, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<RadioRef['value']>('');
  const ref = useRef<RadioRef>({} as RadioRef);
  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (!required) {
      return true;
    }
    if (ref.current.value) {
      setValid(true);
      return (true);
    }
    else {
      setValid(false);
      return (false);
    }
  }, [required]);

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, []);

  const setFieldValue = useCallback((ref, value) => {
    setValue(value);
    ref.current.value = value;
  }, []);

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
    if (defaultValue) {
      setValue(defaultValue);
      ref.current.value = defaultValue;
    }
  }, [defaultValue]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setValue(value);
    ref.current.value = value;
    if (!valid) {
      validate();
    }
    if(props.onChange){
      props.onChange(event, value);
    }
  }, [valid, props, validate]);

  return (
    <FormControl component="fieldset">
      <FormLabel error={!valid} >{label}</FormLabel>
      <RadioGroup row value={value} onChange={handleChange}>
        {children}
      </RadioGroup>
      <FormHelperText error={!valid}>{
        required
        && !value
        && !valid
        && "Escolha uma opção."}
      </FormHelperText>
    </FormControl>
  );
}

export default memo(RadioField);