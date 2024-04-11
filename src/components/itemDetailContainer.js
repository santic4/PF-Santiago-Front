import React from "react";
import ItemDetail from "./itemDetail.js";
import { useParams } from 'react-router-dom'
import useProductById from '../hooks/useProductsById.js' // Aquí se corrigió 'useGetProductoById' a 'useGetProductById'

export const ItemDetailContainer = () => {
    const { id } = useParams();
    const { product, loading, error } = useProductById(id); // Aquí se corrigió 'producto' a 'product'

    return (
        <div className="ItemDetailContainer">
            {loading && <p>Cargando...</p>}
            {error && <p>Ocurrió un error: {error.message}</p>}
            {product && <ItemDetail producto={product} />} 
        </div>
    )
}

export default ItemDetailContainer;