import Marca from "./Marca";

export default interface Peca{
  _id?: string;
  marca?: Marca;
  idMarca?: string;
  descricao: string 
}