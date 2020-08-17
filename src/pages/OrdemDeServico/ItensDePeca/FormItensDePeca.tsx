import React, { useCallback, useState, useContext, useEffect, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeTexto } from '../../../componentes/Form';
import Peca from '../../../Types/Peca';
import ApiContext from '../../../contexts/ApiContext';
import SelectField from '../../../componentes/Form/Fields/SelectField';
import { Grid, MenuItem, Button } from '@material-ui/core';
import { FormProviderHandles } from '../../../componentes/Form/types';
import Fornecedor from '../../../Types/Fornecedor';
import ItemDePeca from '../../../Types/ItemDePeca';

interface ItensDePecaProps {
  onSubmit?: (itemDePeca: ItemDePeca) => void;
}

const ItensDePeca: React.FC<ItensDePecaProps> = ({ onSubmit }) => {
  const [pecas, setPecas] = useState<Peca[] | undefined>(undefined);
  const [fornecedores, setForncedores] = useState<Fornecedor[] | undefined>(undefined);
  const { get } = useContext(ApiContext);
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);

  const popularPecas = useCallback(async () => {
    const pecas = await get('peca') as Peca[];
    if (pecas) {
      setPecas(pecas);
    }
  }, [get]);

  const popularFornecedores = useCallback(async () => {
    const fornecedores = await get('fornecedor') as Fornecedor[];
    if (fornecedores) {
      setForncedores(fornecedores);
    }
  }, [get]);

  useEffect(() => {
    popularPecas();
  }, [popularPecas]);

  useEffect(() => {
    popularFornecedores();
  }, [popularFornecedores]);

  const handleSubmit = useCallback((dados) => {
    if (pecas && fornecedores && onSubmit) {
      const peca = pecas[Number(dados.peca)];
      const fornecedor = fornecedores[Number(dados.fornecedor)];
      const valorUnitario = Number(dados.valorUnitario);
      const quantidade = Number(dados.quantidade);
      const valorTotal = valorUnitario * quantidade;
      onSubmit({
        peca,
        fornecedor,
        valorTotal,
        valorUnitario,
        quantidade,
      })
    }
  }, [fornecedores, onSubmit, pecas]);

  const calcularValorTotal = useCallback((event) => {
    const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
    const quantidade = Number(formRef.current.getFieldValue('quantidade'));
    formRef.current.setFieldValue('valorTotal', quantidade * valorUnitario);
  }, []);
  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Grid container spacing={2}>
        <Grid item md={4} lg={3}>
          <SelectField name="peca" fullWidth required label="Peça">
            {pecas?.map((peca, indice) => (
              <MenuItem key={indice} value={indice}>{peca.descricao}</MenuItem>
            ))}
          </SelectField>
        </Grid>
        <Grid item md={4} lg={3}>
          <SelectField name="fornecedor" fullWidth required label="Fornecedor">
            {fornecedores?.map((fornecedor, indice) => (
              <MenuItem key={indice} value={indice}>{fornecedor.nomeFantasia}</MenuItem>
            ))}
          </SelectField>
        </Grid>
        <Grid item md={2}>
          <MoneyField name="valorUnitario" fullWidth required label="Valor unitário" onChange={calcularValorTotal} />
        </Grid>
        <Grid item md={2}>
          <CampoDeTexto type="number" min={0} name="quantidade" fullWidth required label="Quantidade" onChange={calcularValorTotal} />
        </Grid>
        <Grid item md={1}>
          <MoneyField name="valorTotal" fullWidth required label="ValorTotal" />
        </Grid>
        <Grid item md={1}>
          <Button type="submit" variant="outlined">Adicionar</Button>
        </Grid>
      </Grid>
    </Form>
  );
}

export default ItensDePeca;