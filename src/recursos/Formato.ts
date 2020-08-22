import numberMask from "./NumberMask";

export default {
  formatarData(data: Date | string) {
    if (data) {
      const dataC = new Date(data)
      return `${("0" + dataC.getUTCDate()).slice(-2)}/${("0" + (dataC.getUTCMonth() + 1)).slice(-2)}/${dataC.getUTCFullYear()}`
    }
    return "";
  },
  formatarTelefone(telefone: string) {
    if (telefone) {
      return numberMask(
        telefone,
        tamanho => tamanho < 11
          ? "(00) 0000-0000"
          : "(00) 00000-0000"
      )
    }
    return "";
  },
  formatarSexo(sexo: string) {
    if (sexo) {
      return sexo === "f" || sexo === "feminino" || sexo === "Feminino"
        ? "Feminino"
        : sexo === "m" || sexo === "masculino" || sexo === "Masculino"
          ? "Masculino"
          : ""
    }
    return "";
  },
  formatarCpfCnpj(cpfCnpj: string) {
    if (cpfCnpj) {
      return numberMask(
        cpfCnpj,
        tamanho =>
          tamanho < 12
            ? "000.000.000-00"
            : "00.000.000/0000-00"
      )
    }
    return "";
  },
  formatarMoeda(valor: string | number) {
    return Number(valor).toLocaleString(
      'pt-br',
      {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      }
    );
  }
}