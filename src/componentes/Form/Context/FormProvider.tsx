import React, {useRef, useImperativeHandle, FormEvent, RefForwardingComponent, forwardRef, memo, useCallback } from "react";
import dot from 'dot-object';
import { Field, FormProviderHandles, FormProviderProps } from "../types";
import FormContext from "./FormContext";

const FormProvider: RefForwardingComponent<FormProviderHandles, FormProviderProps> = (
  { initialData, clearOnSubmit, onSubmit, children },
  formRef
) => {
  const fields = useRef<Field[]>([]);

  function registerField(field: Field) {
    fields.current.push(field);
  }

  function unregisterField(fieldName: string) {
    const indexField = fields.current.findIndex(
      field => field.name === fieldName,
    );
    if (indexField > -1) {
      fields.current.splice(indexField, 1);
    }
  }

  function validate() {
    for (let field of fields.current) {
      if (field.validate && field.validate() === false) {
        return false;
      }
    }
    return true;
  }

  function getFieldValue({ ref, getValue, path }: Field) {
    if (getValue) {
      return getValue(ref);
    }
    return path && dot.pick(path, ref);
  }

  const setFieldValue = useCallback( ({ path, ref, setFieldValue }: Field, value: any) => {
      if (setFieldValue) {
        return setFieldValue(ref, value);
      }
      return path ? dot.set(path, value, ref as object) : false;
    },
    [],
  );

  const parseData = useCallback(() => {
    const data: {[index: string]:any} = {};
    
    fields.current.forEach((field) => {
      data[field.name] = getFieldValue(field);
    });

    dot.object(data);
    return data;
  },[])

  function clear() {
    fields.current.forEach(campo => {
      if (campo.clear) {
        campo.clear();
      }
    })
  }

  const getFieldByName = useCallback(
    fieldName =>
      fields.current.find(unformField => unformField.name === fieldName),
    [],
  );

  function handleSubmit(evento?: FormEvent) {
    if (evento) {
      evento.preventDefault();
    }
    if (!validate()) {
      return null;
    }
    const data = parseData()
    if (clearOnSubmit) {
      clear()
    }
    onSubmit(data, evento);
  }

  useImperativeHandle<{}, FormProviderHandles>(formRef, () => ({
    validate,
    parseData,
    getFieldValue(fieldName) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return getFieldValue(field);
    },
    setFieldValue(fieldName, value) {
      const field = getFieldByName(fieldName);

      if (!field) {
        return false;
      }

      return setFieldValue(field, value);
    }, 
    submitForm() {
      handleSubmit();
    },
    clear
  }));

  return (
    <FormContext.Provider
      value={{
        initialData,
        registerField,
        unregisterField,
        nodePath: '',
        handleSubmit,
        clear
      }}
    >
      {children}
    </FormContext.Provider>
  );

};

export default memo(forwardRef(FormProvider));

