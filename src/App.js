import React from 'react';
import Rodape from './componentes/Rodape.js';
import { BrowserRouter} from 'react-router-dom';
import './App.css';
import Rotas from './rotas';
import { AuthProvider } from './contexts/AuthContext';
import { TemaProvider } from './contexts/TemaContext';


function App() {
  return (
    <BrowserRouter>
      <div className={``}>
        <TemaProvider>
          <AuthProvider>
            <div className="h-min-rodape">
              <Rotas />
            </div>
            <Rodape/>
          </AuthProvider>
        </TemaProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;