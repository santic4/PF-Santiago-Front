import { useState } from 'react';

const useDeleteProductInCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteProductInCart = async (cartId, productId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`https://api49980.onrender.com/api/products/carts/${cartId}/product/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto del carrito');
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, deleteProductInCart };
};

export default useDeleteProductInCart;