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

class LocalizedUtils extends datefns {
  getDatePickerHeaderText(date: Date) {
    return this.format(date, "dd MM yyyy");
  }
}
function App() {
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ptLocale} >
        <TemaProvider>
          <AuthProvider>
            <WebSocketProvider>
              <Routes />
            </WebSocketProvider>
          </AuthProvider>
        </TemaProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

export default App;