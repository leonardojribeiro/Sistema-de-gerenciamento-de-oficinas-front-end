import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { forwardRef } from 'react';

// import { Container } from './styles';

const Text = forwardRef((props, ref)=>{
  const [v, setV] = useState("");
  const validar = () =>{

  }
  
  return(
    <input ref={ref} value={v} onChange={(e)=>setV(e.target.value)}/>
  )
});

function Teste() {
  const ref = useRef();

  const focar = ()=>{
    ref.current.focus();
  }

  const validar = ()=>{
    console.log(ref.current);
  }

  return (
    <>
    <Text ref={ref}/>
    <button onClick={focar}>
      focar
    </button>
    <button onClick={validar}>
      validar
    </button>
    </>
  );
}

export default Teste;