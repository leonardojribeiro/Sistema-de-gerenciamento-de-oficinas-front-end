import React, { useCallback, useState, useContext, useEffect, useRef } from 'react';
import Dialog from '../../../componentes/Dialog';
import { Form, MoneyField, CampoDeTexto } from '../../../componentes/Form';
import Peca from '../../../Types/Peca';
import ApiContext from '../../../contexts/ApiContext';
import SelectField from '../../../componentes/Form/Fields/SelectField';
import { Grid, MenuItem } from '@material-ui/core';
import { FormProviderHandles } from '../../../componentes/Form/types';

// import { Container } from './styles';

const DialogInserirOrdemDeServico: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[] | undefined>(undefined);

  const { get } = useContext(ApiContext);
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);

  const popularPecas = useCallback(async () => {
    const pecas = await get('peca') as Peca[];
    if (pecas) {
      setPecas(pecas);
    }
  }, [get]);

  useEffect(() => {
    popularPecas();
  }, [popularPecas]);


  console.log(pecas)

  const handleSubmit = useCallback((dados) => {
    console.log(dados)
  }, []);

  const calcularValorTotal = useCallback((event)=>{
    const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
    const quantidade = Number(formRef.current.getFieldValue('quantidade'));
    formRef.current.setFieldValue('valorTotal', quantidade*valorUnitario)
  },[]);

  return (
    <Dialog title="Nova ordem de serviço" open maxWidth="lg" fullWidth>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Grid container spacing={2}>
          <Grid item md={4} lg={3}>
            <SelectField name="peca" fullWidth required label="Peça">
              {pecas?.map((peca, indice) => (
                <MenuItem key={indice} value={indice}>{peca.descricao}</MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item md={2}>
            <MoneyField  name="valorUnitario" fullWidth required label="Valor unitário" onChange={calcularValorTotal}/>
          </Grid>
          <Grid item md={2}>
            <CampoDeTexto type="number" name="quantidade" fullWidth required label="Quantidade" onChange={calcularValorTotal}/>
          </Grid>
          <Grid item md={2}>
            <MoneyField name="valorTotal" fullWidth required label="ValorTotal" disabled/>
          </Grid>
        </Grid>
      </Form>
    </Dialog>
  )
}

export default DialogInserirOrdemDeServico;