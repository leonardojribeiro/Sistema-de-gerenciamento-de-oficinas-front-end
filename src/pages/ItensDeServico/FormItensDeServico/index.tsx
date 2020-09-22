import React, { useCallback, useContext, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeTexto, CampoDeSelecao } from '../../../componentes/Form';
import { Grid, MenuItem, Button, CardContent, CardHeader, Card, CardActions } from '@material-ui/core';
import { FormProviderHandles } from '../../../componentes/Form/types';
import ItemDeServico from '../../../Types/ItemDeServico';
//import comparar from '../../../recursos/Comparar';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import AutoCompleteServico from '../../../componentes/AutoComplete/AutoCompleteServico';
import AutoCompleteFuncionario from '../../../componentes/AutoComplete/AutoCompleteFuncionario';


const FormItensDeServico: React.FC = () => {
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const { itensDeServico, setItensDeServico, itemDeServicoSelecionado, setItemDeServicoSelecionado } = useContext(OrdemDeServicoContext);

  // const validar = useCallback((dados: ItemDeServico) => {
  //   let igual = false;
  //   itensDeServico.forEach(itemDeServico => {
  //     if (comparar(itemDeServico, dados)) {
  //       igual = true;
  //     }
  //   })
  //   return igual;
  // }, [itensDeServico]);

  const handleSubmit = useCallback((dados) => {
    const itemDeServico = {
      servico: dados.servico,
      funcionario: dados.funcionario,
      valorUnitario: Number(dados.valorUnitario),
      garantia: Number(dados.garantia),
      unidadeDeGarantia: dados.unidadeDeGarantia,
      quantidade: Number(dados.quantidade),
      valorTotal: Number(dados.valorUnitario) * Number(dados.quantidade),
    } as ItemDeServico;
    //if (!validar(itemDeServico)) {
    if (itemDeServicoSelecionado !== undefined) {
      setItensDeServico([
        ...itensDeServico.slice(0, itemDeServicoSelecionado),
        itemDeServico,
        ...itensDeServico.slice(itemDeServicoSelecionado + 1)
      ]);
    }
    else {
      setItensDeServico((ItensDeServico) => [...ItensDeServico, itemDeServico])
    }
    // }

  }, [itemDeServicoSelecionado, setItensDeServico, itensDeServico]);

  const calcularValorTotal = useCallback((event) => {
    const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
    const quantidade = Number(formRef.current.getFieldValue('quantidade'));
    formRef.current.setFieldValue('valorTotal', quantidade * valorUnitario);
  }, []);

  const handleReset = useCallback(() => {
    if (itemDeServicoSelecionado !== undefined) {
      setItemDeServicoSelecionado(undefined);
    }
  }, [itemDeServicoSelecionado, setItemDeServicoSelecionado]);

  const intialData = itemDeServicoSelecionado !== undefined ? {
    valorUnitario: itensDeServico[itemDeServicoSelecionado].valorUnitario,
    garantia: itensDeServico[itemDeServicoSelecionado].garantia,
    unidadeDeGarantia: itensDeServico[itemDeServicoSelecionado].unidadeDeGarantia,
    quantidade: itensDeServico[itemDeServicoSelecionado].quantidade,
    valorTotal: itensDeServico[itemDeServicoSelecionado].valorTotal,
  } : undefined;

  return (
    <Form onSubmit={handleSubmit} ref={formRef} initialData={intialData}>
      <Card>
        <CardHeader title="Inserir serviço" />
        <CardContent>
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12} md={6} lg={3}>
              <AutoCompleteServico name="servico" label="Serviço" listOptionsIn />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <AutoCompleteFuncionario name="funcionario" required label="Funcionário" listOptionsIn />
            </Grid>
            <Grid item xs={7} md={2} lg={1}>
              <CampoDeTexto type="number" name="garantia" fullWidth required label="Garantia" onChange={calcularValorTotal} />
            </Grid>
            <Grid item xs={5} md={2} lg={1}>
              <CampoDeSelecao name="unidadeDeGarantia" label="Tipo" fullWidth required>
                <MenuItem value="0">Km</MenuItem>
                <MenuItem value="1">Dias</MenuItem>
              </CampoDeSelecao>
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <MoneyField name="valorUnitario" fullWidth required label="Valor unitário" onChange={calcularValorTotal} />
            </Grid>
            <Grid item xs={6} md={2} lg={2}>
              <CampoDeTexto type="number" name="quantidade" fullWidth required label="Quantidade" onChange={calcularValorTotal} />
            </Grid>
            <Grid item xs={6} md={3} lg={2}>
              <MoneyField name="valorTotal" fullWidth required label="ValorTotal" />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container spacing={2} justify="flex-end">
            <Grid item >
              <Button type="reset" onClick={handleReset} variant="outlined">{itemDeServicoSelecionado !== undefined ? "Cancelar" : "Limpar"}</Button>
            </Grid>
            <Grid item >
              <Button type="submit" variant="outlined">{itemDeServicoSelecionado !== undefined ? "Alterar" : "Adicionar"}</Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Form >
  );
}

export default memo(FormItensDeServico);