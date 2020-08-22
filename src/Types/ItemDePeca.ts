import Peca from "./Peca";
import Fornecedor from "./Fornecedor";

export default interface ItemDePeca{
  peca: Peca;
  idPeca?: string
  idFornecedor?: string;
  fornecedor: Fornecedor;
  valorUnitario: number;
  quantidade: number;
  valorTotal: number;
  garantia: number;
  unidadeDeGarantia: string;
}