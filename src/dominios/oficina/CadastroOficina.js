import React, { useState, useEffect } from 'react';
import StringMask from 'string-mask';
import GoogleMaps from '../../componentes/GoogleMaps';
import { Grid, Box, Container, withWidth, Input, InputLabel, Hidden, Button } from '@material-ui/core';
import CampoTexto from '../../componentes/CampoTexto';
import Assistente from '../../componentes/Assistente';
import DragAndDrop from '../../componentes/DragAndDrop';
import SeletorImagem from '../../componentes/SeletorImagem';

export default withWidth()(function CadastroOficina({ tema, width }) {
  const [valor, setValor] = useState("");
  const [logomarca, setLogomarca] = useState(null);
  const [urlLogomarca, setUrlLogomarca] = useState("");
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        setCoordenadas({
          lat: coords.latitude,
          lng: coords.longitude
        });
      })
    }
  }, []);



  function onChange(e) {
    const regex = new RegExp(/[^\d]+/g); //somente números
    const valor = e.target.value.replace(regex, ""); //valores não numéricos são substituídos
    const tamanho = valor.length; //tamanho que indicará se é cpf ou cnpj
    let formato;
    formato = tamanho < 12 //se o tamanho é menor que 12 indica cpf, se não cnpj
      ? "000.000.000-00"
      : "00.000.000/0000-00";
    let final = new StringMask(formato).apply(valor) //cria uma máscara e aplica no valor
    while (final.length > 0 && regex.test(final.substr(final.length - 1))) { //remove o último
      final = final.substr(0, final.length - 1);              //caractere se ele for não numérico
    }
    setValor(final); //atribui um novo valor ao campo de texto
  }


  const onImagem = imagem => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUrlLogomarca(reader.result);
      console.log(reader.result)
    }
    if (imagem[0]) {
      reader.readAsDataURL(imagem[0]);
      setUrlLogomarca(reader.result);
      setLogomarca(imagem[0]);
    }
    else {
      setUrlLogomarca("");
      setLogomarca(null);
    }
  };

  const onImagemInput = evento => onImagem(evento.target.files);


  const dados = (
    <Grid container>
      <Grid md={9} item>
        <Grid container>
          <Grid xs={12} sm={6} md={6} item>
            <CampoTexto label="Descrição" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <CampoTexto label="Nome Fantasia" />
          </Grid>
          <Grid xs={12} sm={4} md={4} item>
            <CampoTexto label="CPF/CNPJ" onChange={(e) => onChange(e)} value={valor} />
          </Grid>
          <Grid xs={12} sm={4} md={4} item>
            <CampoTexto label="Telefone" />
          </Grid>
          <Grid xs={12} sm={4} md={4} item>
            <CampoTexto label="Celular" />
          </Grid>
          <Hidden smUp>
            <SeletorImagem onChange={onImagemInput} urlImagem={urlLogomarca}/>
          </Hidden>
        </Grid>
      </Grid>
      <Hidden xsDown>
        <Grid xs={12} sm={12} md={3} item>
          <Box mt={2} p={2} display="flex" justifyContent="center">
            <DragAndDrop imagem={urlLogomarca} onImagem={onImagem} />
          </Box>
        </Grid>
      </Hidden>
    </Grid>
  );
  const endereco = (
    <Grid container>
      <Grid md={7} item>
        <Grid container>
          <Grid xs={12} sm={6} md={6} item>
            <CampoTexto label="Logradouro" />
          </Grid>
          <Grid xs={12} sm={6} md={6} item>
            <CampoTexto fullWidth label="Bairro" />
          </Grid>
          <Grid xs={6} sm={3} item>
            <CampoTexto fullWidth label="Número" />
          </Grid>
          <Grid xs={6} sm={3} item>
            <CampoTexto fullWidth label="CEP" />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Complemento" />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Cidade" />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Estado" />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Latitude" value={coordenadas.lat} />
          </Grid>
          <Grid xs={12} sm={6} item>
            <CampoTexto fullWidth label="Longitude" value={coordenadas.lng} />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} md={5} sm={12} item>
        <Box p={2}>
          <GoogleMaps
            initialCenter={coordenadas}
            onClick={(a, s, e) => {
              setCoordenadas(e.latLng.toJSON());
            }}
            icone={urlLogomarca}
          />
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid xs={12} item>
          <Box display="flex" alignItems="center">
            <Assistente passos={
              [
                {
                  label: "Dados",
                  dados: dados
                },
                {
                  label: "Endereço",
                  dados: endereco
                },
                {
                  label: "Confirmar",
                  dados: ""
                }
              ]
            }
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
});