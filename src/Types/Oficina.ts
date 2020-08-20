import Endereco from "./Endereco";

export default interface Oficina {
  _id: string;
  nomeFantasia: string;
  razaoSocial: string;
  cpfCnpj: string;
  telefoneFixo: string;
  telefoneCelular: string;
  email: string;
  uriLogo: string;
  endereco: Endereco;
  statusOficina: string;
}