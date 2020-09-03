import React, { useState, createContext, useCallback, useContext } from 'react';
import ItemDePeca from '../../../Types/ItemDePeca';
import ItemDeServico from '../../../Types/ItemDeServico';
import ApiContext from '../../../contexts/ApiContext';

interface OrdemDeServicoContextValues {
  itensDePeca: ItemDePeca[];
  itensDeServico: ItemDeServico[];
  indexTab: number;
  valorTotalPecas: () => number;
  valorTotalServicos: () => number;
  setItensDePeca: React.Dispatch<React.SetStateAction<ItemDePeca[]>>;
  setItensDeServico: React.Dispatch<React.SetStateAction<ItemDeServico[]>>;
  setIndexTab: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: (dados: any) => void;
  removerItemDePeca: (index: number) => void;
  alterarItemDePeca: (index: number) => void;
  itemDePecaSelecionado: number | undefined;
  setItemDePecaSelecionado: React.Dispatch<React.SetStateAction<number | undefined>>;
  itemDeServicoSelecionado: number | undefined;
  alterarItemDeServico: (index: number) => void;
  removerItemDeServico: (index: number) => void;
  setItemDeServicoSelecionado:React.Dispatch<React.SetStateAction<number | undefined>>;
}

const OrdemDeServicoContext = createContext<OrdemDeServicoContextValues>({} as OrdemDeServicoContextValues);

export const OrdemDeServicoProvider: React.FC = ({ children }) => {
  const [itensDePeca, setItensDePeca] = useState<ItemDePeca[]>([]);
  const [itemDePecaSelecionado, setItemDePecaSelecionado] = useState<number | undefined>();
  const [itemDeServicoSelecionado, setItemDeServicoSelecionado] = useState<number | undefined>();
  const [itensDeServico, setItensDeServico] = useState<ItemDeServico[]>([]);
  const [indexTab, setIndexTab] = useState<number>(1);

  const { post } = useContext(ApiContext);

  const validar = useCallback(() => {
    if (itensDeServico.length) {
      return true;
    }
    else {
      setIndexTab(2);
      return false;
    }
  }, [itensDeServico.length])

  const handleSubmit = useCallback(async (dados) => {
    if (validar()) {
      dados.itensDeServico = itensDeServico.map(itemDeServico => {
        return {
          servico: itemDeServico.servico._id,
          funcionario: itemDeServico.funcionario._id,
          garantia: itemDeServico.garantia,
          unidadeDeGarantia: itemDeServico.unidadeDeGarantia,
          valorUnitario: itemDeServico.valorUnitario,
          quantidade: itemDeServico.quantidade,
          valorTotal: itemDeServico.valorTotal
        }
      });
      dados.itensDePeca = itensDePeca.map(itemDePeca => {
        return {
          peca: itemDePeca.peca._id,
          fornecedor: itemDePeca.fornecedor._id,
          garantia: itemDePeca.garantia,
          unidadeDeGarantia: itemDePeca.unidadeDeGarantia,
          valorUnitario: itemDePeca.valorUnitario,
          quantidade: itemDePeca.quantidade,
          valorTotal: itemDePeca.valorTotal
        }
      });
      console.log(dados);
      await post('ordemdeservico', dados);
    }
  }, [itensDePeca, itensDeServico, post, validar]);

  const valorTotalPecas = useCallback(() => {
    let valorTotal = 0;
    itensDePeca.forEach(itemDePeca => {
      valorTotal = valorTotal + itemDePeca.valorTotal;
    })
    return valorTotal
  }, [itensDePeca])

  const valorTotalServicos = useCallback(() => {
    let valorTotal = 0;
    itensDeServico.forEach(itemDeServico => {
      valorTotal = valorTotal + itemDeServico.valorTotal;
    })
    return valorTotal
  }, [itensDeServico])

  const removerItemDePeca = useCallback((index: number) => {
    setItemDePecaSelecionado(undefined)
    setItensDePeca([...itensDePeca.slice(0, index), ...itensDePeca.slice(index + 1)])
  }, [itensDePeca]);

  const alterarItemDePeca = (index: number) => {
    setItemDePecaSelecionado(index);
  }

  const removerItemDeServico = useCallback((index: number) => {
    setItemDeServicoSelecionado(undefined)
    setItensDeServico([...itensDeServico.slice(0, index), ...itensDeServico.slice(index + 1)])
  }, [itensDeServico]);

  const alterarItemDeServico = (index: number) => {
    setItemDeServicoSelecionado(index);
  }

  return (
    <OrdemDeServicoContext.Provider
      value={{
        itensDePeca,
        itensDeServico,
        indexTab,
        valorTotalPecas,
        valorTotalServicos,
        setItensDePeca,
        setItensDeServico,
        setIndexTab,
        handleSubmit,
        alterarItemDePeca,
        removerItemDePeca,
        itemDePecaSelecionado,
        setItemDePecaSelecionado,
        itemDeServicoSelecionado,
        setItemDeServicoSelecionado,
        alterarItemDeServico,
        removerItemDeServico,
      }}
    >
      {children}
    </OrdemDeServicoContext.Provider>
  );
}

export default OrdemDeServicoContext;