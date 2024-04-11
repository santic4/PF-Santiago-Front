import { useEffect, useState } from 'react';

export const useProducts = (selectedCategory) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://api49980.onrender.com/api/products';
        if (selectedCategory) {
          url = `https://api49980.onrender.com/api/products/category?category=${selectedCategory}`;
        }

        const response = await fetch(url);

        const data = await response.json();
        console.log(data,'DATA')
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Clean-up function
    return () => setProducts([]);
  }, [selectedCategory]);

  return products;
};