import Pessoa from "./Pessoa";

export default interface Fornecedor extends Pessoa{
  nomeFantasia: string;
  razaoSocial: string;
  cpfCnpj: string;
}