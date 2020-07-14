const { useContext } = require("react");
const { default: AuthContext } = require("../contexts/AuthContext");

export default function useAuth() {
  const { usuario } = useContext(AuthContext);
  const idOficina = usuario ? usuario.idOficina._id : null;
  const token = usuario ? usuario.token : null;

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

  return {
    usuario,
    idOficina,
    token,
  }
}