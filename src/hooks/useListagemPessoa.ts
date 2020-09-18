import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ApiContext from "../contexts/ApiContext";


interface Lista<T> {
  pessoas: T[];
  total: number;
}

export default function usePessoa<T>(dominio: "funcionario" | "cliente" | "fornecedor") {
  const [lista, setLista] = useState<Lista<T>>({} as Lista<T>);
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const consultaValues = useRef();

  const getPessoa = useCallback((resposta: any) => {
    switch (dominio) {
      case "cliente": {
        return resposta.clientes;
      }
      case "fornecedor": {
        return resposta.fornecedores;
      }
      case "funcionario": {
        return resposta.funcionarios;
      }
    }
  }, [dominio]);

  const listar = useCallback(async () => {
    if (!consultaValues.current) {
      const resposta = await get(`${dominio}?pagina=${page}&limite=20`) as any;
      if (resposta) {
        setLista({
          total: resposta.total,
          pessoas: getPessoa(resposta),
        } as Lista<T>);
      }
    }
  }, [dominio, get, getPessoa, page]);

  const manipularBusca = useCallback(async (dados) => {
    consultaValues.current = dados;
    const resposta = await get(`${dominio}/consulta?${dados.filtro}=${dados.consulta}&limite=20&pagina=${page}`) as any;
    if (resposta) {
      setLista({
        total: resposta.total,
        pessoas: getPessoa(resposta),
      } as Lista<T>);
    }
  }, [dominio, get, getPessoa, page]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  useEffect(()=>{
    if(consultaValues.current){
      manipularBusca(consultaValues.current)
    }
  },[manipularBusca, page])

  return {
    ...lista,
    page,
    handlePageChange,
    manipularBusca, 
    listar,
  }
}