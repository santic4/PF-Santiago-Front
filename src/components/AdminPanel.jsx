import React, { useState, useEffect } from 'react';
import { createAlert } from '../utils/alerts';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api49980.onrender.com/api/users', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        setUsers(data.payload);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const changeUserRole = async (uid, newRole) => {
    try {
      const response = await fetch(`https://api49980.onrender.com/api/users/premium/${uid}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rol: newRole
        })
      });

      if (response.status === 400) {
        createAlert('error', 'Error', 'Al usuario le falta documentación para completar la operación.');

        return; 
      }
  
      setUsers(prevUsers => {
        return prevUsers.map(user => {
          if (user.id === uid) {
            return { ...user, rol: newRole };
          }
          createAlert('success', 'Éxito', 'Rol de usuario actualizado.');
          return user;
        });
      });
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const deleteUser = async (uid) => {
    try {
      const response = await fetch(`https://api49980.onrender.com/api/users/delete/${uid}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        createAlert('success', 'Éxito', 'Usuario eliminado.');
      } else {
        createAlert('error', 'Error', 'Error al eliminar el usuario.');
      }

      const updatedUsers = users.filter(user => user.id !== uid);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              <td>
                <select
                  value={user.rol}
                  onChange={(e) => changeUserRole(user.id, e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="premium">Premium</option>
                </select>
                <button onClick={() => deleteUser(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
