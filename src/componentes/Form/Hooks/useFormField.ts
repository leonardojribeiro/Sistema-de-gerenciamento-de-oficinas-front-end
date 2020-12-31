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

export default function useFormField<T>(props: UseFormFieldProps) {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);
  const { registerField, fieldName, defaultValue } = useField(props.name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (props.noValidate) {
        return true;
      }
      if (!props.required && !ref.current.value.length) {
        return true; //retorna verdadeiro quando não é obrigatório e não tem nenhum valor
      }
      if (props.validacao(ref.current.value)) {
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
  }, [props]);

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
    return props.getUnmask ? props.getUnmask(dot.pick("value", ref)) : dot.pick("value", ref);
  }, [props]);

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
      setValue(props.getMask ? props.getMask(defaultValue) : defaultValue);
    }
  }, [defaultValue, props])

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = props.getMask ? props.getMask(event.target.value) : event.target.value;
    setValue(value);
    if (!valid) {
      validate();
    }
    if (props.onChange) {
      event.target.value = value;
      props.onChange(event)
    }
  }, [props, valid, validate])

  return {
    handleInputChange,
    value,
    valid,
    ref,
  }
}