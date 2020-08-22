import React, { useContext, memo, useEffect, useRef, useCallback, useState } from 'react';
import { Container, Grid, MenuItem, Button } from '@material-ui/core';
import { Form, DateField, CampoDeTexto, MoneyField, CampoDeSelecao, } from '../../../componentes/Form';
import OrdemDeServicoContext from '../OrdemDeServicoContext';
import { FormProviderHandles } from '../../../componentes/Form/types';
import Veiculo from '../../../Types/Veiculo';
import ApiContext from '../../../contexts/ApiContext';

const FormOrdemDeServico: React.FC = () => {
  const { handleSubmit, valorTotalPecas, valorTotalServicos } = useContext(OrdemDeServicoContext);
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const { get } = useContext(ApiContext);
  const popularVeiculos = useCallback(async () => {
    const veiculos = await get('veiculo') as Veiculo[];
    if (veiculos) {
      setVeiculos(veiculos);
    }
  }, [get]);

  useEffect(() => {
    popularVeiculos();
  }, [popularVeiculos]);


  const calcularValorTotal = useCallback(() => {
    if (formRef.current) {
      const desconto = formRef.current.getFieldValue('desconto');
      formRef.current.setFieldValue(
        'valorTotal',
        valorTotalPecas() + valorTotalServicos() - Number(desconto)
      )
    }
  }, [valorTotalPecas, valorTotalServicos]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("valorTotalDasPecas", valorTotalPecas());
      calcularValorTotal();
    }
  }, [calcularValorTotal, valorTotalPecas]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("valorTotalDosServicos", valorTotalServicos());
      calcularValorTotal();
    }
  }, [calcularValorTotal, valorTotalServicos]);

  return (
    <Container maxWidth="md">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CampoDeSelecao name="idVeiculo" label="Veículo" required fullWidth>
              {veiculos.map((veiculo, indice) => (
                <MenuItem value={veiculo._id} key={indice}>{veiculo.placa}</MenuItem>
              ))} 
            </CampoDeSelecao>
          </Grid>
          <Grid item md={6}>
            <DateField name="dataDeRegistro" label="Data de registro" required fullWidth allowKeyboardControl/>
          </Grid>
          <Grid item md={6}>
            <DateField name="dataDeInicio" label="Data de início" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <DateField name="dataDeConclusao" label="Data de conclusão" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <CampoDeSelecao name="categoria" label="Categoria da ordem de serviço" required fullWidth>
              <MenuItem value="0">Predetiva</MenuItem>
              <MenuItem value="1">Corretiva</MenuItem>
              <MenuItem value="2">Preventiva</MenuItem>
            </CampoDeSelecao>
          </Grid>
          <Grid item md={12}>
            <CampoDeTexto name="sintoma" label="Sintoma do veículo" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <CampoDeSelecao name="status" label="Status da ordem de serviço" required fullWidth>
              <MenuItem value="0">Em andamento</MenuItem>
              <MenuItem value="1">Finalizada</MenuItem>
            </CampoDeSelecao>
          </Grid>
          <Grid item md={6}>
            <CampoDeTexto name="andamento" type="number" label="Andamento" required fullWidth />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="valorTotalDosServicos" label="Valor total dos serviços" disabled fullWidth />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="valorTotalDasPecas" label="Valor total das peças" disabled fullWidth />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="desconto" label="Desconto" fullWidth onChange={calcularValorTotal} />
          </Grid>
          <Grid item md={6}>
            <MoneyField name="valorTotal" label="Valor total da ordem de serviço" disabled fullWidth />
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

export default memo(FormOrdemDeServico);