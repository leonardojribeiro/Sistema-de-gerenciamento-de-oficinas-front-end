export default interface Marca{
  _id ?: string;
  descricao: string;
  uriLogo: string;
  logomarca?: [File | null];
}