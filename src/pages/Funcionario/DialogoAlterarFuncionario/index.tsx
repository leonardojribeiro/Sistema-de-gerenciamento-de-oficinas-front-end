import React, { useContext, useRef, memo, useEffect, useCallback, useState } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, FormControlLabel, Radio, MenuItem } from '@material-ui/core';
import useQuery from '../../../hooks/useQuery';
import comparar from '../../../recursos/Comparar';
import Alerta, { AlertaHandles } from '../../../componentes/Alerta';
import { Form, CampoDeCpfOuCnpj, DateField, CampoDeRadio, PhoneField, CampoDeEmail, NameField } from '../../../componentes/Form';
import Funcionario from '../../../Types/Funcionario';
import SelectField from '../../../componentes/Form/Fields/SelectField';
import Especialidade from '../../../Types/Especialidade';
import FuncionarioD from '../../../Types/FuncionarioD';
import FormEndereco from '../../../componentes/FormEndereco';

const DialogAlterarFuncionario: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidade[] | undefined>(undefined);
  const { get, put, } = useContext(ApiContext);
  const history = useHistory();
  const [funcionario, setFuncionario] = useState<FuncionarioD | undefined>(undefined);
  const id = useQuery("id");
  const refAlerta = useRef<AlertaHandles | undefined>(undefined);

  const listarEspecialidades = useCallback(async () => {
    const especialidades = await get('especialidade') as Especialidade[] as any;
    if (especialidades) {
      setEspecialidades(especialidades.especialidades as Especialidade[]);
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
      const funcionario = {
        ...resposta,
        especialidades: resposta.especialidades.map(especialidade => especialidade._id)
      } as FuncionarioD
      setFuncionario(funcionario)
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
            <NameField name="nome" label="Nome" autoComplete="no" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj name="cpf" label="CPF" autoComplete="no" disabled fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DateField name="dataNascimento" label="Data de nascimento" fullWidth required openTo="year" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CampoDeRadio name="sexo" label="Sexo" required>
              <FormControlLabel value="f" control={<Radio color="primary" />} label="Feminino" />
              <FormControlLabel value="m" control={<Radio color="primary" />} label="Masculino" />
            </CampoDeRadio>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneFixo" label="Telefone fixo" autoComplete="no" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <PhoneField name="telefoneCelular" label="Telefone celular" autoComplete="no" fullWidth required />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <CampoDeEmail name="email" label="E-mail" autoComplete="no" fullWidth />
          </Grid>
          <FormEndereco />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <SelectField name="especialidades" multiple label="Especialidades" autoComplete="no" required fullWidth>
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