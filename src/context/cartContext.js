import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartID, setCartID] = useState("")
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [change, setChange] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const adminLogin = () => {
    setIsAdmin(true)
  } 

  const adminLogout = () => {
    setIsAdmin(false)
  }

  const loginContext = () => {
    setIsAuthenticated(true);
  };

  const logoutContext = () => {
    setIsAuthenticated(false);
  };


  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/session/current', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('No se pudo acceder a la seccion');
        }
       
        const cartData = await response.json();
        setCartID(cartData.payload.cart); 
        
        if(cartData.payload.rol === 'admin'){
          adminLogin()
        }
        
        loginContext()
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchCart();
  }, []);
  
  useEffect(() => {
    const getCart = async () => {
      setLoading(true);
      try {
        if(cartID){
          const response = await fetch(`http://localhost:8080/api/carts/${cartID}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error('No se pudo obtener el carrito');
          }
          const cartData = await response.json();
        
          setCart(cartData.carrito);
          setLoading(false);
        }else{
          console.log('no se carggo')
        }
      
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    getCart();
  }, [cartID, change]);


  const addToCart = async (productID) => {
    setLoading(true);
    try {
      if(cartID){
        const response = await fetch(`http://localhost:8080/api/carts/${cartID}/add/${productID}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('No se pudo obtener el carrito');
        }
        console.log(await response.json(),'se agrego')
        setChange(Math.random())
        setLoading(false);
      }else{
        console.log('no se carggo')
      }
    
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const partialCost = (cart) => {
    let totalCost = 0;

    cart.forEach(item => {
      const itemCost = item.productID.price * item.cant;
      totalCost += itemCost;
    });

    return totalCost;
  };

  const clearCart = async (productID) => {
    setLoading(true);
    try {
      if(cartID){
        const response = await fetch(`http://localhost:8080/api/carts/${cartID}/product/${productID}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('No se pudo obtener el carrito');
        }
        console.log(await response.json(),'se borro')
        setChange(Math.random())
        setLoading(false);
      }else{
        setLoading(true);
      }
    
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const cartCreate = async (userId) => {
    setLoading(true);

    if(!userId){
      throw new Error('userId no existe ')
    }
    try {
        const response = await fetch(`http://localhost:8080/api/carts/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: userId
          })
        });
    
        if (!response.ok) {
          throw new Error('No se pudo obtener el carrito');
        }
        console.log(await response.json(),'new Carrito')
        setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  const updateCartItem = async (productID, updatedQuantity) => {
    setLoading(true);
    try {
      if(cartID){
        const response = await fetch(`http://localhost:8080/api/carts/${cartID}/product/${productID}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: updatedQuantity
          })
        });
    
        if (!response.ok) {
          throw new Error('No se pudo obtener el carrito');
        }
        console.log(await response.json(),'se actualizo')
        setChange(Math.random())
        setLoading(false);
      }else{
        setLoading(true);
      }
    
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const cartValue = {
    cart,
    cartID,
    addToCart,
    clearCart,
    partialCost,
    cartCreate,
    updateCartItem,
    isAuthenticated,
    loginContext,
    logoutContext,
    adminLogin,
    adminLogout,
    isAdmin,
    loading,
    error
  };

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
};