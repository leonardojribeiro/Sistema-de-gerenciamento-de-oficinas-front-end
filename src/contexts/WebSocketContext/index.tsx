import React, { createContext, useCallback, useRef, useState } from "react"
import { useEffect, } from "react";
import { io, Socket } from "socket.io-client";
import useAuth from "../../hooks/useAuth";

export interface Notification {
  inserted: number;
  changed: number;
}

export type Dominio =
  "servico"
  | "marca"
  | "marca"
  | "modelo"
  | "peca"
  | "veiculo"
  | "cliente"
  | "fornecedor"
  | "funcionario"
  | "especialidade"
  | "ordemdeservico"

interface WebSocketValues {
  webSocket: Socket | undefined;
  getNotification: (dominio: Dominio) => Notification;
  dismissNotification: (dominio: Dominio) => void;
  setIsOpen: (dominio: Dominio | undefined) => void;
}

type Action = "changed" | "inserted" | "dismiss"


interface Notifications {
  servico: Notification;
  marca: Notification;
  modelo: Notification;
  peca: Notification;
  veiculo: Notification;
  cliente: Notification;
  fornecedor: Notification;
  funcionario: Notification;
  especialidade: Notification;
  ordemdeservico: Notification;
}

const WebSocketContext = createContext<WebSocketValues>({} as WebSocketValues)

interface ProviderProps {
  webSocket: Socket | undefined;
}

const Provider: React.FC<ProviderProps> = ({ webSocket, children }) => {
  const [notifications, setNotifications] = useState<Notifications>({
    servico: { changed: 0, inserted: 0 },
    cliente: { changed: 0, inserted: 0 },
    especialidade: { changed: 0, inserted: 0 },
    fornecedor: { changed: 0, inserted: 0 },
    funcionario: { changed: 0, inserted: 0 },
    marca: { changed: 0, inserted: 0 },
    modelo: { changed: 0, inserted: 0 },
    peca: { changed: 0, inserted: 0 },
    veiculo: { changed: 0, inserted: 0 },
    ordemdeservico: { changed: 0, inserted: 0 }
  } as Notifications);

  const isOpen = useRef<Dominio | undefined>(undefined);

  const updateNotifications = useCallback((dominio: Dominio, action: Action) => {
    if (isOpen.current !== dominio) {
      setNotifications(notifications => {
        return {
          ...notifications,
          [dominio]: action === "dismiss"
            ? {
              changed: 0, inserted: 0
            }
            : {
              changed: action === "changed" ? notifications[dominio].changed + 1 : notifications[dominio].changed,
              inserted: action === "inserted" ? notifications[dominio].inserted + 1 : notifications[dominio].inserted,
            }
        }
      })
    }
  }, []);

  useEffect(() => {
    if (webSocket) {
      webSocket.on(`servicoIncluido`, (item: any) => {
        updateNotifications("servico", "inserted")
      })
      webSocket.on(`marcaIncluido`, (item: any) => {
        updateNotifications("marca", "inserted")
      })
      webSocket.on(`pecaIncluido`, (item: any) => {
        updateNotifications("peca", "inserted")
      })
      webSocket.on(`modeloIncluido`, (item: any) => {
        updateNotifications("modelo", "inserted")
      })
      webSocket.on(`clienteIncluido`, (item: any) => {
        updateNotifications("cliente", "inserted")
      })
      webSocket.on(`fornecedorIncluido`, (item: any) => {
        updateNotifications("fornecedor", "inserted")
      })
      webSocket.on(`funcionarioIncluido`, (item: any) => {
        updateNotifications("funcionario", "inserted")
      })
      webSocket.on(`especialidadeIncluido`, (item: any) => {
        updateNotifications("especialidade", "inserted")
      })
      return () => {
        webSocket.close()
      }
    }
  }, [updateNotifications, webSocket])

  const getNotification = useCallback((dominio: Dominio) => {
    return notifications[dominio]
  }, [notifications])

  const dismissNotification = useCallback((dominio: Dominio) => {
    updateNotifications(dominio, "dismiss");
  }, [updateNotifications])

  const setIsOpen = useCallback((dominio: Dominio | undefined) => {
    isOpen.current = dominio;
  }, [])

  return (
    <WebSocketContext.Provider value={{ webSocket, getNotification, dismissNotification, setIsOpen }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const WebSocketProvider: React.FC = ({ children }) => {
  const { logado, token } = useAuth();
  const webSocket = useRef<Socket | undefined>(undefined)

  useEffect(() => {
    if (logado) {
      webSocket.current = io(process.env.REACT_APP_API_URL as string, { auth: { token }, });
      webSocket.current.connect();
      webSocket.current.on("connect", () => {
        console.log("conectou");
      })
      webSocket.current.on("connect_error", (err: any) => {
        console.log(err.message);
      });
    }
    else {
      webSocket.current = undefined;
    }
    return () => console.log('desmontando')
  }, [logado, token])

  return (
    <Provider webSocket={webSocket.current} >
      {children}
    </Provider>
  );
}

export default WebSocketContext

