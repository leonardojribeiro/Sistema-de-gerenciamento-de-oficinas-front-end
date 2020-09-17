import Pessoa from "./Pessoa";

export default interface Cliente extends Pessoa {
  nome: string;
  cpfCnpj: string;
  sexo: string;
  dataNascimento: Date;
}