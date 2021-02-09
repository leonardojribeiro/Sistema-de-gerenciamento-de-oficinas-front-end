export default () => {
  return new Promise(resolve => (
    setTimeout(() => resolve('ok'), 3000)
  ))
}

export const retornarAposCincoSegundos = ()=>{
  return new Promise(resolve => (
    setTimeout(() => resolve('ok'), 5000)
  ))
}


export const retornarAposDezSegundos = ()=>{
  return new Promise(resolve => (
    setTimeout(() => resolve('ok'), 10000)
  ))
}