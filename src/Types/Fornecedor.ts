import Endereco from "./Endereco";

export default interface Fornecedor{
  _id?: string;
  nomeFantasia: string;
  razaoSocial: string;
  cpfCnpj: string;
  telefoneFixo: string;
  telefoneCelular: string;
  email: string;
  endereco: Endereco;
}