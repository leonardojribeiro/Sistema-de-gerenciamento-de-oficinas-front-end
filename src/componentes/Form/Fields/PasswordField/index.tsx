import React, { useState, useCallback,  memo } from 'react';
import { TextField, InputAdornment, IconButton, Tooltip, StandardTextFieldProps } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import useFormField from '../../Hooks/useFormField';

interface PasswordField extends StandardTextFieldProps {
  name: string,
}

const CampoDeSenha: React.FC<PasswordField> = ({ name, ...props }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { handleInputChange, ref, valid, value } = useFormField(name, (password) => password.length > 0 , undefined, false, props.required, props.onChange);

  const handleClick = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <TextField
      {...props}
      onChange={handleInputChange}
      error={!valid}
      inputRef={ref}
      value={value}
      autoComplete="current-password"
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