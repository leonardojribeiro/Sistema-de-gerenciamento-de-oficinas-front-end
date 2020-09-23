import React, { useCallback, memo, } from 'react';
import { TextField as TextFieldMUI, StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core';
import useFormField from '../../Hooks/useFormField';

interface TextFieldProps extends TextFieldPropsMUI {
  name: string,
  min?: number;
  max?: number;
}

const NumberField: React.FC<TextFieldProps> = ({ name, max, min, ...props }) => {
  const validate = useCallback((value: string) => {
    if (min !== undefined && max !== undefined) {
      return Number(value) >= min && Number(value) <= max;
    }
    if (min !== undefined) {
      return Number(value) >= min;
    }
    if (max !== undefined) {
      return Number(value) <= max;
    }
    return false;
  }, [max, min])

  const { ref, handleInputChange, valid, value } = useFormField(name, validate, undefined, undefined, props.required, props.onChange)

  return (
    <TextFieldMUI
      {...props}
      onChange={handleInputChange}
      type="number"
      inputProps={{
        "min": min,
        "max": max
      }}
      value={value}
      error={!valid}
      inputRef={ref}
      helperText={
        ref.current &&
        props.required
        && !ref.current.value.length
        && !valid
        && "Campo obrigatório."
      }
    />
  );
}

export default memo(NumberField);