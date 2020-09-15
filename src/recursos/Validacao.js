function validaCpf(cpf) {
  let soma = 0;
  let peso = 10;
  let resto;
  let dv1;
  let dv2;
  if (!cpf || cpf.length !== 11
    || cpf === "00000000000"
    || cpf === "11111111111"
    || cpf === "22222222222"
    || cpf === "33333333333"
    || cpf === "44444444444"
    || cpf === "55555555555"
    || cpf === "66666666666"
    || cpf === "77777777777"
    || cpf === "88888888888"
    || cpf === "99999999999") {
    return false;
  }
  //valida o primeiro dígito
  for (let i = 0; i < 9; i++) {
    soma += (parseInt(cpf.charAt(i)) * peso);
    peso--;
  }
  resto = 11 - (soma % 11);
  dv1 = (resto === 10 || resto === 11) ? 0 : resto;
  //valida o segundo digito
  soma = 0;
  peso = 11;
  for (let i = 0; i < 10; i++) {
    soma += (parseInt(cpf.charAt(i)) * peso);
    peso--;
  }
  resto = 11 - (soma % 11);
  dv2 = (resto === 10 || resto === 11) ? 0 : resto;
  return (dv1 === parseInt(cpf.charAt(9)) && dv2 === parseInt(cpf.charAt(10)));
}

function validaCnpj(cnpj) {
  let soma = 0;
  let peso = 5;
  let resto;
  let dv1;
  let dv2;
  if (!cnpj || cnpj.length !== 14
    || cnpj === "00000000000000"
    || cnpj === "11111111111111"
    || cnpj === "22222222222222"
    || cnpj === "33333333333333"
    || cnpj === "44444444444444"
    || cnpj === "55555555555555"
    || cnpj === "66666666666666"
    || cnpj === "77777777777777"
    || cnpj === "88888888888888"
    || cnpj === "99999999999999") {
    return false;
  }
  for (let i = 0; i < 12; i++) {
    soma += (parseInt(cnpj.charAt(i)) * peso);
    peso--;
    if (peso < 2) {
      peso = 9;
    }
  }
  resto = (soma % 11)
  dv1 = (resto < 2) ? 0 : 11 - resto;
  soma = 0;
  peso = 6;
  for (let i = 0; i < 13; i++) {
    soma += (parseInt(cnpj.charAt(i)) * peso);
    peso--;
    if (peso < 2) {
      peso = 9;
    }
  }
  resto = (soma % 11)
  dv2 = (resto < 2) ? 0 : 11 - resto;
  return (dv1 === parseInt(cnpj.charAt(12)) && dv2 === parseInt(cnpj.charAt(13)));
}

function validarCpfCnpj(cpfCnpj) {
  if (!cpfCnpj) {
    return false;
  }
  let regex = new RegExp(/[^\d]+/g); //somente números
  let cpfCnpjFinal = cpfCnpj.replace(regex, "");
  if (cpfCnpjFinal.length === 11) {
    return validaCpf(cpfCnpjFinal);
  }
  if (cpfCnpjFinal.length === 14) {
    return validaCnpj(cpfCnpjFinal);
  }
  return false;
};


export function validarNome(nome) {
  return nome.match(/^[A-ZÀ-Ÿ][A-zÀ-ÿ']+\s([A-zÀ-ÿ']\s?)*[A-ZÀ-Ÿ][A-zÀ-ÿ']+$/);
}

function validarEmail(email) {
  let regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(email);
}

function validarTelefone(telefone) {
  return telefone.length === 14 || telefone.length === 15
}

function validarTexto(texto) {
  return texto.length > 0;
}

function validarCep(cep) {
  return cep.length === 9;
}

function validarNumero(numero) {
  return numero !== "";
}

function validarStringData(data) {
  if (/([0-9]{4})-([0-9]{2})-([0-9]{2})/.test(data)) {
    return !!new Date(data).getTime();
  }
  return false;
}

const validacao = {
  validarCpfCnpj,
  validarNome,
  validarEmail,
  validarTelefone,
  validarTexto,
  validarCep,
  validarNumero,
  validarStringData,
}

export default validacao;