import React, { useState } from 'react';

function OrderForm() {
  const [userId, setUserId] = useState('');
  const [productName, setProductName] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [externalNumber, setExternalNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const orderDetails = {};
    orderDetails[productName] = 1;

    const address = {
      street,
      postalCode,
      externalNumber
    };

    const formData = {
      userId,
      orderDetails: JSON.stringify(orderDetails),
      address: JSON.stringify(address)
    };

    console.log('Datos del formulario:', formData);

    setUserId('');
    setProductName('');
    setStreet('');
    setPostalCode('');
    setExternalNumber('');
  };

  return (
    <div>
      <h2>Formulario de Pedido</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Nombre del Producto:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </label>
        <br />
        <label>
          Calle:
          <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
        </label>
        <br />
        <label>
          Código Postal:
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </label>
        <br />
        <label>
          Número Exterior:
          <input type="text" value={externalNumber} onChange={(e) => setExternalNumber(e.target.value)} />
        </label>
        <br />
        <button type="submit">Enviar Pedido</button>
      </form>
    </div>
  );
}

export default OrderForm;