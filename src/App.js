import React from 'react';
import { EmpruntProvider } from './context/EmpruntContext';
import ListLivre from './components/ListLivre';
import LivresEmpruntes from './components/LivresEmpruntes';

const App = () => {
  return (
    <EmpruntProvider>
      <div>
        <h1 className="text-center mt-4">Gestion des Livres</h1>
        <ListLivre />
        <LivresEmpruntes />
      </div>
    </EmpruntProvider>
  );
};

export default App;
