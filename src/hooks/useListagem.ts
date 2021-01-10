import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ApiContext from "../contexts/ApiContext";
import WebSocketContext from "../contexts/WebSocketContext";
import Query from "../Types/Query";

interface ListaItens<T> {
  itens: T[];
  total: number
}

export default function useListagem<T = any>(pathToItens: string, dominio: string) {
  const [itens, setItens] = useState<ListaItens<T>>({ total: 1, itens: [] });
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const consultaValues = useRef<any>();
  const { webSocket } = useContext(WebSocketContext);
  const componentMounted = useRef<Boolean>(false);

  useEffect(() => {
    componentMounted.current = true;
    return () => {
      componentMounted.current = false
    };
  }, [])

  useEffect(() => {
    webSocket.on(`${dominio}Incluido`, (item: T) => {
      if (componentMounted.current) {
        setItens(itens => {
          return {
            total: itens.total + 1,
            itens: [item, ...itens.itens]
          }
        })
      }
    })
  }, [dominio, webSocket]);

  const listar = useCallback(async () => {
    if (!consultaValues.current) {
      const resposta = await get(`/${dominio}?pagina=${page}&limite=100`) as any;
      if (resposta) {
        setItens(resposta as ListaItens<T>);
      }
    }
  }, [dominio, get, page]);

  const handleSearch = useCallback(async (dados: Query[]) => {
    consultaValues.current = dados;
    const resposta = await get(`/${dominio}/consulta?${dados.map(query => `${query.name}=${query.value}&`)}limite=100&pagina=${page}`) as any;
    if (resposta) {
      setItens(resposta as ListaItens<T>);
    }
  }, [dominio, get, page]);

  const handlePageChange = useCallback((event, value: number) => {
    setPage(value);
  }, []);

  useEffect(() => {
    if (consultaValues.current) {
      handleSearch(consultaValues.current);
    }
  }, [handleSearch, page])

  return {
    ...itens,
    handleSearch,
    listar,
    handlePageChange,
    page,
    setItens,
  }
}