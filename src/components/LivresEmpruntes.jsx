import React, { useContext, useEffect, useState } from 'react';
import { EmpruntContext } from '../context/EmpruntContext';
import { fetchLivres } from '../Services/api';

const LivresEmpruntes = () => {
  const { emprunts } = useContext(EmpruntContext);
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    fetchLivres()
      .then((data) => {
        setLivres(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des livres :", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 style={{ color: '#006A67' }}>Livres Empruntés</h3>
      {emprunts.length === 0 ? (
        <p style={{ color: '#FF6347' }}>Aucun livre emprunté.</p>
      ) : (
        <ul className="list-group">
          {emprunts.map((id) => {
            const livre = livres.find((livre) => livre.id === id); 
            return livre ? (
              <li key={livre.id} className="list-group-item" >
               <h4 style={{ color: '#FF6347' }}> Titre de Livre</h4> {livre.titre} - Auteur: {livre.auteur}
              </li>
            ) : null;
          })}
        </ul>
      )}
    </div>
  );
};

export default LivresEmpruntes;
