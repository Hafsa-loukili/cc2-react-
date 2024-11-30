
import { useEffect, useState, useContext } from "react";
import { fetchLivres } from "../Services/api";
import { EmpruntContext } from "../context/EmpruntContext";

const ListLivre = () => {
    const [livres, setLivres] = useState([]);
    const { emprunts, empruntLivre, returnLivre } = useContext(EmpruntContext);

    useEffect(() => {
        const getLivres = async () => {
            try {
                const data = await fetchLivres();
                setLivres(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des livres:", error);
            }
        };
        getLivres();
    }, []);

   
    const handleEmprunter = (livreId) => {
       
        setLivres(livres.map((livre) =>
            livre.id === livreId ? { ...livre, disponible: false } : livre
        ));
        empruntLivre(livreId); 
    };

   
    const handleReturn = (livreId) => {
        
        setLivres(livres.map((livre) =>
            livre.id === livreId ? { ...livre, disponible: true } : livre
        ));
        returnLivre(livreId);
    };

    return (
        <div className="container mt-4">
            <h2 style={{ color: '#FF6347' }}> La Liste des Livres</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Disponibilité</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {livres.map((livre) => (
                        <tr key={livre.id}>
                            <td>{livre.titre}</td>
                            <td>{livre.auteur}</td>
                            <td>{livre.disponible ? "Disponible" : "Non Disponible"}</td>
                            <td>
                                {livre.disponible && !emprunts.includes(livre.id) ? (
                                    <button
                                        style={{
                                            backgroundColor: '#006A67',
                                            color: '#FFF',
                                            margin: '10px'
                                        }}
                                        onClick={() => handleEmprunter(livre.id)}
                                    >
                                        Emprunter Livre
                                    </button>
                                ) : emprunts.includes(livre.id) ? (
                                    <button
                                        style={{
                                            backgroundColor: '#FF6347',
                                            color: '#FFF',
                                            margin: '10px'
                                        }}
                                        onClick={() => handleReturn(livre.id)}
                                    >
                                        Rendre Livre
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-secondary"
                                        disabled
                                        style={{
                                            margin: '10px',
                                            backgroundColor: 'gray',
                                            color: '#FFF'
                                        }}
                                    >
                                        Non Disponible
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListLivre;

