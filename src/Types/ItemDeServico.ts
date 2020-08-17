import Servico from "./Servico";
import Funcionario from "./Funcionario";

export default interface ItemDeServico{
  servico: Servico;
  funcionario: Funcionario;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
}