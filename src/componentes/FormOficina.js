import React, { useState } from 'react';
import { Grid, Hidden, Box } from '@material-ui/core';
import CampoTexto from './CampoTexto';
import DragAndDrop from './DragAndDrop';
import SeletorImagem from './SeletorImagem';

import mascara from '../recursos/MascaraNumerica';

export default function FormOficina({dadosOficina}) {
  const [urlLogomarca, setUrlLogomarca] = useState("");
  
  const onChangeDescricao = e => {
    dadosOficina.descricao.setDescricao(e.target.value);
  }

  const onChangeNomeFantasia = e => {
    dadosOficina.nomeFantasia.setNomeFantasia(e.target.value);
  }

  const onChangeCpfCnpj = e => {
    dadosOficina.cpfCnpj.setCpfCnpj(
      mascara(
        e.target.value,
        tamanho => {
          return tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
            ? "000.000.000-00"
            : "00.000.000/0000-00"
        }
      )
    );
  }

  const onChangeTelefone = e => {
    dadosOficina.telefone.setTelefone(
      mascara(
        e.target.value,
        tamanho => {
          return tamanho < 11
            ? "(00) 0000-0000"
            : "(00) 00000-0000"
        }
      )
    );
  }

  const onChangeCelular = e => {
    dadosOficina.celular.setCelular(
      mascara(
        e.target.value,
        tamanho => {
          return tamanho < 11 
            ? "(00) 0000-0000"
            : "(00) 00000-0000"
        }
      )
    );
  }

  const onChangeImagem = imagem => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUrlLogomarca(reader.result);
    }
    if (imagem[0]) {
      reader.readAsDataURL(imagem[0]);
      setUrlLogomarca(reader.result);
      dadosOficina.logomarca.setLogomarca(imagem[0]);
    }
    else {
      setUrlLogomarca("");
      dadosOficina.logomarca.setLogomarca(null);
    }
  };

  return (
    <Grid container>
      <Grid md={9} item>
        <Grid container>
          <Grid xs={12} sm={6} md={6} item>
            <CampoTexto
              label="Descrição"
              onChange={onChangeDescricao}
              value={dadosOficina.descricao.descricao}
            />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <CampoTexto
              label="Nome Fantasia"
              onChange={onChangeNomeFantasia}
              value={dadosOficina.nomeFantasia.nomeFantasia}
            />
          </Grid>
          <Grid xs={12} sm={4} md={4} item>
            <CampoTexto
              label="CPF/CNPJ"
              onChange={onChangeCpfCnpj}
              value={dadosOficina.cpfCnpj.cpfCnpj}
            />
          </Grid>
          <Grid xs={12} sm={4} md={4} item>
            <CampoTexto
              label="Telefone"
              onChange={onChangeTelefone}
              value={dadosOficina.telefone.telefone}
            />
          </Grid>
          <Grid xs={12} sm={4} md={4} item>
            <CampoTexto
              label="Celular"
              onChange={onChangeCelular}
              value={dadosOficina.celular.celular}
            />
          </Grid>
          <Hidden smUp>
            <SeletorImagem urlImagem={urlLogomarca} onChange={onChangeImagem} />
          </Hidden>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid xs={12} sm={12} md={3} item>
          <Box mt={2} p={2} display="flex" justifyContent="center">
            <DragAndDrop urlImagem={urlLogomarca} onChange={onChangeImagem} />
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
}
