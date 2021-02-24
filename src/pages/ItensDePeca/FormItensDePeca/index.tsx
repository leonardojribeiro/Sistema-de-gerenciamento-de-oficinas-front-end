import React, { useCallback, useContext, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeSelecao } from '../../../componentes/Form';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Hidden from '@material-ui/core/Hidden';
import { FormProviderHandles } from '../../../componentes/Form/types';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import AutoCompletePeca from '../../../componentes/AutoComplete/AutoCompletePeca';
import AutoCompleteFornecedor from '../../../componentes/AutoComplete/AutoCompleteFornecedor';
import NumberField from '../../../componentes/Form/Fields/NumberField';
import ArrowTop from '../../../componentes/ArrowTop';

const FormItensDePeca: React.FC = () => {
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const { itensDePeca, itemDePecaSelecionado, setItemDePecaSelecionado, handleSubmitFormItemDePeca } = useContext(OrdemDeServicoContext);

  const calcularValorTotal = useCallback(() => {
    if (formRef.current) {
      const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
      const quantidade = Number(formRef.current.getFieldValue('quantidade'));
      formRef.current.setFieldValue('valorTotal', quantidade * valorUnitario);
    }
  }, []);

  const intialData = itemDePecaSelecionado !== undefined ? {
    ...itensDePeca[itemDePecaSelecionado],
    peca: itensDePeca[itemDePecaSelecionado].peca._id,
    fornecedor: itensDePeca[itemDePecaSelecionado].fornecedor._id,
  } : undefined;

  const handleReset = useCallback(() => {
    if (itemDePecaSelecionado !== undefined) {
      setItemDePecaSelecionado(undefined);
    }
  }, [itemDePecaSelecionado, setItemDePecaSelecionado]);

  return (
    <>
      <Hidden mdUp>
        <ArrowTop />
      </Hidden>
      <Form onSubmit={handleSubmitFormItemDePeca} ref={formRef} clearOnSubmit initialData={intialData} >
        <Card>
          <CardHeader title="Incluir peça" />
          <CardContent>
            <Grid container spacing={2} justify="flex-end">
              <Grid item xs={12} md={6}>
                <AutoCompletePeca label="Peça" name="peca" required />
              </Grid>
              <Grid item xs={12} md={6}>
                <AutoCompleteFornecedor label="Fornecedor" name="fornecedor" required />
              </Grid>
              <Grid item xs={7} md={2} >
                <NumberField name="garantia" min={0} fullWidth required label="Garantia" />
              </Grid>
              <Grid item xs={5} md={2}>
                <CampoDeSelecao name="unidadeDeGarantia" label="Tipo" fullWidth required>
                  <MenuItem value="0">Km</MenuItem>
                  <MenuItem value="1">Dias</MenuItem>
                </CampoDeSelecao>
              </Grid>
              <Grid item xs={6} md={3}>
                <MoneyField name="valorUnitario" min={0} max={10000} fullWidth required label="Valor unitário" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={6} md={2} >
                <NumberField name="quantidade" min={0} fullWidth required label="Quantidade" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={6} md={3} >
                <MoneyField name="valorTotal" fullWidth required label="ValorTotal" disabled />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={2} justify="flex-end">
              <Grid item >
                <Button type="reset" onClick={handleReset} variant="outlined">{itemDePecaSelecionado !== undefined ? "Cancelar" : "Limpar"}</Button>
              </Grid>
              <Grid item >
                <Button type="submit" variant="outlined">{itemDePecaSelecionado !== undefined ? "Alterar" : "Adicionar"}</Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Form>
    </>
  );
}

export default memo(FormItensDePeca);