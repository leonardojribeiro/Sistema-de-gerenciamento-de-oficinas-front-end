import StringMask from 'string-mask';

export default function MascaraNumererica(valor , mascara ) {
  let regex = new RegExp(/[^\d]+/g); //somente números
  valor = valor.replace(regex, ""); //valores não numéricos são substituídos
  let formato = mascara(valor.length);//chama o método que irá retornar a máscara
  let final = new StringMask(formato).apply(valor) //cria uma máscara e aplica no valor
  while (final.length > 0 && regex.test(final.substr(final.length - 1))) { //remove o último 
    final = final.substr(0, final.length - 1);                             //caractere não numérico
    regex = new RegExp(/[^\d]+/g);
  }
  return final ;
}