import Oficina from "./Oficina";

export default interface Usuario{
  _id: string;
  nomeUsuario: string;
  perfil: string;
  token: string;
  oficina: Oficina;
}