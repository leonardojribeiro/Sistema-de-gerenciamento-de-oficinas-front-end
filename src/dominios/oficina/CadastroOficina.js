import React, { useState, useEffect } from 'react';
import { Grid, Box, Container, Typography, Hidden } from '@material-ui/core';
import Assistente from '../../componentes/Assistente';
import CustomIconButton from '../../componentes/IconButton';
import { Link } from 'react-router-dom';
import Home from '@material-ui/icons/Home';
import SeletorImagem from '../../componentes/SeletorImagem';
import DragAndDrop from '../../componentes/DragAndDrop';
import MascaraNumererica from '../../recursos/MascaraNumerica';
import CampoTexto from '../../componentes/CampoTexto';
import GoogleMaps from '../../componentes/GoogleMaps';

export default function CadastroOficina({ setItensBarraNavegacao, }) {
  const [dadosOficina, setDadosOficina] = useState({
    nomeFantasia: "",
    razaoSocial: "",
    cpfCnpj: "",
    telefoneFixo: "",
    telefoneCelular: "",
    email: "",
    webSite: "",
    logomarca: "",
    logradouro: "",
    bairro: "",
    numero: "",
    cep: "",
    complemento: "",
    cidade: " ",
    estado: "",
    latitude: "",
    longitude: ""
  });



  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setDadosOficina({
          ...dadosOficina,
          latitude: coords.latitude,
          longitude: coords.longitude
        });
      })
    }
    setItensBarraNavegacao({
      itens: {
        botoes: (
          <CustomIconButton tooltip="Página Inicial" component={Link} to="/">
            <Home />
          </CustomIconButton>
        )
      }
    });
  }, []);

  const onChangeNomeFantasia = e => {
    setDadosOficina({
      ...dadosOficina,
      nomeFantasia: e.target.value
    });
  }

  const onChangeRazaoSocial = e => {
    setDadosOficina({
      ...dadosOficina,
      razaoSocial: e.target.value
    });
  }

  const onChangeCpfCnpj = e => {
    setDadosOficina({
      ...dadosOficina,
      cpfCnpj: MascaraNumererica(
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
    setDadosOficina({
      ...dadosOficina,
      telefoneFixo: MascaraNumererica(
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
    setDadosOficina({
      ...dadosOficina,
      telefoneCelular: MascaraNumererica(
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
      setDadosOficina({
        ...dadosOficina,
        urlLogomarca: reader.result
      });
    }
    if (imagem[0]) {
      reader.readAsDataURL(imagem[0]);
      setDadosOficina({
        ...dadosOficina,
        logomarca: imagem[0]
      });
    }
    else {
      setDadosOficina({
        ...dadosOficina,
        logomarca: null,
        urlLogomarca: ""
      });
    }
  };

  const onChangeLogradouro = e => {
    setDadosOficina({
      ...dadosOficina,
      logradouro: e.target.value
    });
  }

  const onChangeBairro = e => {
    setDadosOficina({
      ...dadosOficina,
      bairro: e.target.value
    });
  }

  const onChangeNumero = e => {
    setDadosOficina({
      ...dadosOficina,
      numero: e.target.value
    });
  }

  const onChangeCep = e => {
    setDadosOficina({
      ...dadosOficina,
      cep: e.target.value
    });
  }

  const onChangeComplemento = e => {
    setDadosOficina({
      ...dadosOficina,
      complemento: e.target.value
    });
  }

  const onChangeCidade = e => {
    setDadosOficina({
      ...dadosOficina,
      cidade: e.target.value
    });
  }

  const onChangeEstado = e => {
    setDadosOficina({
      ...dadosOficina,
      estado: e.target.value
    });
  }

  const onChangeLatitude = e => {
    setDadosOficina({
      ...dadosOficina,
      latitude: e.target.value
    });
  }

  const onChangeLongitude = e => {
    setDadosOficina({
      ...dadosOficina,
      longitude: e.target.value
    });
  }

  const onChangeMapa = (a, b, event) => {
    setDadosOficina({
      ...dadosOficina,
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    });
  }

  const formOficina = (
    <Grid container>
      <Grid item lg={8}>
        <Grid container justify="center" alignItems="center">
          <Grid xs={12} sm={12} md={6} item>
            <CampoTexto
              fullWidth
              label="Nome Fantasia / Nome"
              onChange={onChangeNomeFantasia}
              value={dadosOficina.nomeFantasia}
            />
          </Grid>
          <Grid xs={12} sm={12} md={6} item>
            <CampoTexto
              fullWidth
              label="Razão Social"
              onChange={onChangeRazaoSocial}
              value={dadosOficina.razaoSocial}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto
              fullWidth
              label="CPF/CNPJ"
              onChange={onChangeCpfCnpj}
              value={dadosOficina.cpfCnpj}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto
              fullWidth
              label="Telefone Fixo"
              onChange={onChangeTelefoneFixo}
              value={dadosOficina.telefoneFixo}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto
              fullWidth
              label="Telefone Celular"
              onChange={onChangeTelefoneCelular}
              value={dadosOficina.telefoneCelular}
            />
          </Grid>
          <Grid xs={12} sm={6} md={4} item>
            <CampoTexto
              type="email"
              fullWidth
              label="E-mail"
              onChange={onChangeTelefoneCelular}
              value={dadosOficina.telefoneCelular}
            />
          </Grid>
          <Grid xs={12} md={8} item>
            <CampoTexto
              fullWidth
              label="Website"
              onChange={onChangeTelefoneCelular}
              value={dadosOficina.telefoneCelular}
            />
          </Grid>
          <Hidden smUp>
            <SeletorImagem
              urlImagem={dadosOficina.urlLogomarca}
              onChange={onChangeImagem}
            />
          </Hidden>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid xs={12} lg={4} item>
          <Box mt={2} p={2} display="flex" justifyContent="center">
            <DragAndDrop
              urlImagem={dadosOficina.urlLogomarca}
              onChange={onChangeImagem}
            />
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );

  const formEndereco = (
    <Grid container justify="center" alignItems="center">
      <Grid lg={8} item>
        <Grid container >
          <Grid xs={12} md={6} item>
            <CampoTexto
              fullWidth label="Logradouro"
              onChange={onChangeLogradouro}
              value={dadosOficina.logradouro} />
          </Grid>
          <Grid xs={12} md={6} item>
            <CampoTexto
              fullWidth
              label="Bairro"
              onChange={onChangeBairro}
              value={dadosOficina.bairro}
            />
          </Grid>
          <Grid xs={6} sm={6} md={3} item>
            <CampoTexto
              fullWidth
              label="Número"
              onChange={onChangeNumero}
              value={dadosOficina.numero}
            />
          </Grid>
          <Grid xs={6} md={3} item>
            <CampoTexto
              fullWidth
              label="CEP"
              onChange={onChangeCep}
              value={dadosOficina.cep}
            />
          </Grid>
          <Grid xs={12} md={6} item>
            <CampoTexto
              fullWidth
              label="Complemento"
              onChange={onChangeComplemento}
              value={dadosOficina.complemento}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto
              fullWidth label="Cidade"
              onChange={onChangeCidade}
              value={dadosOficina.cidade}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto
              fullWidth
              label="Estado"
              onChange={onChangeEstado}
              value={dadosOficina.estado}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto
              fullWidth
              label="Latitude"
              onChange={onChangeLatitude}
              value={dadosOficina.latitude}
              type="number"
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto
              fullWidth
              label="Longitude"
              onChange={onChangeLongitude}
              value={dadosOficina.longitude}
              type="number"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} lg={4} sm={12} item>
        <Box p={2}>
          <GoogleMaps
            initialCenter={{ lat: dadosOficina.latitude, lng: dadosOficina.longitude }}
            onClick={onChangeMapa}
          />
        </Box>
      </Grid>
    </Grid>
  );

  const confirmaDados = (
    <Grid container>
      <Grid xs={12} item>
        <Typography>Nome Fantasia: {dadosOficina.nomeFantasia}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid xs={12} item>
          <Box display="flex" alignItems="center">
            <Assistente passos={
              [{
                label: "Dados",
                dados: formOficina
              },
              {
                label: "Endereço",
                dados: formEndereco
              },
              {
                label: "Confirmar",
                dados: confirmaDados
              }]
            }
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};