import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import { AuthProvider } from './contexts/AuthContext';
import { TemaProvider } from './contexts/TemaContext';
import { ApiProvider } from './contexts/ApiContext';


function App() {
  return (
    <BrowserRouter>
      <TemaProvider>
        <AuthProvider>
          <ApiProvider>
            <Routes />
          </ApiProvider>
        </AuthProvider>
      </TemaProvider>
    </BrowserRouter>
  );
}

export default App;