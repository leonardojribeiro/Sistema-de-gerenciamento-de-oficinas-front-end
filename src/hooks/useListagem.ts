import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ApiContext from "../contexts/ApiContext";
import useAuth from "./useAuth";

interface ListaItens<T> {
  itens: T[];
  total: number
}

interface Query {
  name: string;
  value: string;
}

export default function useListagem<T>(pathToItens: string, dominio: string) {
  const [itens, setItens] = useState<ListaItens<T>>({ total: 1, itens: [] });
  const [page, setPage] = useState<number>(1);
  const { get } = useContext(ApiContext);
  const consultaValues = useRef<any>();
  const auth = useAuth();

  console.log(dominio)

  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL as string, { auth: { token: auth.token }, });
    socket.on("connect", () => {
      console.log("conectou");
    })

    socket.on(`${dominio}Incluido`, (item: T) => {
      console.log(item);
      setItens(itens => {
        return {
          total: itens.total + 1,
          itens: [item, ...itens.itens]
        }
      })
    })

    return () => {
      console.log('desmontando')
      socket.disconnect()
    }

  }, [auth.token, dominio])

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

  const handleSearch = useCallback(async (dados: Query) => {
    consultaValues.current = dados;
    const resposta = await get(`/${dominio}/consulta?${dados.name}=${dados.value}&limite=100&pagina=${page}`) as any;
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

  return {
    ...itens,
    handleSearch,
    listar,
    handlePageChange,
    page,
    setItens,
  }
}