import React, { useContext } from 'react';
import '../styles/itemDetail.css';
import { CartContext } from '../context/cartContext.js';

const ItemDetail = ({ producto }) => {
    const { addToCart, loading, error, success } = useContext(CartContext);

    const handleAddToCart = () => {
        const productID = producto._id;
        addToCart(productID);  
    };

    if (!producto) {
        return <p>Cargando...</p>; 
    }

    const { title, price, description, code, stock, imagen, categoria } = producto;

    return (
        <section>
            <div className='tituloCarrito'>
                <h3>Estás viendo: {title} </h3>
            </div>

            <div className="ItemDetail">
                <img src={imagen} alt={title} />
                <h2>$ {price}</h2>
                <h6>{description}</h6>
                <p>Categoria: {categoria}</p>
                <p>COD: {code}</p>
                <p>Stock: {stock}</p>
                <button onClick={handleAddToCart} disabled={loading || success}>Agregar al carrito</button>
                {loading && <p>Cargando...</p>}
                {error && <p>Error: {error}</p>}
                {success && <p>¡Producto agregado al carrito!</p>}
            </div>
            
        </section>
    );
}

export default ItemDetail;
