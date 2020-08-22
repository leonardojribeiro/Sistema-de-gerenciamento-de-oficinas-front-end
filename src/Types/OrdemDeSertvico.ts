import ItemDePeca from "./ItemDePeca";
import ItemDeServico from "./ItemDeServico";
import Veiculo from "./Veiculo";
import Peca from "./Peca";
import Servico from "./Servico";
import Fornecedor from "./Fornecedor";
import Funcionario from "./Funcionario";

export default interface OrdemDeServico{
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
  itensDeServico: ItemDeServico[];
  itensDePeca: ItemDePeca[];
  pecas: Peca[];
  fornecedores: Fornecedor[];
  servicos: Servico[];
  funcionarios: Funcionario[];
  veiculo: Veiculo;
}