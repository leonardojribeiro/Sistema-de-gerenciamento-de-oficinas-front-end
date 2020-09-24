import ItemDePeca from "./ItemDePeca";
import ItemDeServico from "./ItemDeServico";
import Veiculo from "./Veiculo";
import Peca from "./Peca";
import Servico from "./Servico";
import Fornecedor from "./Fornecedor";
import Funcionario from "./Funcionario";

export default interface OrdemDeServico{
  _id: string;
  dataDeRegistro: Date;
  dataDeInicio: Date;
  dataDeConclusao: Date;
  andamento: number;
  valorTotalDosServicos: number;
  valorTotalDasPecas: number;
  desconto: number;
  valorTotal: number;
  categoria: string;
  status: string;
  sintoma: string;
  itensDeServico: ItemDeServico[] | undefined;
  itensDePeca: ItemDePeca[] | undefined;
  pecas: Peca[] | undefined;
  fornecedores: Fornecedor[] | undefined;
  servicos: Servico[] | undefined;
  funcionarios: Funcionario[] | undefined;
  veiculo: Veiculo;
}