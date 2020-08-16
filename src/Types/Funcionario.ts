import Endereco from "./Endereco";
import Especialidade from "./Especialidade";

export default interface Funcionario{
  _id?: string;
  nome: string;
  cpf: string;
  sexo: string;
  dataNascimento: Date;
  telefoneFixo?: string;
  telefoneCelular: string;
  email: string;
  especialidades: Especialidade[];
  endereco: Endereco;
}