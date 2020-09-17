import Endereco from "./Endereco";

export default interface Pessoa{
  _id?: string;
  telefoneFixo?: string;
  telefoneCelular: string;
  email: string;
  endereco: Endereco;
}