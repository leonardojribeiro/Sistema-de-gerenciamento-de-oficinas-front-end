import Fornecedor from "../Types/Fornecedor";
import Funcionario from "../Types/Funcionario";
import ItemDePeca from "../Types/ItemDePeca";
import ItemDeServico from "../Types/ItemDeServico";

interface AgrupamentoPecasPorFornecedor extends Fornecedor {
  itensDePeca: ItemDePeca[];
}

interface AgrupamentoServicosPorFuncionario extends Funcionario {
  itensDeServico: ItemDeServico[];
}

export const agruparPecasPorFornecedor = (itensDePeca: ItemDePeca[]) => {
  const agrupamentos: AgrupamentoPecasPorFornecedor[] = [];
  itensDePeca?.forEach((itemDePeca) => {
    if (agrupamentos.findIndex((agrupamento) =>
      agrupamento._id === itemDePeca.fornecedor._id
    ) === -1) {
      agrupamentos.push({ ...itemDePeca.fornecedor, itensDePeca: [] });
    }
  })
  agrupamentos.forEach((agrupamento) => {
    itensDePeca?.forEach((itemDePeca, indice) => {
      if (agrupamento._id === itemDePeca.fornecedor._id && itensDePeca) {
        agrupamento.itensDePeca.push(itensDePeca[indice])
      }
    })
  });
  return agrupamentos;
}

export const agruparServicosPorFuncionario = (itensDeServico: ItemDeServico[]) => {
  const agrupamentos: AgrupamentoServicosPorFuncionario[] = [];
  itensDeServico?.forEach((itemDeServico) => {
    if (agrupamentos.findIndex((agrupamento) =>
      agrupamento._id === itemDeServico.funcionario._id
    ) === -1) {
      agrupamentos.push({ ...itemDeServico.funcionario, itensDeServico: [] });
    }
  })
  agrupamentos.forEach((agrupamento) => {
    itensDeServico?.forEach((itemDeServico, indice) => {
      if (agrupamento._id === itemDeServico.funcionario._id && itensDeServico) {
        agrupamento.itensDeServico.push(itensDeServico[indice])
      }
    })
  });
  return agrupamentos;
}
