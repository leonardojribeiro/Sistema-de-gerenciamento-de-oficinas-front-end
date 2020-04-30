import React, { useState, useEffect } from 'react';
import { Grid, Box, Container } from '@material-ui/core';
import Assistente from '../../componentes/Assistente';
import FormOficina from '../../componentes/FormOficina';
import FormEndereco from '../../componentes/FormEndereco';

export default function CadastroOficina() {
  //oficina
  const [descricao, setDescricao] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [logomarca, setLogomarca] = useState(null);

  //endereço
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [coordenadas, setCoordenadas] = useState({ lat: 0, lng: 0 });


  const dadosOficina = {
    descricao: {
      descricao,
      setDescricao
    },
    nomeFantasia: {
      nomeFantasia,
      setNomeFantasia
    },
    cpfCnpj: {
      cpfCnpj,
      setCpfCnpj
    },
    telefone: {
      telefone,
      setTelefone
    },
    celular: {
      celular,
      setCelular
    },
    logomarca: {
      logomarca,
      setLogomarca
    }
  }

  const [endereco, setEndereco] = useState({
    logradouro: "",
    bairro: "",
    numero: "",
    cep: "",
    complemento: "",
    cidade: "",
    estado: "",
    latitude: "",
    longitude: ""
  });

  const dadosEndereco = {
    endereco,
    setEndereco
  }

  const dados = (
    <FormOficina dadosOficina={dadosOficina} />
  );
  const formEndereco = (
    <FormEndereco dadosEndereco={dadosEndereco} />
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
                  dados: formEndereco
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
};