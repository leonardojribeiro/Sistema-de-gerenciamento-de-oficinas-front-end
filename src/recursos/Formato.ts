import ptLocale from 'date-fns/locale/pt-BR';
import datefns from '@date-io/date-fns';
import numberMask from "./NumberMask";

export function formatarData(date: Date, formato?: 'ano' | 'completa' | 'abreviada'): string {
  if (!date) {
    return "";
  }
  switch (formato) {
    case undefined: return new datefns({ locale: ptLocale }).format(new Date(date), "P");
    case 'ano': return new datefns({ locale: ptLocale }).format(new Date(date), "u");
    case 'completa': return new datefns({ locale: ptLocale }).format(new Date(date), "PPPP");
    case 'abreviada': return new datefns({ locale: ptLocale }).format(new Date(date), "P");
  }


}

export function formatarMoeda(valor: string | number) {
  return Number(valor).toLocaleString(
    'pt-br',
    {
      minimumIntegerDigits: 1,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }
  );
}

export function formatarPlaca(placa: string) {
  if (!placa) {
    return ""
  }
  let formatado = placa.replace(/[^a-zA-Z0-9]/g, '').toLocaleUpperCase().substring(0, 7);
  if (placa.length > 3) {
    if (/\d/.test(formatado.charAt(3))) {
      const letrasAposNumero = formatado.substring(4).match(/[A-Z]/g)
      if (letrasAposNumero) {
        if (letrasAposNumero.length < 2) {
          const letrasAJAposNumero = formatado.substring(4).match(/[A-J]/g)
          if (letrasAJAposNumero) {
            if (formatado.length === 7 && !/\d/.test(formatado.charAt(6))) {
              return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
            }
            return formatado;
          }
          else {
            return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
          }
        }
        return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
      }
      else {
        return `${formatado.substring(0, 3)}-${formatado.substring(3)}`
      }
    }
    else {
      return formatado.substring(0, 3);
    }
  }
  else {
    const numeros = formatado.match(/[0-9]/g)
    if (numeros) {
      return '';
    }
  }
  return formatado
}

export function formatarTipoOrdemDeServico(tipo: string) {
  switch (tipo) {
    case "0": return "Predetiva";
    case "1": return "Corretiva";
    case "2": return "Preventiva";
    default: return "";
  }
}
export function formatarTipoGarantia(tipo: string) {
  switch (tipo) {
    case "0": return "Km";
    case "1": return "Dias";
    default: return "";
  }
}

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
  },

  formatarPlaca(placa: string) {
    if (!placa) {
      return ""
    }
    let formatado = placa.replace(/[^a-zA-Z0-9]/g, '').toLocaleUpperCase().substring(0, 7);
    if (placa.length > 3) {
      if (/\d/.test(formatado.charAt(3))) {
        const letrasAposNumero = formatado.substring(4).match(/[A-Z]/g)
        if (letrasAposNumero) {
          if (letrasAposNumero.length < 2) {
            const letrasAJAposNumero = formatado.substring(4).match(/[A-J]/g)
            if (letrasAJAposNumero) {
              if (formatado.length === 7 && !/\d/.test(formatado.charAt(6))) {
                return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
              }
              return formatado;
            }
            else {
              return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
            }
          }
          return `${formatado.substring(0, 3)}-${formatado.substring(3, formatado.length - 1)}`
        }
        else {
          return `${formatado.substring(0, 3)}-${formatado.substring(3)}`
        }
      }
      else {
        return formatado.substring(0, 3);
      }
    }
    else {
      const numeros = formatado.match(/[0-9]/g)
      if (numeros) {
        return '';
      }
    }
    return formatado
  }
}