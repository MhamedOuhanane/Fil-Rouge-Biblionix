import { useEffect } from "react";

const BadgeList = ({ badges, message, softDeleteBadge }) => {
  const styleButton = (badge) => { return !badge.deleted_at ? 
                    {style: "bg-red-500", icon: "fa-solid fa-trash"}
                    : {style: "bg-green-500", icon: "fa-solid fa-arrows-rotate"}
                }
    useEffect(() => {
        styleButton(badges);
    }, [badges]);
  
  return (
    <div className="p-2 w-full  max-h-[300px] overflow-auto">
      <div className="p-4 text-center text-gray-700 text-sm">{message}</div>
      {(badges && badges.length != 0) && (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-sm text-gray-600">Title</th>
              <th className="px-4 py-2 text-sm text-gray-600">Prix</th>
              <th className="px-4 py-2 text-sm text-gray-600">Reservation</th>
              <th className="px-4 py-2 text-sm text-gray-600">Duration</th>
              <th className="px-4 py-2 text-sm text-gray-600">Plan</th>
              <th className="px-4 py-2 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {badges.map((badge) => (
              <tr key={badge.id} className="border-b text-center">
                <td className="px-4 py-2 text-[1rem]">{badge.title}</td>
                <td className="px-4 py-2 text-sm">{badge.prix} €</td>
                <td className="px-4 py-2 text-sm">{badge.reservation}</td>
                <td className="px-4 py-2 text-sm">{badge.duration} days</td>
                <td className="px-4 py-2 text-sm">{badge.paypal_plan_id}</td>
                <td className="px-4 py-2 text-sm">
                    <button
                        onClick={() => softDeleteBadge(badge.id)}
                        className={`${styleButton(badge).style} text-white text-xs px-4 py-2 rounded-md`}
                    >
                        <i className={`${styleButton(badge).icon} fa-lg`}></i>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BadgeList;
