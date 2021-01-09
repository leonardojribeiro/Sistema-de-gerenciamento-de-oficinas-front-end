import Modelo from "./Modelo";

export default interface Veiculo{
  _id?: string;
  placa: string;
  anoModelo: Date;
  anoFabricacao: Date;
  modelo: Modelo;
}