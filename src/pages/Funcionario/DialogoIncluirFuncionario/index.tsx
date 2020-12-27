import React, { useContext, memo, useCallback, useEffect, useState } from 'react';
import Dialogo from '../../../componentes/Dialog';
import ApiContext from '../../../contexts/ApiContext';
import { useHistory } from 'react-router-dom';
import { DialogActions, Button, Grid, FormControlLabel, Radio, MenuItem } from '@material-ui/core';
import { CampoDeCpfOuCnpj, Form, DateField, CampoDeRadio, PhoneField, CampoDeEmail, NameField } from '../../../componentes/Form';
import SelectField from '../../../componentes/Form/Fields/SelectField';
import Especialidade from '../../../Types/Especialidade';
import FormEndereco from '../../../componentes/FormEndereco';

const DialogoIncluirFuncionario: React.FC = () => {
  const [especialidades, setEspecialidades] = useState<Especialidade[] | undefined>(undefined);
  const { post, get } = useContext(ApiContext);
  const history = useHistory();

  const listarEspecialidades = useCallback(async () => {
    const especialidades = await get('especialidade') as Especialidade[] as any;
    if (especialidades) {
      setEspecialidades(especialidades.especialidades as Especialidade[]);
    }
  }, [get]);

  useEffect(() => {
    listarEspecialidades()
  }, [listarEspecialidades])

  const manipularEnvio = useCallback(async (funcionario) => {
    if (funcionario) {
      console.log(funcionario);
      const resposta = await post("/funcionario", funcionario);
      if (resposta) {
        history.goBack();
      }
    }
  }, [history, post]);

  return (
    <Dialogo maxWidth="md" fullWidth open title="incluir funcionário">
      <Form onSubmit={manipularEnvio}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8}>
            <NameField name="nome" label="Nome" autoComplete="no" fullWidth required autoFocus />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <CampoDeCpfOuCnpj name="cpf" label="CPF" autoComplete="no" onlyCpf fullWidth required />
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
            <SelectField name="idsEspecialidades" multiple label="Especialidades" autoComplete="no" required fullWidth>
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
    </Dialogo>
  );
}

export default memo(DialogoIncluirFuncionario);