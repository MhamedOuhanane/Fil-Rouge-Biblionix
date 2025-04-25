import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ActiveButton from '../../buttons/ActiveButton';

const UserList = ({ users: initialUsers, message, handleActivate }) => {
    const [users, setUsers] = useState(initialUsers || []);
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const styleStatus = {
        'En Attente': 'text-yellow-700 bg-amber-300',
        'Active': 'text-green-700 bg-green-200',
        'Suspendu': 'text-orange-700 bg-orange-200',
        'Ban': 'text-red-700 bg-red-200',
    };

    useEffect(() => {
        setUsers(initialUsers || []);
    }, [initialUsers]);

    return (
        <div className="w-full">
        {users.length === 0 ? (
            <div className="text-center text-amber-700 text-sm">{message}</div>
            ) : (
                <div className="overflow-x-auto">
                    {isDesktop ? (
                        <table className="hidden md:table min-w-full border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-3 text-amber-900">Prénom</th>
                                    <th className="text-left p-3 text-amber-900">Nom</th>
                                    <th className="text-left p-3 text-amber-900">Email</th>
                                    <th className="text-left p-3 text-amber-900">Rôle</th>
                                    <th className="text-left p-3 text-amber-900">Badge</th>
                                    <th className="text-left p-3 text-amber-900">Statut</th>
                                    <th className="text-left p-3 text-amber-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b">
                                        <td className="p-3 font-[merriweather]">{user.first_name}</td>
                                        <td className="p-3 font-[merriweather]">{user.last_name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user?.role?.name || '-'}</td>
                                        <td className="p-3">{user?.badge?.title || '-'}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${styleStatus[user.status] || ''}`}>{user.status}</span>
                                        </td>
                                        <td>
                                            {user?.status !== "Active" && <ActiveButton element={user} handleAction={handleActivate} /> }
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:hidden mt-4">
                            {users.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 shadow"
                            >
                                <h3 className="font-medium font-[merriweather] text-amber-900 text-lg mb-1">
                                    {user.first_name} {user.last_name}
                                </h3>
                                <p className="text-sm text-amber-700 break-words">📧 {user.email}</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    🛡️ <span className="font-medium">{user?.role?.name || '-'}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    🎖️ <span className="font-medium">{user?.badge?.title || '-'}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    📌 <span className="text-green-600">{user.status}</span>
                                </p>

                                <div className="flex justify-between items-center mt-4 text-sm">
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserList;
