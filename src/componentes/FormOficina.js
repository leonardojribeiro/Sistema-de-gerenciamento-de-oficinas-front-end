import React, { useState } from 'react';
import { Grid, Hidden, Box } from '@material-ui/core';
import CampoTexto from './CampoTexto';
import DragAndDrop from './DragAndDrop';
import SeletorImagem from './SeletorImagem';
import mascara from '../recursos/MascaraNumerica';

export default function FormOficina({ dadosOficina }) {
  const { oficina, setOficina } = dadosOficina;
  const { nomeFantasia, razaoSocial, cpfCnpj, telefoneFixo, telefoneCelular, urlLogomarca } = oficina

  const onChangeNomeFantasia = e => {
    setOficina({
      ...oficina,
      nomeFantasia: e.target.value
    });
  }

  const onChangeRazaoSocial = e => {
    setOficina({
      ...oficina,
      razaoSocial: e.target.value
    });
  }

  const onChangeCpfCnpj = e => {
    setOficina({
      ...oficina,
      cpfCnpj: mascara(
        e.target.value,
        tamanho => {
          return tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
            ? "000.000.000-00"
            : "00.000.000/0000-00"
        }
      )
    });
  }

  const onChangeTelefoneFixo = e => {
    setOficina({
      ...oficina,
      telefoneFixo: mascara(
        e.target.value,
        tamanho => {
          return tamanho < 11
            ? "(00) 0000-0000"
            : "(00) 00000-0000"
        }
      )
    });
  }

  const onChangeTelefoneCelular = e => {
    setOficina({
      ...oficina,
      telefoneCelular: mascara(
        e.target.value,
        tamanho => {
          return tamanho < 11
            ? "(00) 0000-0000"
            : "(00) 00000-0000"
        }
      )
    });
  }

  const onChangeImagem = imagem => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOficina({
        ...oficina,
        urlLogomarca: reader.result
      });
    }
    if (imagem[0]) {
      reader.readAsDataURL(imagem[0]);
      setOficina({
        ...oficina,
        logomarca: imagem[0]
      });
    }
    else {
      setOficina({
        ...oficina,
        logomarca: null,
        urlLogomarca: ""
      });
    }
  };

  return (
    <Grid container>
      <Grid item lg={8}>
        <Grid container justify="center" alignItems="center">
          <Grid xs={12} sm={12} md={6} item>
            <CampoTexto label="Nome Fantasia / Nome" onChange={onChangeNomeFantasia} value={nomeFantasia} />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <CampoTexto label="Razão Social" onChange={onChangeRazaoSocial} value={razaoSocial} />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto label="CPF/CNPJ" onChange={onChangeCpfCnpj} value={cpfCnpj} />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto label="Telefone Fixo" onChange={onChangeTelefoneFixo} value={telefoneFixo} />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto label="Telefone Celular" onChange={onChangeTelefoneCelular} value={telefoneCelular} />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto label="E-mail"  />
          </Grid>
          <Grid xs={12} md={8} item>
            <CampoTexto label="Website"  />
          </Grid>
          <Hidden smUp>
            <SeletorImagem urlImagem={urlLogomarca} onChange={onChangeImagem} />
          </Hidden>
        </Grid>
      </Grid>
      <Hidden xsDown>
          <Grid xs={12} lg={4} item>
            <Box mt={2} p={2} display="flex" justifyContent="center">
              <DragAndDrop urlImagem={urlLogomarca} onChange={onChangeImagem} />
            </Box>
          </Grid>
        </Hidden>
    </Grid>
  );
}
