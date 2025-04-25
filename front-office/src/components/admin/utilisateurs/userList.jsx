import { useEffect, useState } from 'react';

const UserList = ({ users: initialUsers, message }) => {
  const [users, setUsers] = useState(initialUsers || []);

  useEffect(() => {
    setUsers(initialUsers || []);
  }, [initialUsers]);

  return (
    <div className="p-2 w-full">
      {users && users.length === 0 && (
        <div className="p-4 text-center text-amber-700 text-sm">{message}</div>
      )}
      {users && users.length !== 0 && (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-3 text-amber-900">Prénom</th>
              <th className="text-left p-3 text-amber-900">Nom</th>
              <th className="text-left p-3 text-amber-900">Email</th>
              <th className="text-left p-3 text-amber-900">Rôle</th>
              <th className="text-left p-3 text-amber-900">Statut</th>
              <th className="text-left p-3 text-amber-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-1 pl-2 text-amber-900 text-sm md:text-[1rem] font-[merriweather]">{user.first_name}</td>
                <td className="p-1 pl-2 text-amber-900 text-sm md:text-[1rem] font-[merriweather]">{user.last_name}</td>
                <td className="p-1 text-amber-700 text-xs md:text-sm">{user.email}</td>
                <td className="p-1 text-amber-700 text-xs md:text-sm">{user.role}</td>
                <td className="p-1 text-amber-700 text-xs md:text-sm">{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;