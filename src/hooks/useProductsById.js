import { useState, useEffect } from 'react';

function useProductById(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(productId,'productId')

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api49980.onrender.com/api/products/${productId}`);
        console.log(response,'response')
        if (!response.ok) {
          throw new Error('No se pudo obtener el producto');
        }
      
        const data = await response.json();
        console.log(data,'DATA AHORA DATA AHORA')
     
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductById();
    }
  }, [productId]);

  return { product, loading, error };
}

export default useProductById;