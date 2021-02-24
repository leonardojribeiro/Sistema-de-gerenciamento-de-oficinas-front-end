import React, { useEffect, useState } from 'react'

class ExemploClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = { //Inicializa o estado.
      counter: 0,
    }
  }
  componentDidMount() { // É executada toda vez que o componente é montado.
    setInterval(() => {
      this.setState(() => {
        return {
          counter: this.state.counter + 1
        }
      })
    }, 1000)
  }
  render() { // Retorna o que deve ser renderizado.
    return (
      <p>Tempo: {this.state.counter} segundos</p>
    )
  }
}

function ExemploFunction(props) {
  const [counter, setCounter] = useState(0);//Inicializa o estado.
  useEffect(() => {// É executada toda vez que o componente é montado.
    setInterval(() => {
      setCounter(counter => counter + 1);
    }, 1000)
  }, [])
  return ( // Retorna o que deve ser renderizado.
    <p>Tempo: {counter} segundos</p>
  )
}




export default ExemploFunction
