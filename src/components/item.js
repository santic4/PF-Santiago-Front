import React from 'react';
import '../styles/item.css';
import { Link } from 'react-router-dom';

const Item = ({ prod }) => {
  return (
    <div className="card">
      <img src={prod.imagen} alt={prod.title} />
      
      <div className="card-content">
        <h3>{prod.title}</h3>
            <p>{prod.description}</p>
            <p>${prod.price}</p>
            <p>{prod.stock}</p>
      </div>

      <Link to={`/products/${prod._id}`}>
        <button>Ver Más</button>
      </Link>
    </div>
  );
};



export default Item;
