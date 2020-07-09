import React, { useEffect, createContext, useRef, forwardRef, useImperativeHandle } from "react";
import dot from 'dot-object';

const FormContext = createContext();

export const FormProvider = forwardRef(({dadosIniciais = {}, onSubmit, children }, formRef) => {
  const campos = useRef([]);

  function registrarCampo(campo){
    campos.current.push(campo);
  }

  useEffect(() => {
    console.log(campos);
  }, [campos])

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
    console.log(ref, caminho)
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

  function handleSubmit(evento) {
    if (evento) {
      evento.preventDefault();
    }
    if (!validar()) {
      return null;
    }
    return converterDados();
  }

  useImperativeHandle(formRef, () => ({
    validar,
    converterDados,
    submitForm() {
      return handleSubmit();
    }
  }));

  return (
    <FormContext.Provider
      value={{
        dadosIniciais,
        registrarCampo,
        desregistrarCampo,
        scopePath: '',
        handleSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );

});

export default FormContext;