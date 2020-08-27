import Peca from "./Peca";
import Fornecedor from "./Fornecedor";

export default interface ItemDePeca {
  _id?: number | string;
  peca: Peca;
  fornecedor: Fornecedor;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
  garantia: number;
  unidadeDeGarantia: string;
}