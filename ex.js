/* eslint-disable no-unused-vars */


import validar, { validarNumeroMaiorQueZero } from './validarNumero'
//Importa a função "validarNumero" como "validar", pois ela é exportada como default 
//do módulo. Após importar o recurso default, é possivel importar
//os outros recursos que foram exportados de maneira nomeada.
import { Typography as Text } from '@material-ui/core'
//É possível alterar o nome de um recurso exportado de maneira nomeada, com a 
//finalidade de evitar conflitos com os recursos já existentes ou importados,
//bastando adicionar o modificador "as" e o nome que o recurso deverá ter.
//Nesse caso, o recurso "Typography" será importado como "Text". 
import * as validarNumero from './validarNumero'
//Ainda é possível importar o módulo em um único objeto, nesse caso "validarNumero".
//Todos os recursos serão acessados de maneira semelhante como ocorre nos objetos 
//comuns, excetuando do recurso exportado como default, que poderá ser acessado 
//através de "validarNumero.default"



import recursoAssincrono,
{ retornarAposCincoSegundos, retornarAposDezSegundos } from './recursoAssincrono'

function consumirRecursoAssincronoTradicionalmente() {
  recursoAssincrono()
    .then(resultado => {
      fazerAlgoComResultado(resultado)
      fazerAlgoQueDependaDoResultado()
      retornarAposCincoSegundos
        .then(resultadoCincoSegundos => {
          fazerAlgoDepoisDeCincoSegundos(resultadoCincoSegundos)
          retornarAposDezSegundos
            .then(resultadoDezSegundos => {
              fazerAlgoDepoisDeDezSegundos(resultadoDezSegundos)
            })
            .catch(erro => fazerAlgoComErro(erro))
          //A função continua mesmo sem o retorno do "retornarAposDezSegundos".
        })
        .catch(erro => fazerAlgoComErro(erro))
      //A função continua mesmo sem o retorno de "retornarAposCincoSegundos".
    })
    .catch(erro => fazerAlgoComErro(erro))
  //A função continua mesmo sem o retorno do "recursoAssincrono".
}
async function consumirRecursoAssincronoComAwait() {
  try {
    const resultado = await recursoAssincrono()
    //A função fica pausada até o retorno do "recursoAssincrono".
    fazerAlgoComResultado(resultado)
    fazerAlgoQueDependaDoResultado()
    const resultadoCincoSegundos = await retornarAposCincoSegundos()
    //A função fica pausada até o retorno de "retornarAposCincoSegundos".
    fazerAlgoDepoisDeCincoSegundos(resultadoCincoSegundos)
    const resultadoDezSegundos = await retornarAposDezSegundos()
    //A função fica pausada até o retorno de "retornarAposDezSegundos".
    fazerAlgoDepoisDeDezSegundos(resultadoDezSegundos)
  }
  catch (erro) {
    fazerAlgoComErro(erro)
  }
}



function fazerAlgoDepoisDeCincoSegundos() {

}

function fazerAlgoDepoisDeDezSegundos() {

}

function fazerAlgoQueDependaDoResultado() {

}

function fazerAlgoComResultado(resultado) {

}

function fazerAlgoComErro(erro) {

}

consumirRecursoAssincronoComAwait()
consumirRecursoAssincronoTradicionalmente()














validarNumero.default(512)




validarNumero.default()







validar()
validarNumeroIgualAZero()
validarNumeroMaiorQueZero()
validarNumeroMenorQueZero()
isIgualAZero()
Text

