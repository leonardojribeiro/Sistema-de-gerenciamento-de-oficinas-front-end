import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const { usuario, } = useContext(AuthContext);



  // function teste() {
  //   String(token).split(".")
  //   var base64Url = token.split('.')[1];
  //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));

  //   return JSON.parse(jsonPayload)
  // }
  // var test = new Date();
  // test.setTime(teste().iat*1000)
  // console.log(test, teste())

  const logado = !!usuario && usuario._id;
  const auth = `Bearer ${usuario && usuario.token}`;

  return {
    usuario,
    token: auth,
    logado
  }
}