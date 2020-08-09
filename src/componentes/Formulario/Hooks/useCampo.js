import { useContext, useEffect, useMemo } from 'react';

import dot from 'dot-object';
import FormularioContexto from '../Contexto/FormularioContexto';

export default function useCampo(nome) {
  const {
    dadosIniciais,
    caminho,
    desregistrarCampo,
    registrarCampo,
    handleSubmit,
  } = useContext(FormularioContexto);

  if (!nome) {
    throw new Error("Você precisa fornecer a propriedade nome");
  }

  const nomeCampo = useMemo(() => {
    return caminho? `${caminho}.${nome}` : nome;
  }, [nome, caminho]);

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