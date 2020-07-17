import React, { createContext, useRef, forwardRef, useImperativeHandle} from "react";
import dot from 'dot-object';

const FormularioContexto = createContext();

export const FormularioProvedor = forwardRef(({dadosIniciais = {}, aoEnviar, children }, formRef) => {
  const campos = useRef([]);

  function registrarCampo(campo){
    campos.current.push(campo);
  }

  function desregistrarCampo(nomeCampo){
    const indiceCampo = campos.current.findIndex(
      campo => campo.nome === nomeCampo,
    );
    if (indiceCampo > -1) {
      campos.current.splice(indiceCampo, 1);
    }
  }

  function validar() {
    for (let campo of campos.current) {
      if (campo.validar && campo.validar() === false) {
        return false;
      }
    }
    return true;
  }

  function getValorCampo({ref, getValor, caminho}){
    if(getValor){

    }
    return caminho && dot.pick(caminho, ref);
  }

  function converterDados() {
    const dados = {};
    campos.current.forEach(campo => {
      dados[campo.nome] = getValorCampo(campo);
    });
    dot.object(dados);
    return dados;
  }

  function manipularEnvio(evento) {
    if (evento) {
      evento.preventDefault();
    }
    if (!validar()) {
      return null;
    }
    aoEnviar(converterDados(), evento);
  }

  useImperativeHandle(formRef, () => ({
    validar,
    converterDados,
    enviarFormulario() {
      return manipularEnvio();
    }
  }));

  return (
    <FormularioContexto.Provider
      value={{
        dadosIniciais,
        registrarCampo,
        desregistrarCampo,
        caminho: '',
        manipularEnvio,
      }}
    >
      {children}
    </FormularioContexto.Provider>
  );

});

export default FormularioContexto;