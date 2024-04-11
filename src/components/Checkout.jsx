import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { createAlertWithCallback } from '../utils/alerts';

const Checkout = () => {
  const { cartId } = useParams()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const purchaseCart = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://api49980.onrender.com/api/carts/${cartId}/purchase`, {
          method: 'POST',
          credentials: 'include'
        });
        
        if (response.ok) {
            createAlertWithCallback('success', '¡Pago completado, le enviamos un mail!', `${response}`, () => window.location.replace('/'))
        }

      } catch (error) {
        console.log(error.message, 'error mensaje')
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Finaliza tu compra!</h2>
      <button onClick={purchaseCart}>Comprar</button>
    </div>
  );
};

export default Checkout;