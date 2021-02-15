import React, { memo, useCallback, } from 'react';
import { TextField as TextFieldMUI, StandardTextFieldProps as TextFieldPropsMUI, } from '@material-ui/core';
import useFormField from '../../Hooks/useFormField';
import validacao from '../../../../recursos/Validacao';

interface TextFieldProps extends TextFieldPropsMUI {
  name: string;
  noValidate?: boolean;
  maxLength?: Number;
}

function PlacaField({ name, onChange, maxLength, ...props }: TextFieldProps): JSX.Element {

  const formatarPlaca = useCallback((placa: string) => {
    let formatado = placa.replace(/[^a-zA-Z0-9]/g, '').toLocaleUpperCase().substring(0, 7);
    if (placa.length > 3) {
      if (/\d/.test(formatado.charAt(3))) {
        const letrasAposNumero = formatado.substring(4).match(/[A-Z]/g)
        if (letrasAposNumero) {
          if (letrasAposNumero.length < 2) {
            const letrasAJAposNumero = formatado.substring(4).match(/[A-J]/g)
            if (letrasAJAposNumero) {
              if (formatado.length === 7 && !/\d/.test(formatado.charAt(6))) {
                return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
              }
              return formatado;
            }
            else {
              return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
            }
          }
          return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
        }
        else {
          return `${formatado.substring(0, 3)}-${formatado.substring(3)}`
        }
      }
      else {
        return formatado.substring(0, 3);
      }
    }
    else {
      const numeros = formatado.match(/[0-9]/g)
      if (numeros) {
        return '';
      }
    }
    return formatado
  }, [])

  const { handleInputChange, ref, valid, value } = useFormField({
    name,
    validacao: validacao.validarTexto,
    getMask: formatarPlaca,
    noValidate: props.noValidate,
    required: props.required,
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