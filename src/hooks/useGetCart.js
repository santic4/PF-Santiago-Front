import { useState } from 'react';

const useGetCartById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState(null);

  const getCartById = async (cartId) => {
    setLoading(true);
    setError(null);
    setCartData(null);

    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al obtener el carrito');
      }

      const cart = await response.json();
      return cart;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, cartData, getCartById };
};

export default useGetCartById;