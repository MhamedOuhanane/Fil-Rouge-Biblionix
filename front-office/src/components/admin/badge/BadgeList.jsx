const BadgeList = ({ badges, message, onRemoveBadge = null }) => {
  return (
        <div className="p-2 w-full max-h-[400px] overflow-y-auto">
            <div className="p-4 text-center text-gray-700 text-sm">
                { message }
            </div>
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
                        <td className="px-4 py-2 text-sm">{badge.title}</td>
                        <td className="px-4 py-2 text-sm">{badge.content}</td>
                        <td className="px-4 py-2 text-sm">{badge.prix} €</td>
                        <td className="px-4 py-2 text-sm">{badge.reservation}</td>
                        <td className="px-4 py-2 text-sm">{badge.duration} days</td>
                        <td className="px-4 py-2 text-sm">{badge.paypal_plan_id}</td>
                        <td className="px-4 py-2 text-sm">
                            <button
                            // onClick={() => onRemoveBadge(badge.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default BadgeList
