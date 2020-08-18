import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';
import { TemaProvider } from './contexts/TemaContext';
import { ApiProvider } from './contexts/ApiContext';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import datefns from '@date-io/date-fns';

function App() {
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={datefns} >
        <TemaProvider>
          <AuthProvider>
            <ApiProvider>
              <Routes />
            </ApiProvider>
          </AuthProvider>
        </TemaProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  );
}

export default App;