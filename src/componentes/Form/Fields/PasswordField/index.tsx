import React, { useState, useCallback, useRef, memo } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip, StandardTextFieldProps } from '@material-ui/core';
import { useEffect } from 'react';
import useField from '../../Hooks/useField';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

interface PasswordField extends StandardTextFieldProps {
  name: string,
}

const CampoDeSenha: React.FC<PasswordField> = ({ name, ...props }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLInputElement | undefined>(undefined);

  const { registerField, fieldName, defaultValue } = useField(name);

  const validate = useCallback(() => {
    if(ref && ref.current){
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
    else{
      throw new Error("");
    } 
  }, [props.required]);

  const clear = useCallback(() => {
    setValue("");
    setValid(true);
  }, [])

  useEffect(() => {
    registerField({
      validate,
      ref: ref.current,
      name: fieldName,
      path: "value",
      clear,
    });
  }, [clear, fieldName, registerField, validate]);

  const handleChange = useCallback((event) => {
    setValue(event.target.value);
    if (!valid) {
      validate();
    }
  }, [validate, valid])

  const handleClick = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <TextField
      {...props}
      onChange={handleChange}
      error={!valid}
      inputRef={ref}
      value={value}
      autoComplete="current-password"
      defaultValue={defaultValue}
      helperText={
        ref.current &&
        props.required
        && !valid
        && "Campo obrigatório."
      }
      type={visible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title={visible ? "Esconder senha" : "Exibir senha"}>
              <IconButton onClick={handleClick}>
                {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default memo(CampoDeSenha);