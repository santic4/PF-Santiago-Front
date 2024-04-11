import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cartContext';

export const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    age: '',
    password: ''
  });

  const { cartCreate } = useContext(CartContext);

  const createUserData = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
  
      const data = await response.json();
      const userId = await data.payload._id
      await cartCreate(userId);
      console.log('Usuario creado exitosamente');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserData(userData);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={userData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Age:</label>
        <input type="number" name="age" value={userData.age} onChange={handleChange} required />
      </div>
      <div>
        <label>Rol:</label>
        <select name="rol" value={userData.rol} onChange={handleChange} required>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Create User</button>
    </form>
    <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
};

export default CreateUserForm;