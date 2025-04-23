import React, { useState, useEffect } from "react";
import SoftDeleteButton from "../../buttons/SoftDeleteButton";

const BadgeList = ({ badges: initialBadges, message, softDeleteBadge }) => {
    const [badges, setBadges] = useState(initialBadges || []);

    
    useEffect(() => {
        setBadges(initialBadges || []);
    }, [initialBadges]);
    
    
    return (
        <div className="p-2 w-full max-h-[300px] overflow-auto">
            {(badges && badges.length == 0) && <div className="p-4 text-center text-orange-400 text-sm">{message}</div> }
            {(badges && badges.length !== 0) && (
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
                                <td className="px-4 py-2 font-medium">{badge.title}</td>
                                <td className="px-4 py-2 text-sm">{badge.prix} €</td>
                                <td className="px-4 py-2 text-sm">{badge.reservation}</td>
                                <td className="px-4 py-2 text-sm">{badge.duration} days</td>
                                <td className="px-4 py-2 text-sm">{badge.paypal_plan_id}</td>
                                <td className="px-4 py-2 text-sm">
                                    <SoftDeleteButton element={badge} softDeleteButton={softDeleteBadge} />
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