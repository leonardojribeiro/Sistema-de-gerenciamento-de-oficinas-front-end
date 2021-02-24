import React, { memo,} from 'react';
import TextFieldMUI, { StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core/TextField';
import useFormField from '../../Hooks/useFormField';
import validacao from '../../../../recursos/Validacao';
import Formato from '../../../../recursos/Formato';

interface TextFieldProps extends TextFieldPropsMUI {
  name: string;
  noValidate?: boolean;
  maxLength?: Number;
}

function PlacaField({ name, onChange, maxLength, ...props }: TextFieldProps): JSX.Element {
  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validacao.validarTexto,
    getMask: Formato.formatarPlaca,
    noValidate: props.noValidate,
    required: props.required,
    getUnmask: value => value.replace(/[^a-zA-Z0-9]/, ""),
    onChange
  })

  return (
    <TextFieldMUI
      {...props}
      inputProps={{
        maxLength
      }}
      onChange={handleInputChange}
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

export default memo(PlacaField);