import React, { useCallback, useState, useContext, useEffect, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeTexto, CampoDeSelecao } from '../../../../componentes/Form';
import Peca from '../../../../Types/Peca';
import ApiContext from '../../../../contexts/ApiContext';
import SelectField from '../../../../componentes/Form/Fields/SelectField';
import { Grid, MenuItem, Button, Container } from '@material-ui/core';
import { FormProviderHandles } from '../../../../componentes/Form/types';
import Fornecedor from '../../../../Types/Fornecedor';
import OrdemDeServicoContext from '../../OrdemDeServicoContext';
import ItemDePeca from '../../../../Types/ItemDePeca';
import comparar from '../../../../recursos/Comparar';

const FormItensDePeca: React.FC = () => {
  const [pecas, setPecas] = useState<Peca[] | undefined>(undefined);
  const [fornecedores, setForncedores] = useState<Fornecedor[] | undefined>(undefined);
  const { get } = useContext(ApiContext);
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const { itensDePeca, setItensDePeca } = useContext(OrdemDeServicoContext);

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

  const validar = useCallback((dados: ItemDePeca) => {
    let igual = false;
    itensDePeca.forEach(itemDePeca => {
      if (comparar(itemDePeca, dados)) {
        igual = true;
      }
    })
    return igual;
  }, [itensDePeca]);

  const handleSubmit = useCallback((dados) => {
    if (pecas && fornecedores) {
      const itemDePeca = {
        peca: pecas[Number(dados.peca)],
        fornecedor: fornecedores[Number(dados.fornecedor)],
        valorUnitario: Number(dados.valorUnitario),
        garantia: Number(dados.garantia),
        unidadeDeGarantia: dados.unidadeDeGarantia,
        quantidade: Number(dados.quantidade),
        valorTotal: Number(dados.valorUnitario) * Number(dados.quantidade),
      } as ItemDePeca;
      if (!validar(itemDePeca)) {
        setItensDePeca((ItensDePeca) => [...ItensDePeca, itemDePeca])
      }
    }
  }, [fornecedores, pecas, setItensDePeca, validar]);

  const calcularValorTotal = useCallback((event) => {
    const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
    const quantidade = Number(formRef.current.getFieldValue('quantidade'));
    formRef.current.setFieldValue('valorTotal', quantidade * valorUnitario);
  }, []);
  return (
    <Form onSubmit={handleSubmit} ref={formRef} >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
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
            <CampoDeTexto type="number" min={0} name="garantia" fullWidth required label="Garantia" onChange={calcularValorTotal} />
          </Grid>
          <Grid item md={1}>
            <CampoDeSelecao name="unidadeDeGarantia" label="Tipo" fullWidth required>
              <MenuItem value="0">Km</MenuItem>
              <MenuItem value="1">Dias</MenuItem>
            </CampoDeSelecao>
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
      </Container>
    </Form>
  );
}

export default memo(FormItensDePeca);