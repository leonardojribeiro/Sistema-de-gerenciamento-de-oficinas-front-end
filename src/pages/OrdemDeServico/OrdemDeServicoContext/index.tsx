import React, { useState, createContext } from 'react';
import ItemDePeca from '../../../Types/ItemDePeca';
import ItemDeServico from '../../../Types/ItemDeServico';

interface OrdemDeServicoContextValues{
  itensDePeca: ItemDePeca[];
  itensDeServico: ItemDeServico[];
  setItensDePeca: React.Dispatch<React.SetStateAction<ItemDePeca[]>>;
  setItensDeServico: React.Dispatch<React.SetStateAction<ItemDeServico[]>>;
}

const OrdemDeServicoContext = createContext<OrdemDeServicoContextValues>({} as OrdemDeServicoContextValues);

export const OrdemDeServicoProvider: React.FC = ({children}) => {
  const [itensDePeca, setItensDePeca] = useState<ItemDePeca[]>([])
  const [itensDeServico, setItensDeServico] = useState<ItemDeServico[]>([])
  return (
    <OrdemDeServicoContext.Provider
      value={{
        itensDePeca, 
        itensDeServico,
        setItensDePeca,
        setItensDeServico,
      }}
    >
      {children}
    </OrdemDeServicoContext.Provider>
  );
}

export default OrdemDeServicoContext;