import { FormEvent } from "react";

export interface BaseField<T>{
  name: string;
  validate?: () => boolean;
  setFieldValue?: (ref: any, value: T) => void;
  ref?: any;
  clear?: () => void;
}

export interface PathField<T> extends BaseField<T>{
  path: string;
  getValue?: undefined;
}

export interface FunctionField<T> extends BaseField<T>{
  path?: undefined;
  getValue: (ref: any) => T;
}

export type Field<T = any> = PathField<T> | FunctionField<T>;

export interface FormProviderProps {
  initialData?: object;
  clearOnSubmit?: boolean;
  onSubmit: (data: object, event?: FormEvent) => void;
  children: React.ReactNode;
}

export interface FormProviderHandles {
  validate: () => boolean;
  parseData: () => object;
  submitForm: () => void;
  clear: () => void;
  setFieldValue(fieldName: string, value: any): void | boolean;
  getFieldValue(fieldName: string): any;
}

export interface FormContextValues {
  initialData?: object;
  registerField<T>(campo: Field<T>): void;
  unregisterField: (fieldName: string) => void;
  nodePath: string;
  handleSubmit: (evento?: React.FormEvent) => void;
  clear: () => void;
}

export interface FormProps{
  initialData?: object;
  onSubmit: (data: object, event?: FormEvent) => void;
  children: React.ReactNode;
}

