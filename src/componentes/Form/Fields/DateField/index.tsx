import React, { memo, useRef, useCallback, useEffect, useState } from 'react';
import useField from '../../Hooks/useField';
import { DatePicker, BaseDatePickerProps} from '@material-ui/pickers';

interface DateFieldProps extends BaseDatePickerProps {
  name: string,
  required?: boolean;
  label?: string;
  fullWidth?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({ name, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState<Date>(new Date());
  const ref = useRef<HTMLInputElement | undefined>(undefined);
  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if (ref && ref.current) {
      if (!props.required && !ref.current.value.length) {
        return true;
      }
      if (ref.current.value.length) {
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
  }, [props.required]);

  const clear = useCallback(() => {
    setValue(new Date());
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
      setValue(defaultValue.split('T')[0]);
    }
  }, [defaultValue]);

  const handleChange = useCallback((evento) => {
    console.log(ref.current && ref.current.value.toString())
    if (!valid) {
      validate();
    }
    setValue(evento);
  }, [validate, valid]);

  return (
    <DatePicker
      value={value}
      inputRef={ref}
      onChange={handleChange}
      format="dd/MM/yyyy"
      lang="pt"
      {
        ...props
      }
    />
  );
}

export default memo(DateField);