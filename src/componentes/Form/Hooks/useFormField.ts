import { useCallback, useEffect, useRef, useState } from "react";
import useField from "../Hooks/useField";

export default function useFormField<T>(
  name: string,
  validacao: (value: string) => boolean,
  getMask?: (value: string) => string,
  noValidate?: boolean,
  required?: boolean,
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
) {
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
  }, [getMask, onChange, validate, valid])

  return {
    handleInputChange,
    value,
    valid,
    ref,
  }
}