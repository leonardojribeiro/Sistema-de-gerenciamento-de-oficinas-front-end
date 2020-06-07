import React, { useState, memo, useCallback, useMemo, useRef } from 'react';
import { Box, Grid, Hidden, makeStyles, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import CampoTexto from '../../componentes/CampoTexto';
import DragAndDrop from '../../componentes/DragAndDrop';
import Button from "../../componentes/Button";
import SeletorImagem from '../../componentes/SeletorImagem';
import MascaraNumererica from '../../recursos/MascaraNumerica';
import validacao from '../../recursos/Validacao';
import GoogleMaps from '../../componentes/GoogleMaps';

const useStyles = makeStyles({
  
});

function FormEndereco({ onSubmit, dadosEndereco, ...props }) {
  //estados que irão cotrolar os campos de texto
  

  return formEndereco;
};
export default memo(FormEndereco);