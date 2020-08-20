import ItemDePeca from "./ItemDePeca";
import ItemDeServico from "./ItemDeServico";
import Veiculo from "./Veiculo";

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
  veiculo: Veiculo;
}