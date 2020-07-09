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
      <ApiProvider>
        <TemaProvider>
          <AuthProvider>
            <Rotas />
          </AuthProvider>
        </TemaProvider>
      </ApiProvider>
    </BrowserRouter>
  );
}

export default App;