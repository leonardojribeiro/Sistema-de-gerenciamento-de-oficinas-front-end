import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ApiContext from "../contexts/ApiContext";
import WebSocketContext, { Dominio } from "../contexts/WebSocketContext";
import Query from "../Types/Query";

interface ListaItens<T> {
  itens: T[];
  total: number
}

export default function useListagem<T = any>(dominio: Dominio, disableCircularProgress?: boolean, disableAllProgress?: boolean) {
  const [itens, setItens] = useState<ListaItens<T>>({ total: 1, itens: [] });
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const consultaValues = useRef<any>();
  const { webSocket, setIsOpen } = useContext(WebSocketContext);
  const componentMounted = useRef<Boolean>(false);

  useEffect(() => {
    componentMounted.current = true;
    return () => {
      componentMounted.current = false
    };
  }, [])

  useEffect(() => {
    setIsOpen(dominio);
    return () => {
      setIsOpen(undefined);
    };
  }, [dominio, setIsOpen])

  useEffect(() => {
    if (webSocket) {
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
    }
  }, [dominio, webSocket]);

  const listar = useCallback(async () => {
    if (!consultaValues.current) {
      const resposta = await get(`/${dominio}?pagina=${page}&limite=100`, { disableCircularProgress, disableAllProgress }) as any;
      if (resposta) {
        setItens(resposta as ListaItens<T>);
      }
    }
  }, [disableAllProgress, disableCircularProgress, dominio, get, page]);

  const handleSearch = useCallback(async (dados: Query[]) => {
    let queryStr = "";
    dados.forEach(query => queryStr = `${queryStr}${query.name}=${query.value}&`)
    consultaValues.current = dados;
    const resposta = await get(`/${dominio}/consulta?${queryStr}limite=100&pagina=${page}`, { disableCircularProgress, disableAllProgress }) as any;
    if (resposta) {
      setItens(resposta as ListaItens<T>);
    }
  }, [disableAllProgress, disableCircularProgress, dominio, get, page]);

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