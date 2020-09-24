import Servico from "./Servico";
import Funcionario from "./Funcionario";

export default interface ItemDeServico{
  _id: string | undefined;
  servico: Servico;
  funcionario: Funcionario;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
  garantia: number;
  unidadeDeGarantia: string;
}