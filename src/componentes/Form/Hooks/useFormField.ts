import dot from "dot-object";
import { Ref, useCallback, useEffect, useRef, useState } from "react";
import { Field } from "../types";
import useField from "./useField";

interface UseFormFieldProps {
  name: string,
  validacao: (value: string) => boolean,
  getMask?: (value: string) => string,
  noValidate?: boolean,
  required?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  getUnmask?: (value: string) => string,
}

export default function useFormField<T>({ name, validacao, getMask, getUnmask, noValidate, onChange, required }: UseFormFieldProps) {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);
  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (noValidate) {
        return true;
      }
      if (!required && !ref.current.value.length) {
        return true; //retorna verdadeiro quando não é obrigatório e não tem nenhum valor
      }
      if (validacao(ref.current.value)) {
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
  }, [noValidate, required, validacao]);

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, [])

  const setFieldValue = useCallback((ref, value) => {
    setValue(value as string);
    if (ref.current) {
      ref.current.value = value;
    }
  }, []);

  const getValue = useCallback((ref: Ref<Field>) => {
    return getUnmask ? getUnmask(dot.pick("value", ref)) : dot.pick("value", ref);
  }, [getUnmask]);

  useEffect(() => {
    registerField({
      validate,
      ref: ref.current,
      name: fieldName,
      clear,
      setFieldValue,
      getValue
    });
  }, [clear, fieldName, getValue, registerField, setFieldValue, validate]);

  useEffect(() => {
    if (defaultValue) {
      setValue(getMask ? getMask(defaultValue) : defaultValue);
    }
  }, [defaultValue, getMask])

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = getMask ? getMask(event.target.value) : event.target.value;
    setValue(value);
    if (!valid) {
      validate();
    }
    if (onChange) {
      event.target.value = value;
      onChange(event)
    }
  }, [getMask, onChange, valid, validate])

  return {
    handleInputChange,
    value,
    valid,
    ref,
  }
}