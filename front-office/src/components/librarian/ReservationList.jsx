import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const ReservationList = ({ reservations: initialReservations, message, handleActionReservation }) => {
  const [reservations, setReservations] = useState(initialReservations || []);
  const BASE_URL = "http://127.0.0.1:8000/storage/";

  const isDesktop = useMediaQuery({ minWidth: 768 });
  const fullNameUser = (elements) => {
    return `${elements.first_name} ${elements.last_name}`
  }
  const getformDate = (date) => {
    return new Date(date).toLocaleDateString();
  }

  const styleStatus = {
    'Pas de Prolengement': 'bg-gray-300 text-gray-700',
    'En Attente': 'bg-yellow-300 text-yellow-700',
    'Accepter': 'bg-green-300 text-green-700',
    'Refuser': 'bg-red-300 text-red-700',
    'En Cours': 'bg-blue-300 text-blue-700',
    'Terminer': 'bg-orange-300 text-orange-700',
}

  useEffect(() => {
    setReservations(initialReservations || []);
  }, [initialReservations]);

  console.log(reservations);
  
  
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
                  <th className="text-left text-sm p-3 text-[#8B4513]">Statut Pro</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Actions Pro</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Statut Res</th>
                  <th className="text-left text-sm p-3 text-[#8B4513]">Actions Res</th>
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
                      {`${getformDate(reservation.start_date)} - ${getformDate(reservation.end_date)}`}
                    </td>
                    <td className="p-1 text-[#8B4513] text-xs">
                      {reservation.returned_at ? reservation.returned_at && getformDate(reservation.returned_at) : 'NAN'}
                    </td>
                    <td className={`p-1 text-[#8B4513] text-[1rem]`}>
                      <span className={`px-2 py-1 rounded text-xs ${styleStatus[reservation.status_Pro]}`}>
                        {reservation.status_Pro}
                      </span>
                    </td>
                    <td className="p-1 space-x-2">
                    </td>
                    <td className={`p-1 text-[#8B4513] text-[1rem]`}>
                      <span className={`px-2 py-1 rounded text-xs ${styleStatus[reservation.status_Res]}`}>
                        {reservation.status_Res}
                      </span>
                    </td>
                    <td className="p-1 space-x-2">
                        <button
                            onClick={() => handleActionReservation(reservation, 'Accepter')}
                            className="text-xl"
                        >
                            ✅
                        </button>
                        <button
                            onClick={() => handleActionReservation(reservation, 'Refuser')}
                            className="text-xl"
                        >
                            ⛔
                        </button>
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
                        {getformDate(reservation.start_date)-getformDate(reservation.end_date)}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Date Retour : </span>
                        {reservation.returned_at ? getformDate(reservation.returned_at) : 'NAN'}
                      </p>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Statut Pro : </span>
                        <span className={`px-2 py-1 rounded text-xs ${styleStatus[reservation.status_Pro]}`}>
                          {reservation.status_Pro || "En attente"}
                        </span>
                      </p>
                      <div className="flex gap-2 mt-2">
                      </div>
                      <p className="text-[#8B4513] text-sm">
                        <span className="font-semibold">Statut Res : </span>
                        <span className={`px-2 py-1 rounded text-xs ${styleStatus[reservation.status_Res]}`}>
                          {reservation.status_Res || "En attente"}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={() => handleActionReservation(reservation, 'Accepter')}
                            className="text-xl"
                        >
                            ✅
                        </button>
                        <button
                            onClick={() => handleActionReservation(reservation, 'Refuser')}
                            className="text-xl"
                        >
                            ⛔
                        </button>
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