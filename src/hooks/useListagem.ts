import { Pagination } from "@material-ui/lab";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import ApiContext from "../contexts/ApiContext";

interface ListaItens<T> {
  itens: T[];
  total: number
}

export default function useListagem<T>(pathToItens: string, dominio: string) {
  const [itens, setItens] = useState<ListaItens<T>>({ total: 1, itens: [] });
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const consultaValues = useRef<any>();

  const listar = useCallback(async () => {
    if (!consultaValues.current) {
      const resposta = await get(`/${dominio}?pagina=${page}&limite=100`) as any;
      if (resposta) {
        setItens({
          total: resposta.total,
          itens: resposta[pathToItens],
        } as ListaItens<T>);
      }
    }
  }, [dominio, get, page, pathToItens]);

  const handleSearch = useCallback(async (consulta) => {
    consultaValues.current = consulta;
    const resposta = await get(`/${dominio}/consulta?${consulta}&limite=100&pagina=${page}`) as any;
    if (resposta) {
      setItens({
        total: resposta.total,
        itens: resposta[pathToItens],
      } as ListaItens<T>);
    }
  }, [dominio, get, page, pathToItens]);

  const handlePageChange = useCallback((event, value: number) => {
    setPage(value);
  }, []);

  useEffect(() => {
    if (consultaValues.current) {
      handleSearch(consultaValues.current);
    }
  }, [handleSearch, page])

  const pagination = useCallback(() => {
    return Pagination({
      count: 10
    });
  }, []);

  return {
    ...itens,
    handleSearch,
    listar,
    handlePageChange,
    page,
    setItens,
    pagination,
  }
}