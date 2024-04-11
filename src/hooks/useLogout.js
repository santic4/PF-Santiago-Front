import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logoutContext, adminLogout } = useContext(CartContext);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api49980.onrender.com/api/session/current', {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al cerrar sesión');
      }
      adminLogout()
      logoutContext()
      console.log('¡Sesión cerrada exitosamente!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logout };
};

export default useLogout;