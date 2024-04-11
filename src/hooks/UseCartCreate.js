import { useState } from 'react';

export const useCreateCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState(null);

  const createCart = async (username, userId) => {
    setLoading(true);
    setError(null);
    console.log(username, userId,' DATOS IMPORTANTES ')
    try {
      const response = await fetch('http://localhost:8080/api/carts/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          username: username,
          userId: userId 
        })
      });

      if (!response.ok) {
        throw new Error('Error creating new cart');
      }

      const data = await response.json();
      setCartData(data);
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, cartData, createCart };
};

export default useCreateCart;