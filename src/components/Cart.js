import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartContext } from '../context/cartContext';

const Cart = () => {
  
  const { cart, cartID, partialCost, clearCart, updateCartItem, loading, error } = useContext(CartContext);
  const [updatedQuantity, setUpdatedQuantity] = useState(1);

  const handleDeleteProduct = (productID) => {
    clearCart(productID);
  };

  const handleUpdateQuantity = (productID) => {
    updateCartItem(productID, updatedQuantity);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cart.length === 0) {
    return (
      <div className='CartPage'>
        <h1>No hay items en el carrito</h1>
        <Link to='/' className='Option'>Productos</Link>
      </div>
    );
  }

  return (
    <section className='carrito'>
      <h2>Productos en el carrito:</h2>

      <div className='precio'>
        <h3>Total: ${partialCost(cart)}</h3>
        <button><Link to={`/checkout/${cartID}`} className='checkout'>Checkout</Link></button>
      </div>

      <div className="CartPage">
        <ul>
        {cart.map(product => (
          <li className="CartItem" key={product._id}>
            <h3>{product.productID ? product.productID.title : 'Producto sin título'}</h3>
            <p>Precio: ${product.productID ? product.productID.price : 'N/A'}</p>
            <p>Categoría: {product.productID ? product.productID.category : 'N/A'}</p>
            <p>Cantidad: {product.cant}</p>
            <input type="number" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(parseInt(e.target.value))} />
            <button onClick={() => handleUpdateQuantity(product.productID?._id)} className='buttonClear'>Actualizar Cantidad</button>
            <button onClick={() => handleDeleteProduct(product.productID?._id)} className='buttonClear'>Eliminar</button>
          </li>
        ))}
        </ul>
      </div>
    </section>
  );
};

export default Cart;
