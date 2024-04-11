import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const { loginContext, adminLogin } = useContext(CartContext);

  const login = async (loginData) => {
    try {
      const response = await fetch('https://api49980.onrender.com/api/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      const username = data.payload.username;
      console.log(username, 'Inicio de sesión exitoso');
      
      if (data.payload.rol === 'admin') {
        adminLogin();
      }

      loginContext();
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(loginData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={loginData.username} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;