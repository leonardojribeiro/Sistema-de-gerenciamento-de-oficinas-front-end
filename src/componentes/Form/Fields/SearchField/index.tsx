import React, { useRef, useEffect, memo } from 'react';
import { TextField, StandardTextFieldProps as TextFieldPropsMUI, InputAdornment, IconButton, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useField from '../../Hooks/useField';

interface SearchFieldProps extends TextFieldPropsMUI {
  name: string,
  disableButtonSearch?: boolean;
  maxLength?: Number;
}

const SearchField: React.FC<SearchFieldProps> = ({ name, disableButtonSearch, maxLength, ...props }) => {
  const ref = useRef();
  const { registerField, fieldName } = useField(name);

  useEffect(() => {
    registerField({
      ref: ref.current,
      name: fieldName,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <TextField
      {
      ...props
      }
      inputRef={ref}
      inputProps={{
        maxLength,
      }}
      InputProps={{
        endAdornment: !disableButtonSearch && (
          <InputAdornment position="end">
            <Tooltip title="Buscar">
              <IconButton type="submit" >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }} />
  );
}


export default memo(SearchField);