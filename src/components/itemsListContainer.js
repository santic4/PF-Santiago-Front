import React from 'react';
import { useProducts } from '../hooks/useProducts'; 
import ItemList from './itemsList'; 
import { useParams } from 'react-router-dom';

const ItemsListContainer = () => {
  const { categoryId } = useParams(); 
  const productos = useProducts(categoryId);

  return (
    <div>
      <h2 className='divCategory'>Lista de Productos</h2>
      <div className="greeting">
      <ItemList productos={productos} />
      </div>
    </div>
  );
};

export default ItemsListContainer;