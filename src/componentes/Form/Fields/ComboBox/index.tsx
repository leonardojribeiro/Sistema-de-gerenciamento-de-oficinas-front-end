import React, { useCallback, useRef, useEffect, memo, useState, } from 'react';
import { Autocomplete, AutocompleteProps, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, } from '@material-ui/lab';
import useField from '../../Hooks/useField';
import dot from 'dot-object';
import { TextField, CircularProgress } from '@material-ui/core';

interface ComboBoxProps<T> extends Omit<AutocompleteProps<T, false, false, false>, 'renderInput'> {
  name: string;
  path: string;
  label: string;
  required?: boolean;
  getOptions: () => Promise<any[]>;
  getMoreOptions?: (search: string) => Promise<any[]>;
  getDefaultValue?: (value: any,) => Promise<any>;
  getDefaultValueInOptions?: (value: any, options: any) => boolean;

}

const ComboBox: React.FC<ComboBoxProps<any>> =
  ({ options: defaultOptions, getOptions, getMoreOptions, getDefaultValue, getDefaultValueInOptions, path, name, label, required, onChange, onInputChange, ...props }) => {
    const [options, setOptions] = useState<any>(defaultOptions);
    const [value, setValue] = useState<any>(null);
    const [valid, setValid] = useState(true);
    const ref = useRef<any>();
    const valueSelected = useRef<any>({});
    const { fieldName, registerField, defaultValue } = useField(name);
    const filled = useRef(false);

    const getValue = useCallback((ref) => {
      return ref.current ? dot.pick(path, ref) ? dot.pick(path, ref) : "" : "";
    }, [path]);

    const validate = useCallback(() => {
      if (valueSelected.current) {
        if (!required) {
          return true;
        }
        if (required && !dot.pick(path, valueSelected)) {
          setValid(true);
          return (true);
        }
        else {
          if (ref) {
            console.log(ref.current)
            ref.current.focus();
          }
          setValid(false);
          return (false);
        }
      }
      else {
        throw new Error("");
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

    useEffect(() => {
      const get = async () => {
        const options = await getOptions();
        setOptions(options)
      }
      get();
    }, [getMoreOptions, getOptions]);

    const fill = useCallback(async () => {
      if (getDefaultValue && defaultValue && !value && options.length && !filled.current) {
        let value: any;
        if (getDefaultValueInOptions) {
          options.forEach((option: any) => {
            if (getDefaultValueInOptions(defaultValue, option)) {
              value = option;
              return
            }
          })
          if (value) {
            setValue(value);
            filled.current = true;
          }
        }
        if (!value) {
          value = await getDefaultValue(defaultValue);
          if (value) {
            setOptions((options: any[]) => [...options, value]);
            setValue(value);
            filled.current = true;
          }
        }
      }
    }, [defaultValue, getDefaultValue, getDefaultValueInOptions, options, value, filled]);

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

    const handleInputChange = useCallback(async (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
      if (!Boolean(valueSelected.current) && value.length > 1 && getMoreOptions) {
        const options = await getMoreOptions(value);
        setOptions(options)
      }
      if (onInputChange) {
        onInputChange(event, value, reason,);
      }
    }, [getMoreOptions, onInputChange]);

    return (
      <Autocomplete
        fullWidth
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        value={value}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!valid}
            helperText={!valid && "Campo obrigatório"}
            inputRef={ref}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {options.length === 0 ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        {...props}
      />

    );
  }

export default memo(ComboBox);