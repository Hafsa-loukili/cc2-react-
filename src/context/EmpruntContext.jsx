import React, { createContext, useState } from 'react';

export const EmpruntContext = createContext();

export const EmpruntProvider = ({ children }) => {
  const [emprunts, setEmprunts] = useState([]);

  const empruntLivre = (id) => setEmprunts([...emprunts, id]);
  const returnLivre = (id) => setEmprunts(emprunts.filter((empruntId) => empruntId !== id));

  return (
    <EmpruntContext.Provider value={{ emprunts, empruntLivre, returnLivre }}>
      {children}
    </EmpruntContext.Provider>
  );
};
