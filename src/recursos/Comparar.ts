import dot from "dot-object";
import validacao from "./Validacao";

const comparar = (original: object | any, novos: object | any) => {
  let igual = true;
  for (let key in novos) {
    let valorNovo = dot.pick(key, novos);
    let valorOriginal = dot.pick(key, original);
    if (valorNovo instanceof Object) {
      if (!comparar(valorOriginal, valorNovo)) {
        igual = false;
      }
    }
    else {
      if (String(valorNovo) !== String(valorOriginal)) {
        if (validacao.validarStringData(valorOriginal)) {
          if (valorOriginal.split && valorOriginal.split("T")[0] !== valorNovo.split("T")[0]) {
            igual = false;
          }
        }
        else {
          igual = false;
        }
      }
    }
  }
  return igual;
};

export default comparar;