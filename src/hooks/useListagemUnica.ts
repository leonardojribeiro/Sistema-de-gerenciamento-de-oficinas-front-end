import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ApiContext, { Options } from "../contexts/ApiContext";
import WebSocketContext, { Dominio } from "../contexts/WebSocketContext";

export default function useListagem<T = any>(dominio: Dominio, id: string | null, options?: Options) {
  const [item, setItem] = useState<T | undefined>(undefined);
  const { get } = useContext(ApiContext);
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

  }, [dominio, webSocket]);

  const listar = useCallback(async () => {
    if (id) {
      const resposta = await get(`/${dominio}/id?_id=${id}`, options) as any;
      if (resposta) {
        setItem(resposta as T);
      }
    }
  }, [options, dominio, get, id]);

  return {
    item,
    listar,
  }
}