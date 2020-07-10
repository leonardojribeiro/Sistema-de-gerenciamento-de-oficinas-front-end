import { useContext, useEffect, useMemo } from 'react';

import dot from 'dot-object';
import FormContext from '../contexts/FormContext';

export default function useCampo(nome) {
  const {
    dadosIniciais,
    scopePath,
    desregistrarCampo,
    registrarCampo,
    handleSubmit,
  } = useContext(FormContext);

  if (!nome) {
    throw new Error("Você precisa fornecer a propriedade nome");
  }

  const nomeCampo = useMemo(() => {
    return scopePath ? `${scopePath}.${nome}` : nome;
  }, [nome, scopePath]);

  const valorPadrao = useMemo(() => {
    return dot.pick(nomeCampo, dadosIniciais);
  }, [nomeCampo, dadosIniciais]);

  useEffect(() => () => desregistrarCampo(nomeCampo), [
    nomeCampo,
    desregistrarCampo,
  ]);

  return {
    nomeCampo,
    registrarCampo,
    valorPadrao,
    handleSubmit
  };
}