import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import UpdatedButton from "../../buttons/UpdatedButton";
import DeletedButton from "../../buttons/DeletedButton";

const LivreList = ({ livres: initialLivres, message, onEdit, onDelete }) => {
    const [livres, setLivres] = useState(initialLivres || []);
    const BASE_URL = "http://127.0.0.1:8000/storage/";

    const isDesktop = useMediaQuery({ minWidth: 768 });
    const lengthString = isDesktop ? 40 : 20;

    const styleDisponibilite = {
        'Disponible': "text-green-900 bg-green-200",
        'Rupture de stock': "text-blue-900 bg-blue-300",
        'Indisponible': "text-red-900 bg-red-200",
    };

    const statsStyle = {
        'En Attente': "text-yellow-900 bg-amber-300",
        'Accepter': "text-green-900 bg-green-200",
        'Refuser': "text-red-900 bg-red-200",
    };

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
                    <th className="text-left text-sm p-3 text-[#8B4513]">Titre</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Photo</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Résumé</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Auteur</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Catégorie</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Quantité</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Statut</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Disponibilité</th>
                    <th className="text-left text-sm p-3 text-[#8B4513]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {livres.map((livre) => (
                        <tr key={livre.id} className="border-b border-[#d4c9b2]">
                            <td className="p-1 pl-2 text-[#8B4513] text-sm font-[merriweather]">
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
                                {livre.summary?.substring(0, lengthString)}...
                            </td>
                            <td className="p-1 text-[#8B4513] text-xs">
                                {livre.author}
                            </td>
                            <td className="p-1 text-[#8B4513] text-xs">
                                {livre.categorie?.title}
                            </td>
                            <td className="p-1 text-[#8B4513] text-[1rem]">
                                {livre.quantity}
                            </td>
                            <td className={`p-1 text-[#8B4513] text-[1rem]`}>
                                <span className={`px-2 py-1 rounded text-xs ${statsStyle[livre.status_livre]}`}>{livre.status_livre || "En Attente"}</span>
                            </td>
                            <td className={`p-1 text-[#8B4513] text-[1rem]`}>
                                <span className={`px-2 py-1 rounded text-xs ${styleDisponibilite[livre.disponibilite]}`}>{livre.disponibilite || "Indisponible"}</span>
                            </td>
                            <td className={`p-1 space-x-2`}>
                                <UpdatedButton element={livre} handleAction={onEdit} />
                                <DeletedButton element={livre} handleAction={onDelete} />
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            ) : (
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
                            className="w-24 object-cover rounded"
                        />
                        <div className="flex-1">
                        <h3 className="text-[#8B4513] font-[merriweather] text-lg font-semibold">
                            {livre.title}
                        </h3>
                        <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Résumé : </span>
                            {livre.content?.substring(0, lengthString)}...
                        </p>
                        <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Auteur : </span>
                            {livre.author}
                        </p>
                        <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Catégorie : </span>
                            {livre.categorie?.name}
                        </p>
                        <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Quantité : </span>
                            {livre.quantity}
                        </p>
                        <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Statut : </span>
                            <span className={`px-2 py-1 rounded text-xs ${statsStyle[livre.status_livre]}`}>{livre.status_livre || "En Attente"}</span>
                        </p>
                        <p className="text-[#8B4513] text-sm">
                            <span className="font-semibold">Disponibilité : </span>
                            <span className={`px-2 py-1 rounded text-xs ${styleDisponibilite[livre.disponibilite]}`}>{livre.disponibilite || "Indisponible"}</span>
                        </p>
                        <p className="flex">
                            <UpdatedButton element={livre} handleAction={onEdit} />
                            <DeletedButton element={livre} handleAction={onDelete} />
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