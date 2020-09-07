import React, { useCallback, useRef, useEffect, memo, useState, } from 'react';
import { Autocomplete, AutocompleteProps, AutocompleteChangeDetails, AutocompleteChangeReason, AutocompleteInputChangeReason, } from '@material-ui/lab';
import useField from '../../Hooks/useField';
import dot from 'dot-object';

interface ComboBoxProps<T> extends AutocompleteProps<T, false, false, false> {
  name: string;
  path: string;
  getOptions: () => Promise<any[]>;
  getMoreOptions?: (search: string) => Promise<any[]>;
  getDefaultValue?: (value: any) => Promise<any>;
}

const ComboBox: React.FC<ComboBoxProps<any>> =
  ({ options: defaultOptions, getOptions, getMoreOptions, getDefaultValue, path, name, onChange, onInputChange, ...props }) => {
    const [options, setOptions] = useState<any>(defaultOptions);
    const [value, setValue] = useState<any>(null);
    const valueSelected = useRef<any>({});
    const { fieldName, registerField, defaultValue } = useField(name);

    const getValue = useCallback((ref) => {
      return ref.current ? dot.pick(path, ref) ? dot.pick(path, ref) : "" : "";
    }, [path]);

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: valueSelected,
        getValue,
      })
    }, [fieldName, getValue, path, registerField]);

    useEffect(() => {
      const get = async () => {
        const options = await getOptions();
        setOptions(options)
      }
      get();
    }, [getMoreOptions, getOptions]);

    useEffect(() => {
      const get = async () => {
        if (getDefaultValue && defaultValue) {
          const value = await getDefaultValue(defaultValue);
          if (value) {
            setOptions((options: any[]) => [...options, value]);
            setValue(value);
          }
        }
      }
      get();
    }, [defaultValue, getDefaultValue])

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
        {...props}
      />
    );
  }

export default memo(ComboBox);