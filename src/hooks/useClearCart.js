import { useState } from 'react';

const useClearCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearCart = async (cartId) => {
    setLoading(true);
    setError(null);
   

    try {
        const productID = 0
      const response = await fetch(`https://api49980.onrender.com/api/carts/${cartId}/product/${productID}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error clearing cart');
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, clearCart };
};

export default useClearCart;