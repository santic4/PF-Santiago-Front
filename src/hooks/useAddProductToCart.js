import { useState } from 'react';

const useAddProductToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const addProductToCart = async (productID) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const cartID = localStorage.getItem("carrito");
      const response = await fetch(`https://api49980.onrender.com/api/carts/${cartID}/add/${productID}`, {
        method: 'PUT',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, addProductToCart };
};

export default useAddProductToCart;