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
        <AuthProvider>
          <ApiProvider>
            <Rotas />
          </ApiProvider>
        </AuthProvider>
      </TemaProvider>
    </BrowserRouter>
  );
}

export default App;