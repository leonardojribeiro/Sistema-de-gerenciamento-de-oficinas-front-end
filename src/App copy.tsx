import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';
import { TemaProvider } from './contexts/TemaContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import datefns from '@date-io/date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import { WebSocketProvider } from './contexts/WebSocketContext';
import Dialog from './componentes/Dialog';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import BotaoIncluir from './componentes/BotaoIncluir';

class LocalizedUtils extends datefns {
  getDatePickerHeaderText(date: Date) {
    return this.format(date, "dd MM yyyy");
  }
}
function App() {
  const itens = [0, 1, 2, 3, 4, 5, 6,7,8,9];
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ptLocale} >
        <TemaProvider>
          <AuthProvider>
            <WebSocketProvider>
              <Dialog open title="Título" maxWidth="xs" fullWidth>
                <List>
                  {
                    itens.map((item, index) => (
                      <ListItem key={index} divider>
                        <ListItemAvatar>
                          <Avatar>
                            {index+1}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Texto primário do ${index + 1}º item da lista`}
                          secondary={`Texto secundário do ${index + 1}º item da lista`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton>
                            <Edit/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  }
                </List>
                <Pagination count={20} />
                <BotaoIncluir linkTo="" titulo="" />
              </Dialog>
            </WebSocketProvider>
          </AuthProvider>
        </TemaProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

export default App;