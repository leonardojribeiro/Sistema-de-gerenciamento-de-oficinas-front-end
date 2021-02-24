import React, { useRef, useEffect, memo } from 'react';
import TextField, { StandardTextFieldProps as TextFieldPropsMUI } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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