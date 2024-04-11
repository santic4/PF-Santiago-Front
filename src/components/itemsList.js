import React from "react";
import Item from './item.js';
import '../styles/itemList.css';

const ItemList = ({ productos }) => {

    if (!productos) {
        // Si products es undefined, devuelve un mensaje o un elemento vacío
        return <div>No hay productos disponibles</div>;
    }

    let payloadArray

    if(productos.payload){
        payloadArray = Array.isArray(productos.payload) ? productos.payload : [];
    }else{
        payloadArray = productos
    }

    return (
        <div className="padreCards">
            {payloadArray.map((prod) => <Item key={prod._id} prod={prod} />)}
        </div>
    );
}

export default ItemList;