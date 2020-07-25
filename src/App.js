import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Rotas from './rotas';
import { AuthProvider } from './contexts/AuthContext';
import { TemaProvider } from './contexts/TemaContext';
import { ApiProvider } from './contexts/ApiContext';


function App() {
  return (
    <BrowserRouter>
      <TemaProvider>
        <ApiProvider>
          <AuthProvider>
            <Rotas />
          </AuthProvider>
        </ApiProvider>
      </TemaProvider>
    </BrowserRouter>
  );
}

export default App;