import React, { useCallback, useRef, useEffect, memo, useState, } from 'react';
import { Autocomplete, AutocompleteProps, AutocompleteChangeDetails, AutocompleteChangeReason } from '@material-ui/lab';
import useField from '../../Hooks/useField';
import dot from 'dot-object';
import { TextField } from '@material-ui/core';

interface ComboBoxProps<T> extends Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
  name: string;
  path: string;
  label: string;
  required?: boolean;
  getDefaultValue?: (value: T,) => Promise<T>;
}

const ComboBox: React.FC<ComboBoxProps<any>> =
  ({ getDefaultValue, path, name, label, required, onChange, ...props }) => {
    const [value, setValue] = useState<any>(null);
    const [valid, setValid] = useState(true);
    const ref = useRef<any>();
    const valueSelected = useRef<any>(null);
    const { fieldName, registerField, defaultValue } = useField(name);

    const getValue = useCallback((ref) => {
      return ref.current ? dot.pick(path, ref) ? dot.pick(path, ref) : "" : "";
    }, [path]);

    const validate = useCallback(() => {
      if (!required) {
        return true;
      }
      if (required && dot.pick(path, valueSelected)) {
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
    }, [path, required])

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: valueSelected,
        getValue,
        validate,
      })
    }, [fieldName, getValue, path, registerField, validate]);

    const fill = useCallback(async () => {
      if (getDefaultValue && defaultValue && !valueSelected.current && props.options?.length > 0) {
        const value = await getDefaultValue(defaultValue);
        if (value) {
          valueSelected.current = value;
          setValue(value);
        }
      }
    }, [defaultValue, getDefaultValue, props.options]);

    useEffect(() => {
      fill()
    }, [fill]);

    const handleChange = useCallback((event: React.ChangeEvent<{}>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => {
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

export default memo(ComboBox);