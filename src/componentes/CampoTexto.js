import React from 'react';
import { TextField, Box, makeStyles } from '@material-ui/core';
import { Component } from 'react';

import CampoTextoHoook from './CampoTextohook';




export default class CampoTexto extends Component {


  render() {
    return <CampoTextoHoook {...this.props}/>
  }
}
