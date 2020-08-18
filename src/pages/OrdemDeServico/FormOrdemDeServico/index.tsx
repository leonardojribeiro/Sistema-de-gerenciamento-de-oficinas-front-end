import React from 'react';
import { Container, Grid, MenuItem, Button } from '@material-ui/core';
import { Form, DateField, CampoDeTexto, MoneyField, CampoDeSelecao } from '../../../componentes/Form';

const FormOrdemDeServico: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Form onSubmit={(e) => console.log(e)}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <DateField name="dataDeRegistro" label="Data de registro" required fullWidth/>
          </Grid>
          <Grid item md={6}>
            <DateField name="dataDeInicio" label="Data de início" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <DateField name="dataConclusao" label="Data de conclusão" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <CampoDeSelecao name="categoria" label="Categoria da ordem de serviço" required fullWidth>
              <MenuItem value="0">Predetiva</MenuItem>
              <MenuItem value="1">Corretiva</MenuItem>
              <MenuItem value="2">Preventiva</MenuItem>
            </CampoDeSelecao>
          </Grid>
          <Grid item md={12}>
            <CampoDeTexto name="sitoma" label="Sintoma do veículo" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <CampoDeSelecao name="status" label="Status da ordem de serviço" required fullWidth>
              <MenuItem value="0">Em andamento</MenuItem>
              <MenuItem value="1">Finalizada</MenuItem>
            </CampoDeSelecao>
          </Grid>
          <Grid item md={6}>
            <CampoDeTexto name="andamento" type="number" min={0}  label="Andamento" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="valorTotalDosServicos" label="Valor total dos serviços" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="valorTotalDasPecas" label="Valor total das peças" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="desconto" label="Desconto" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="valorTotal" label="Valor total da ordem de serviço" required fullWidth />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <Button type="submit">Salvar</Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
}

export default FormOrdemDeServico;