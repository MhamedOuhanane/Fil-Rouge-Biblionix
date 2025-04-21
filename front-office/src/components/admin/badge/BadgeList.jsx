const BadgeList = ({ badges, message }) => {
  //   const handleRemoveBadge = (badgeId) => {

  //   }
  return (
    <div className="p-2 w-full  max-h-[300px] overflow-auto">
      <div className="p-4 text-center text-gray-700 text-sm">{message}</div>
      {badges.length != 0 && (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-sm text-gray-600">Title</th>
              <th className="px-4 py-2 text-sm text-gray-600">Content</th>
              <th className="px-4 py-2 text-sm text-gray-600">Prix</th>
              <th className="px-4 py-2 text-sm text-gray-600">Reservation</th>
              <th className="px-4 py-2 text-sm text-gray-600">Duration</th>
              <th className="px-4 py-2 text-sm text-gray-600">Plan</th>
              <th className="px-4 py-2 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {badges.map((badge) => (
              <tr key={badge.id} className="border-b">
                <td className="px-4 py-2 text-[1rem]">{badge.title}</td>
                <td className="px-4 py-2 text-sm">
                  {badge.content.length > 15
                    ? `${badge.content.slice(0, 25)}...`
                    : badge.content}
                </td>
                <td className="px-4 py-2 text-sm">{badge.prix} €</td>
                <td className="px-4 py-2 text-sm">{badge.reservation}</td>
                <td className="px-4 py-2 text-sm">{badge.duration} days</td>
                <td className="px-4 py-2 text-sm">{badge.paypal_plan_id}</td>
                <td className="px-4 py-2 text-sm">
                  {!badge.deleted_at ? (
                    <button
                      // onClick={() => onRemoveBadge(badge.id)}
                      className="bg-red-500 text-white text-xs px-4 py-2 rounded-md"
                    >
                      <i className="fa-solid fa-trash fa-lg"></i>
                    </button>
                  ) : (
                    <button
                      // onClick={() => onRemoveBadge(badge.id)}
                      className="bg-green-500 text-white text-xs px-4 py-2 rounded-md"
                    >
                      <i className="fa-solid fa-arrows-rotate fa-lg"></i>
                    </button>
                  )}
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
