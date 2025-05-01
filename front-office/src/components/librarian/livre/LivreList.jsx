import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const LivreList = ({ livres: initialLivres, message }) => {
  const [livres, setLivres] = useState(initialLivres || []);
  const BASE_URL = "http://127.0.0.1:8000/storage/";

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const lengthString = isDesktop ? 50 : 30;

  useEffect(() => {
    setLivres(initialLivres || []);
  }, [initialLivres]);

  return (
    <div className="p-2 w-full">
      {livres && livres.length === 0 && (
        <div className="p-4 text-center text-amber-700 text-sm">{message}</div>
      )}
      {livres && livres.length !== 0 && (
        <>
          {/* Affichage en tableau pour desktop */}
          {isDesktop ? (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#d4c9b2]">
                  <th className="text-left p-3 text-[#8B4513]">Titre</th>
                  <th className="text-left p-3 text-[#8B4513]">Photo</th>
                  <th className="text-left p-3 text-[#8B4513]">Résumé</th>
                  <th className="text-left p-3 text-[#8B4513]">Auteur</th>
                  <th className="text-left p-3 text-[#8B4513]">Catégorie</th>
                  <th className="text-left p-3 text-[#8B4513]">Quantité</th>
                  <th className="text-left p-3 text-[#8B4513]">Statut</th>
                  <th className="text-left p-3 text-[#8B4513]">Disponibilité</th>
                </tr>
              </thead>
              <tbody>
                {livres.map((livre) => (
                  <tr key={livre.id} className="border-b border-[#d4c9b2]">
                    <td className="p-1 pl-2 text-[#8B4513] text-[1rem] font-[merriweather]">
                      {livre.title}
                    </td>
                    <td className="p-1">
                      <img
                        src={BASE_URL + livre.photo}
                        alt={livre.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </td>
                    <td className="p-1 text-[#8B4513] text-sm">
                      {livre.content?.substring(0, lengthString) || "N/A"}...
                    </td>
                    <td className="p-1 text-[#8B4513] text-[1rem]">
                      {livre.author || "N/A"}
                    </td>
                    <td className="p-1 text-[#8B4513] text-[1rem]">
                      {livre.categorie?.name || "N/A"}
                    </td>
                    <td className="p-1 text-[#8B4513] text-[1rem]">
                      {livre.quantity || "N/A"}
                    </td>
                    <td className="p-1 text-[#8B4513] text-[1rem]">
                      {livre.status_livre || "En Attente"}
                    </td>
                    <td className="p-1 text-[#8B4513] text-[1rem]">
                      {livre.disponibilite || "Indisponible"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            /* Affichage en cartes pour mobile */
            <div className="space-y-4">
              {livres.map((livre) => (
                <div
                  key={livre.id}
                  className="bg-white rounded-lg shadow-md p-4 border border-[#d4c9b2]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={BASE_URL + livre.photo}
                      alt={livre.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-[#8B4513] font-[merriweather] text-lg font-semibold">
                        {livre.title}
                      </h3>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Résumé : </span>
                        {livre.content?.substring(0, lengthString) || "N/A"}...
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Auteur : </span>
                        {livre.author || "N/A"}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Catégorie : </span>
                        {livre.categorie?.name || "N/A"}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Quantité : </span>
                        {livre.quantity || "N/A"}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Statut : </span>
                        {livre.status_livre || "En Attente"}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Disponibilité : </span>
                        {livre.disponibilite || "Indisponible"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LivreList;