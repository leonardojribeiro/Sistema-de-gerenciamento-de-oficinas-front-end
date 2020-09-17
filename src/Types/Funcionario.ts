import Especialidade from "./Especialidade";
import Pessoa from "./Pessoa";

export default interface Funcionario extends Pessoa{
  nome: string;
  cpf: string;
  sexo: string;
  dataNascimento: Date;
  especialidades: Especialidade[];
}