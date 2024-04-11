import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import CartWidget from './CartWidget';
import { CartContext } from '../context/cartContext';

function Navbar() {
  const { isAuthenticated, isAdmin } = useContext(CartContext);

  return (
    <section className='containerTotal'>
      <nav>
        <div className="logo">
          <Link to="/" >
            Mi Sitio
          </Link>
        </div>

        <div className="nav-links">
          <ul>
            {isAuthenticated && ( 
              <li>
                <Link to="/cart">
                  Carrito
                </Link>
              </li>
            )}
            {!isAuthenticated && ( 
              <>
                <li>
                  <Link to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link to="/create-user">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && ( 
              <li>
                <Link to="/profile">
                  Perfil
                </Link>
              </li>
            )}
            {isAdmin && ( 
              <li>
                <Link to="/admin">
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
        {isAuthenticated && ( 
        <div className="cart-widget-container">
          <CartWidget />
        </div>
      )}
      </nav>

     
    </section>
  );
}

export default Navbar;
