import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/cartContext.js';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart-widget">
      <Link to="/cart">

      <FaShoppingCart />

      {cart.lenght > 0 && <span className="notification">{cart.lenght}</span>}
      </Link>
    </div>
  );
};

export default CartWidget;






