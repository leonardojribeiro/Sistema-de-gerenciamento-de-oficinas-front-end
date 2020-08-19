import React, { useContext, useRef, memo, useEffect, useCallback, useState } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, FormControlLabel, Radio, MenuItem } from '@material-ui/core';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeTexto, CampoDeCpfOuCnpj, DateField, CampoDeRadio, PhoneField, CampoDeEmail, CepField, Node } from '../../../componentes/Form';
import Funcionario from '../../../Types/Funcionario';
import SelectField from '../../../componentes/Form/Fields/SelectField';
import Especialidade from '../../../Types/Especialidade';

const DialogAlterarFuncionario: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidade[] | undefined>(undefined);
  const { get, put, } = useContext(ApiContext);
  const history = useHistory();
  const [funcionario, setFuncionario] = useState<Funcionario | undefined>(undefined);
  const id = useQuery("id");
  const refAlerta = useRef<AlertaHandles | undefined>(undefined);

  const listarEspecialidades = useCallback(async () => {
    const especialidades = await get('especialidade') as Especialidade[];
    if (especialidades) {
      setEspecialidades(especialidades);
    }
  }, [get]);

  useEffect(() => {
    listarEspecialidades()
  }, [listarEspecialidades])

  const manipularEnvio = useCallback(async (dados) => {
    if (dados) {
      if (!comparar(funcionario, dados)) {
        dados._id = funcionario?._id;
        console.log(dados);
        const resposta = await put("/funcionario", dados);
        if (resposta) {
          history.goBack();
        }
      }
      else {
        if (refAlerta.current) {
          refAlerta.current.setTipo("warning");
          refAlerta.current.setMensagem("Nenhuma alteração foi efetuada.");
          refAlerta.current.setAberto(true);
        }
      }
    }
  }, [funcionario, history, put]);

  const popular = useCallback(async () => {
    const resposta = await get(`funcionario/id?_id=${id}`) as Funcionario;
    if (resposta) {
      setFuncionario(resposta)
    }
  }, [get, id]);

  useEffect(() => {
    popular();
  }, [popular])

  return (
    <Dialogo maxWidth="md" fullWidth open title="Alterar Funcionário">
      <Form initialData={funcionario} onSubmit={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <CampoDeTexto name="nome" label="Nome" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj name="cpf" label="CPF" disabled fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DateField name="dataNascimento" label="Data de nascimento" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeRadio name="sexo" label="Sexo" required>
              <FormControlLabel value="f" control={<Radio color="primary" />} label="Feminino" />
              <FormControlLabel value="m" control={<Radio color="primary" />} label="Masculino" />
            </CampoDeRadio>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneFixo" label="Telefone fixo" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneCelular" label="Telefone celular" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeEmail name="email" label="E-mail" fullWidth />
          </Grid>
          <Node node="endereco">
            <Grid item xs={12} sm={12} md={6}>
              <CampoDeTexto name="logradouro" label="Logradouro" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={9} md={6}>
              <CampoDeTexto name="bairro" label="Bairro" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3} md={2}>
              <CampoDeTexto name="numero" label="Número" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={9} md={7}>
              <CampoDeTexto name="complemento" label="Complemento" fullWidth />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
              <CepField name="cep" label="CEP" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CampoDeTexto name="estado" label="Estado" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CampoDeTexto name="cidade" label="Cidade" fullWidth required />
            </Grid>
          </Node>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <SelectField name="idsEspecialidades" multiple label="Especialidades" required fullWidth>
              {especialidades?.map((especialidade, index) => (
                <MenuItem key={index} value={especialidade._id} >{especialidade.descricao}</MenuItem>
              ))}
            </SelectField>
          </Grid>
        </Grid>
        <DialogActions >
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </Form>
      <Alerta ref={refAlerta} />
    </Dialogo>
  );
}

export default memo(DialogAlterarFuncionario);