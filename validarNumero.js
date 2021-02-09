/* eslint-disable */


var exemplo = "Olá, mundo!" // exemplo é uma String
exemplo = 1                 // exemplo agora é um Number
exemplo = true              // exemplo agora é um Boolean
exemplo = {}                // exemplo agora é um Object
exemplo = []                // exemplo apora é um Array
exemplo = function () {     // exemplo agora é uma function que retorna 1+1
  return 1 + 1
}






exemplo = () => 1 + 1         // exemplo agora é uma arrow function que retorna 1+1

//valores truthy
if (true)          //retorna true
  if ({})            //retorna true
    if ([])            //retorna true
      if (42)            //retorna true
        if ("Olá, Mundo!") //retorna true
          if (new Date())    //retorna true
            if (-10)           //retorna true
              if (3.14)          //retorna true
                if (-3.14)         //retorna true
                  if (Infinity)      //retorna true
                    if (-Infinity)     //retorna true
                      //valores falsy
                      if (0)              //retorna false
                        if ("")             //retorna false
                          if (null)           //retorna false
                            if (undefined)      //retorna false
                              if (NaN)            //retorna false
                                if (false)          //retorna false

                                { }



const partes = ['ombro', 'joelho']
const musica = ['cabeça', ...partes, 'e', 'pé']
//Itens do Array musica: ['cabeça', 'ombro', 'joelho', 'e', 'pé']
const pessoa = {
  nome: 'João',
  sobrenome: 'Silva',
  sexo: 'M',
  telefoneCelular: '+55 62 12345-6789'
}
const endereco = {
  logradouro: 'Rua da paz',
  bairro: 'Centro',
  cep: '00000-000',
  cidade: 'Itaberaí',
  estado: 'Goiás'
}
const pessoaComEndereco = {
  ...pessoa,
  ...endereco,
}
//Itens do Object pessoaComEndereco: {
//  logradouro: 'Rua da paz';
//  bairro: 'Centro';
//  cep: '00000-000';
//  cidade: 'Itaberaí';
//  estado: 'Goiás';
//  nome: 'João';
//  sobrenome: 'Silva';
//  sexo: 'M';
//  telefoneCelular: '+55 62 12345-6789';
//}

musica
pessoaComEndereco


function somar(a, b) {
  return a + b
}
//Função escrita tradicionalmente.
const subtrair = (a, b) => {
  return a - b
}
//Função escrita no formato de arrow function.
const multiplicar = (a, b) => a * b
//Função escrita no formato de arrow function com o return implícito.


somar
subtrair
multiplicar


const cidades = ['Itaberaí', 'Itapuranga', 'Goiás', 'Inhumas', 'Goiânia']
let quantidadeCaracteres = cidades.map(function (cidade) {
  return cidade.length
})
//Mapeamento feito a partir de uma função tradicional.
quantidadeCaracteres = cidades.map(cidade => {
  return cidade.length
})
//Mapeamento feito a partir de uma arrow function
quantidadeCaracteres = cidades.map(cidade => cidade.length)
//Mapeamento feito a partir de uma arrow function com o return implícito.
//Em todos os casos, a varíavel quantidadeCaracteres será: [8, 10, 5, 7, 7].


const {toLocaleUpperCase} = 'sa'

const pessoa = {
  nome: 'Maria',
  idade: 20,
  sexo: 'F'
}
const { nome, idade, sexo } = pessoa
//Nesse caso, as constantes nome, idade e sexo já serão inicializadas com
//seus respectivos valores que estão no Object pessoa e poderão ser utilizadas.
//A partir desse ponto, essas constantes armazenarão os seguintes valores:
//nome = 'Maria', idade = 20, sexo = 'F'.
const nomes = ['José', 'João', 'Ana']
const [jose, joao, ana] = nomes
//Nesse caso, as constantes jose, joao e ana já serão inicializadas com
//os valores que estão no Array em suas respectivas ordens e poderão ser utilizadas.
//A partir desse ponto, essas constantes armazenarão os seguintes valores:
//jose = 'José', joao = 'João', ana= 'Ana'.


nome + idade + sexo + jose + joao + ana


export const maximo = 100000
//Exporta a constante maximo.
export const minimo = -100000
//Exporta a constante mínimo.
export function validarNumeroMaiorQueZero(numero){
  return numero > 0
}
//Exporta a função validarNumeroMaiorQueZero.
export function validarNumeroMenorQueZero(numero){
  return numero > 0
}
//Exporta a função validarNumeroMenorQueZero.
export function validarNumeroIgualAZero(numero){
  return numero === 0
}
//Exporta a função validarNumeroIgualAZero.
//Todas essas exportações serão importadas a partir do mesmo
//nome em que foram exportadas.
function validarNumero(numero){
  return numero !== NaN && numero !== undefined && numero !== null
}
export default validarNumero
//Exporta a função validarNumero como padrão desse módulo.
//Ela poderá ser importada com qualquer nome.



