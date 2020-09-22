import React, { useCallback, useContext, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeTexto, CampoDeSelecao } from '../../../componentes/Form';
import { Grid, MenuItem, Button, Card, CardContent, CardActions, Box, makeStyles, CardHeader } from '@material-ui/core';
import { FormProviderHandles } from '../../../componentes/Form/types';
import ItemDePeca from '../../../Types/ItemDePeca';
//import comparar from '../../../recursos/Comparar';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import AutoCompletePeca from '../../../componentes/AutoComplete/AutoCompletePeca';
import AutoCompleteFornecedor from '../../../componentes/AutoComplete/AutoCompleteFornecedor';

const useStyles = makeStyles((theme) => ({
  form: {
    position: "relative",
  }
}));

const FormItensDePeca: React.FC = () => {
  const classes = useStyles();
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const { itensDePeca, itemDePecaSelecionado, setItemDePecaSelecionado, setItensDePeca } = useContext(OrdemDeServicoContext);


  // const validar = useCallback((dados: ItemDePeca) => {
  //   let igual = false;
  //   itensDePeca.forEach(itemDePeca => {
  //     if (comparar(itemDePeca, dados)) {
  //       igual = true;
  //     }
  //   })
  //   return igual;
  // }, [itensDePeca]);

  const handleSubmit = useCallback((dados) => {
    // if () {
    console.log(dados.peca)
    const itemDePeca = {
      peca: dados.peca,
      fornecedor: (dados.fornecedor),
      valorUnitario: Number(dados.valorUnitario),
      garantia: Number(dados.garantia),
      unidadeDeGarantia: dados.unidadeDeGarantia,
      quantidade: Number(dados.quantidade),
      valorTotal: Number(dados.valorUnitario) * Number(dados.quantidade),
      _id: itensDePeca.length,
    } as ItemDePeca;
    //if (!validar(itemDePeca)) {
    if (itemDePecaSelecionado !== undefined) {
      setItensDePeca([
        ...itensDePeca.slice(0, itemDePecaSelecionado),
        itemDePeca,
        ...itensDePeca.slice(itemDePecaSelecionado + 1)
      ]);
      setItemDePecaSelecionado(undefined)
    }
    else {
      console.log('ins')
      setItensDePeca((ItensDePeca) => [...ItensDePeca, itemDePeca])
    }
    //  }
    // }
  }, [itemDePecaSelecionado, itensDePeca, setItemDePecaSelecionado, setItensDePeca]);

  const calcularValorTotal = useCallback(() => {
    if (formRef.current) {
      const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
      const quantidade = Number(formRef.current.getFieldValue('quantidade'));
      formRef.current.setFieldValue('valorTotal', quantidade * valorUnitario);
    }
  }, []);

  const intialData = itemDePecaSelecionado !== undefined ? {
    valorUnitario: itensDePeca[itemDePecaSelecionado].valorUnitario,
    garantia: itensDePeca[itemDePecaSelecionado].garantia,
    unidadeDeGarantia: itensDePeca[itemDePecaSelecionado].unidadeDeGarantia,
    quantidade: itensDePeca[itemDePecaSelecionado].quantidade,
    valorTotal: itensDePeca[itemDePecaSelecionado].valorTotal,
  } : undefined;


  const handleReset = useCallback(() => {
    if (itemDePecaSelecionado !== undefined) {
      setItemDePecaSelecionado(undefined);
    }
  }, [itemDePecaSelecionado, setItemDePecaSelecionado]);

  return (
    <Box className={classes.form}>
      <Form onSubmit={handleSubmit} ref={formRef} initialData={intialData} >
        <Card>
          <CardHeader title="Inserir peça" />
          <CardContent>
            <Grid container spacing={2} justify="flex-end">
              <Grid item xs={12} md={6} lg={3}>
                <AutoCompletePeca label="Peça" name="peca" required listOptionsIn />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <AutoCompleteFornecedor label="Fornecedor" name="fornecedor" required listOptionsIn />
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
    </Box>
  );
}

export default memo(FormItensDePeca);