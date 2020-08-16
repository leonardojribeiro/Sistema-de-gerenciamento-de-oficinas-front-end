import { useContext, useEffect, useMemo } from 'react';

import dot from 'dot-object';
import FormContext from '../Context/FormContext';

export default function useField(name: string) {
  const {
    initialData,
    nodePath,
    unregisterField,
    registerField,
    handleSubmit,
  } = useContext(FormContext);

  if (!name) {
    throw new Error("Você precisa fornecer a propriedade nome");
  }

  const fieldName = useMemo(() => {
    return nodePath ? `${nodePath}.${name}` : name;
  }, [name, nodePath]);

  const defaultValue = useMemo(() => {
    return dot.pick(fieldName, initialData);
  }, [fieldName, initialData]);

  useEffect(() =>
    () => unregisterField(fieldName),
    [fieldName, unregisterField,]);

  return {
    fieldName,
    registerField,
    defaultValue,
    handleSubmit
  };
}