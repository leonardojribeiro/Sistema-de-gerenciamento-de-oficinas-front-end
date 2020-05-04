import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@material-ui/core';
import CampoTexto from './CampoTexto';
import GoogleMaps from './GoogleMaps';


export default function FormEndereco({ dadosEndereco }) {
  const { endereco, setEndereco } = dadosEndereco;

  const { logradouro, bairro, numero, cep, complemento, cidade, estado, latitude, longitude } = endereco;

  const onChangeLogradouro = e => {
    setEndereco({
      ...endereco,
      logradouro: e.target.value
    });
  }

  const onChangeBairro = e => {
    setEndereco({
      ...endereco,
      bairro: e.target.value
    });
  }

  const onChangeNumero = e => {
    setEndereco({
      ...endereco,
      numero: e.target.value
    });
  }

  const onChangeCep = e => {
    setEndereco({
      ...endereco,
      cep: e.target.value
    });
  }

  const onChangeComplemento = e => {
    setEndereco({
      ...endereco,
      complemento: e.target.value
    });
  }

  const onChangeCidade = e => {
    setEndereco({
      ...endereco,
      cidade: e.target.value
    });
  }

  const onChangeEstado = e => {
    setEndereco({
      ...endereco,
      estado: e.target.value
    });
  }

  const onChangeLatitude = e => {
    setEndereco({
      ...endereco,
      latitude: e.target.value
    });
  }

  const onChangeLongitude = e => {
    setEndereco({
      ...endereco,
      longitude: e.target.value
    });
  }

  const onChangeMapa = (a,b,event) =>{
    setEndereco({
      ...endereco,
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    });
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid lg={8} item>
        <Grid container >
          <Grid xs={12} md={6} item>
            <CampoTexto fullWidth label="Logradouro" onChange={onChangeLogradouro} value={logradouro} />
          </Grid>
          <Grid xs={12} md={6} item>
            <CampoTexto fullWidth label="Bairro" onChange={onChangeBairro} value={bairro} />
          </Grid>
          <Grid xs={6} sm={6} md={3} item>
            <CampoTexto fullWidth label="Número" onChange={onChangeNumero} value={numero} />
          </Grid>
          <Grid xs={6} md={3} item>
            <CampoTexto fullWidth label="CEP" onChange={onChangeCep} value={cep} />
          </Grid>
          <Grid xs={12}  md={6} item>
            <CampoTexto fullWidth label="Complemento" onChange={onChangeComplemento} value={complemento} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Cidade" onChange={onChangeCidade} value={cidade} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Estado" onChange={onChangeEstado} value={estado} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Latitude" onChange={onChangeLatitude} value={latitude} type="number"/>
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Longitude" onChange={onChangeLongitude} value={longitude} type="number" />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} lg={4} sm={12} item>
        <Box p={2}>
          <GoogleMaps
            initialCenter={{lat:latitude, lng:longitude}}
            onClick={onChangeMapa}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
