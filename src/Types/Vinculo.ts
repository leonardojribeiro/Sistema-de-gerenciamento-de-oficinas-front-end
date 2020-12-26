import Cliente from "./Cliente";
import Veiculo from "./Veiculo";

export default interface Vinculo{
  _id?: String;
  vinculoInicial: Date;
  vinculoFinal?: Date;
  veiculo: Veiculo;
  cliente: Cliente;
}