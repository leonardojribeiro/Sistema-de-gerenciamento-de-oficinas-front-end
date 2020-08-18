import Marca from "./Marca";

export default interface Modelo{
  _id?: string;
  descricao: string;
  idMarca?: string;
  marca: Marca;
}