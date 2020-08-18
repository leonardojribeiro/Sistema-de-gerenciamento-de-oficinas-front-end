import Endereco from "./Endereco";

export default interface Cliente {
  _id?: string;
  nome: string;
  cpfCnpj: string;
  sexo: string;
  dataNascimento: Date;
  telefoneFixo?: string;
  telefoneCelular: string;
  email: string;
  endereco: Endereco;
}