import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const ReservationList = ({ reservations: initialReservations, message }) => {
  const [reservations, setReservations] = useState(initialReservations || []);
  const BASE_URL = "http://127.0.0.1:8000/storage/";

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const fullNameUser = (elements) => {
    return `${elements.first_name} ${elements.last_name}`
  }

  const styleStatutRes = {
    "En attente": "text-yellow-900 bg-amber-300",
    "Confirmée": "text-green-900 bg-green-200",
    "Annulée": "text-red-900 bg-red-200",
  };

  useEffect(() => {
    setReservations(initialReservations || []);
  }, [initialReservations]);

  
  return (
    <div className="p-2 w-full">
      {reservations && reservations.length === 0 && (
        <div className="p-4 text-center text-amber-700 text-sm">{message}</div>
      )}
      {reservations && reservations.length !== 0 && (
        <>
          {isDesktop ? (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#d4c9b2]">
                  <th className="text-left text-sm p-3 text-[#8B4513]">Titre</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Photo</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Utilisateur</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Date Réservation</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Date Retour</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Statut Res</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Statut Pro</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-[#d4c9b2]">
                    <td className="p-1 pl-2 text-[#8B4513] text-sm font-[merriweather]">
                      {reservation.livre.title}
                    </td>
                    <td className="p-1">
                      <img
                        src={BASE_URL + reservation.livre.photo}
                        alt={reservation.livre.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                    </td>
                    <td className="p-1 text-[#8B4513] text-xs">
                      {fullNameUser(reservation.reservationtable)}
                    </td>
                    <td className="p-1 text-[#8B4513] text-xs">
                      {new Date(reservation.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-1 text-[#8B4513] text-xs">
                      {reservation.returned_at ? reservation.returned_at && new Date(reservation.returned_at).toLocaleDateString() : 'NAN'}
                    </td>
                    <td className={`p-1 text-[#8B4513] text-[1rem]`}>
                      <span className={`px-2 py-1 rounded text-xs`}>
                        {reservation.statut_Res || "En attente"}
                      </span>
                    </td>
                    <td className={`p-1 text-[#8B4513] text-[1rem]`}>
                      <span className={`px-2 py-1 rounded text-xs`}>
                        {reservation.statut_Pro || "En attente"}
                      </span>
                    </td>
                    <td className="p-1 space-x-2">
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-white rounded-lg shadow-md p-4 border border-[#d4c9b2]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={BASE_URL + reservation.livre.photo}
                      alt={reservation.livre.title}
                      className="w-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-[#8B4513] font-[merriweather] text-lg font-semibold">
                        {reservation.livre.title}
                      </h3>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Utilisateur : </span>
                        {fullNameUser(reservation.reservationtable)}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Date Réservation : </span>
                        {new Date(reservation.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Date Retour : </span>
                        {reservation.returned_at ? new Date(reservation.returned_at).toLocaleDateString() : 'NAN'}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Statut Res : </span>
                        <span className={`px-2 py-1 rounded text-xs`}>
                          {reservation.statut_Res || "En attente"}
                        </span>
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Statut Pro : </span>
                        <span className={`px-2 py-1 rounded text-xs`}>
                          {reservation.statut_Pro || "En attente"}
                        </span>
                      </p>
                      <div className="flex gap-2 mt-2">
                      </div>
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

export default ReservationList;