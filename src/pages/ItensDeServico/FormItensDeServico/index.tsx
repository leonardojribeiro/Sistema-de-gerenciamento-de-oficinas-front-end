import React, { useCallback, useState, useContext, useEffect, useRef, memo } from 'react';
import { Form, MoneyField, CampoDeTexto, CampoDeSelecao } from '../../../componentes/Form';
import ApiContext from '../../../contexts/ApiContext';
import SelectField from '../../../componentes/Form/Fields/SelectField';
import { Grid, MenuItem, Button, Container } from '@material-ui/core';
import { FormProviderHandles } from '../../../componentes/Form/types';
import Servico from '../../../Types/Servico';
import Funcionario from '../../../Types/Funcionario';
import ItemDeServico from '../../../Types/ItemDeServico';
import comparar from '../../../recursos/Comparar';
import OrdemDeServicoContext from '../../OrdemDeServico/OrdemDeServicoContext';


const FormItensDeServico: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[] | undefined>(undefined);
  const [funcionarios, setFuncionarios] = useState<Funcionario[] | undefined>(undefined);
  const { get } = useContext(ApiContext);
  const formRef = useRef<FormProviderHandles>({} as FormProviderHandles);
  const { itensDeServico, setItensDeServico } = useContext(OrdemDeServicoContext);

  const popularServicos = useCallback(async () => {
    const servicos = await get('servico') as Servico[];
    if (servicos) {
      setServicos(servicos);
    }
  }, [get]);

  const popularFuncionarios = useCallback(async () => {
    const funcionarios = await get('funcionario') as Funcionario[];
    if (funcionarios) {
      setFuncionarios(funcionarios);
    }
  }, [get]);

  useEffect(() => {
    popularServicos();
  }, [popularServicos]);

  useEffect(() => {
    popularFuncionarios();
  }, [popularFuncionarios]);

  const validar = useCallback((dados: ItemDeServico) => {
    let igual = false;
    itensDeServico.forEach(itemDeServico => {
      if (comparar(itemDeServico, dados)) {
        igual = true;
      }
    })
    return igual;
  }, [itensDeServico]);

  const handleSubmit = useCallback((dados) => {
    if (servicos && funcionarios) {
      const itemDeServico = {
        servico: servicos[Number(dados.servico)],
        funcionario: funcionarios[Number(dados.funcionario)],
        valorUnitario: Number(dados.valorUnitario),
        garantia: Number(dados.garantia),
        unidadeDeGarantia: dados.unidadeDeGarantia,
        quantidade: Number(dados.quantidade),
        valorTotal: Number(dados.valorUnitario) * Number(dados.quantidade),
      } as ItemDeServico;
      if (!validar(itemDeServico)) {
        setItensDeServico((ItensDeServico) => [...ItensDeServico, itemDeServico])
      }
    }
  }, [validar, funcionarios, servicos, setItensDeServico]);

  const calcularValorTotal = useCallback((event) => {
    const valorUnitario = Number(formRef.current.getFieldValue('valorUnitario'));
    const quantidade = Number(formRef.current.getFieldValue('quantidade'));
    formRef.current.setFieldValue('valorTotal', quantidade * valorUnitario);
  }, []);

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={6} md={4} lg={3}>
            <SelectField name="servico" fullWidth required label="Serviço">
              {servicos?.map((servico, indice) => (
                <MenuItem key={indice} value={indice}>{servico.descricao}</MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item sm={6} md={4} lg={3}>
            <SelectField name="funcionario" fullWidth required label="Funcionário">
              {funcionarios?.map((funcionario, indice) => (
                <MenuItem key={indice} value={indice}>{funcionario.nome}</MenuItem>
              ))}
            </SelectField>
          </Grid>
          <Grid item md={2}>
            <CampoDeTexto type="number" name="garantia" fullWidth required label="Garantia" onChange={calcularValorTotal} />
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
            <CampoDeTexto type="number" name="quantidade" fullWidth required label="Quantidade" onChange={calcularValorTotal} />
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

export default memo(FormItensDeServico);