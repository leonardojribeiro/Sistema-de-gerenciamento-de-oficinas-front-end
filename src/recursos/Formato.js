import MascaraNumererica from "./MascaraNumerica";

export default {
  formatarData(data) {
    if (data) {
      const dataC = new Date(data)
      return `${("0" + dataC.getUTCDate()).slice(-2)}/${("0" + (dataC.getUTCMonth() + 1)).slice(-2)}/${dataC.getUTCFullYear()}`
    }
    return "";
  },
  formatarTelefone(telefone) {
    if (telefone) {
      return MascaraNumererica(
        telefone,
        tamanho => tamanho < 11
          ? "(00) 0000-0000"
          : "(00) 00000-0000"
      )
    }
    return "";
  },
  formatarSexo(sexo) {
    if (sexo) {
      return sexo === "f" || sexo === "feminino" || sexo === "Feminino"
        ? "Feminino"
        : sexo === "m" || sexo === "masculino" || sexo === "Masculino"
          ? "Masculino"
          : ""
    }
    return "";
  },
  formatarCpfCnpj(cpfCnpj) {
    if (cpfCnpj) {
      return MascaraNumererica(
        cpfCnpj,
        tamanho =>
          tamanho < 12
            ? "000.000.000-00"
            : "00.000.000/0000-00"
      )
    }
    return "";
  }
}