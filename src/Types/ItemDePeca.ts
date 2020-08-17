import Peca from "./Peca";
import Fornecedor from "./Fornecedor";

export default interface ItemDePeca{
  peca: Peca;
  fornecedor: Fornecedor;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
}