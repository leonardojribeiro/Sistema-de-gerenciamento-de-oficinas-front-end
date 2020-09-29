import React, { useCallback, useContext, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeTexto, CampoDeSelecao } from '../../../componentes/Form';
import { Grid, MenuItem, Button, CardContent, CardHeader, Card, CardActions, makeStyles } from '@material-ui/core';
import { FormProviderHandles } from '../../../componentes/Form/types';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';
import AutoCompleteServico from '../../../componentes/AutoComplete/AutoCompleteServico';
import AutoCompleteFuncionario from '../../../componentes/AutoComplete/AutoCompleteFuncionario';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    marginTop: '-64px',
  },
  arrowContainer:{
    height: "64px",
    width: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));


const FormItensDeServico: React.FC = () => {
  const classes = useStyles();
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const { itensDeServico, itemDeServicoSelecionado, setItemDeServicoSelecionado, handleSubmitFormItemDeServico } = useContext(OrdemDeServicoContext);

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
    ...itensDeServico[itemDeServicoSelecionado],
    servico: itensDeServico[itemDeServicoSelecionado].servico._id,
    funcionario: itensDeServico[itemDeServicoSelecionado].funcionario._id,
  } : undefined;

  return (
    <div className={classes.root}>
      <div className={classes.arrowContainer} > ^ </div>
      <Form onSubmit={handleSubmitFormItemDeServico} ref={formRef} initialData={intialData} clearOnSubmit>
        <Card>
          <CardHeader title="Inserir serviço" />
          <CardContent>
            <Grid container spacing={2} justify="flex-end">
              <Grid item xs={12} md={6} >
                <AutoCompleteServico name="servico" label="Serviço" listOptionsIn />
              </Grid>
              <Grid item xs={12} md={6}>
                <AutoCompleteFuncionario name="funcionario" required label="Funcionário" listOptionsIn />
              </Grid>
              <Grid item xs={7} md={2} >
                <CampoDeTexto type="number" name="garantia" fullWidth required label="Garantia" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={5} md={2}>
                <CampoDeSelecao name="unidadeDeGarantia" label="Tipo" fullWidth required>
                  <MenuItem value="0">Km</MenuItem>
                  <MenuItem value="1">Dias</MenuItem>
                </CampoDeSelecao>
              </Grid>
              <Grid item xs={6} md={3} >
                <MoneyField name="valorUnitario" fullWidth required label="Valor unitário" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={6} md={2} >
                <CampoDeTexto type="number" name="quantidade" fullWidth required label="Quantidade" onChange={calcularValorTotal} />
              </Grid>
              <Grid item xs={6} md={3}>
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
    </div>
  );
}

export default memo(FormItensDeServico);