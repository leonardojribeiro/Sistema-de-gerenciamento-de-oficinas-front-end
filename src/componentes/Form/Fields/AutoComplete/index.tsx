import React, { useCallback, useRef, useEffect, useState, } from 'react';
import { Autocomplete, AutocompleteProps, AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab';
import useField from '../../Hooks/useField';
import dot from 'dot-object';
import { TextField } from '@material-ui/core';


interface ComboBoxProps<T> extends Omit<AutocompleteProps<T, boolean | undefined, false, false>, 'renderInput'> {
  name: string;
  path: string;
  label: string;
  required?: boolean;
  getDefaultValue?: (value: T) => Promise<T>;
}

function AutoComplete<T>({ getDefaultValue, path, name, label, required, onChange, ...props }: ComboBoxProps<T>): JSX.Element {
  const [value, setValue] = useState<T | T[] | null>(props.multiple ? [] : null);
  const [valid, setValid] = useState(true);
  const ref = useRef<any>();
  const valueSelected = useRef<any>(null);
  const { fieldName, registerField, defaultValue } = useField(name);

  const getValue = useCallback((ref) => {
    if (ref.current) {
      if (props.multiple) {
        return ref.current.map((value: any) => dot.pick(path, value))
      }
      else {
        return dot.pick(`current${path.length ? `.${path}` : ""}`, ref);
      }
    }
    return "";

  }, [path, props.multiple]);

  const validate = useCallback(() => {
    if (!required) {
      return true;
    }
    if (required) {
      if (props.multiple) {
        if (valueSelected.current.length) {
          setValid(true);
          return true;
        }
      }
      else {
        if (dot.pick(`current${path.length ? `.${path}` : ""}`, valueSelected)) {
          setValid(true);
          return true;
        }
      }
      setValid(false);
      return false;
    }
    else {
      if (ref) {
        ref.current.focus();
      }
      setValid(false);
      return false;
    }
  }, [path, props.multiple, required])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: valueSelected,
      getValue,
      validate,
    })
  }, [fieldName, getValue, path, registerField, validate]);

  const fill = useCallback(async () => {
    let value;
    if (getDefaultValue && defaultValue && !valueSelected.current && props.options?.length > 0) {
      if (props.multiple) {
        Promise.all(defaultValue.map(async (defaultValue: any) =>
          await getDefaultValue(defaultValue)
        )).then(values => {
          valueSelected.current = values;
          setValue(values as T[]);
        });
      }
      else {
        value = await getDefaultValue(defaultValue);
        if (value) {
          valueSelected.current = value;
          setValue(value);
        }
      }
    }
  }, [defaultValue, getDefaultValue, props.multiple, props.options]);

  useEffect(() => {
    fill()
  }, [fill]);

  const handleChange = useCallback((event: React.ChangeEvent<{}>, value: T | T[] | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => {
    valueSelected.current = value;
    setValue(value)
    if (onChange) {
      onChange(event, value, reason, details);
    }
  }, [onChange]);

  return (
    <Autocomplete
      fullWidth
      onChange={handleChange}
      value={value}
      openOnFocus
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={!valid}
          helperText={!valid && "Campo obrigatório"}
          inputRef={ref}
          InputProps={{
            ...params.InputProps
          }}
        />
      )}
      {...props}
    />

  );
}

export default AutoComplete;