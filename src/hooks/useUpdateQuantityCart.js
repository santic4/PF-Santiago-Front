import { useState } from 'react';

const useUpdateCartItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCartItem = async (cartId, productId, newQuantity) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Error updating product quantity in cart');
      }

      const updatedProduct = await response.json();
      return updatedProduct;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateCartItem };
};

export default useUpdateCartItem;