import React, { memo, useContext, useEffect, useMemo, useState } from 'react';
import Dialog from '../../../componentes/Dialog';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Tabs from "@material-ui/core/Tabs";
import OrdemDeServicoContext from '../OrdemDeServicoContext';
import FormOrdemDeServico from '../FormOrdemDeServico';
import FrameItensDePeca from '../../ItensDePeca/FrameItensDePeca';
import FrameItensDeServico from '../../ItensDeServico/FrameItensDeServico';
import useQuery from '../../../hooks/useQuery';

const DialogAlterarOrdemDeServico: React.FC = () => {
  const { getOrdemDeServico } = useContext(OrdemDeServicoContext);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const id = useQuery("id");

  useEffect(() => {
    if (id) {
      getOrdemDeServico(id);
    }
  }, [getOrdemDeServico, id]);
  const isEdit = id !== null;

  const itensDePeca = useMemo(() => (
    <FrameItensDePeca />
  ), []);

  const itensDeServico = useMemo(() => (
    <FrameItensDeServico />
  ), []);

  const formOrdemDeServico = useMemo(() => (
    <FormOrdemDeServico />
  ), []);

  const tabPecas = useMemo(() => (
    <Tab label="Peças" wrapped />
  ), []);

  const tabForm = useMemo(() => (
    <Tab label="Ordem de serviço" wrapped />
  ), []);

  const tabServicos = useMemo(() => (
    <Tab label="Serviços" wrapped />
  ), []);

  return (
    <Dialog title={isEdit ? "Alterar ordem de serviço" : "Incluir ordem de serviço"} open maxWidth="lg" fullWidth fullScreen>
      <Tabs value={activeIndex} onChange={(e, v) => setActiveIndex(v)} variant="fullWidth" indicatorColor="primary" >
        {tabPecas}
        {tabForm}
        {tabServicos}
      </Tabs >
      <SwipeableViews style={{ height: "calc(100% - 64px)", }} containerStyle={{ height: "calc(100% )", }} enableMouseEvents index={activeIndex} onChangeIndex={(e) => setActiveIndex(e)} resistance animateTransitions >
        {itensDePeca}
        {formOrdemDeServico}
        {itensDeServico}
      </SwipeableViews>
    </Dialog >
  );
}

export default memo(DialogAlterarOrdemDeServico);