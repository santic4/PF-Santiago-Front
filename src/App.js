import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Stripe from './components/Stripe/Stripe';
import ItemsListContainer from './components/itemsListContainer.js';
import ItemDetailContainer from './components/itemDetailContainer.js'
import Navbar from './components/navbar.jsx';
import Cart from './components/Cart.js';
import CreateUserForm from './components/createUser.js';
import Login from './components/loginForm.js';
import { CartProvider } from './context/cartContext.js';
import Profile from './components/profile.js';
import OrderForm from './components/OrderForm.js';
import FileUploadForm from './components/FileUploadForm.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import Checkout from './components/Checkout.jsx';

function App() {
  return (
    <BrowserRouter>

      <CartProvider>
    
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/create-user" element={<CreateUserForm />} /> 
          <Route path="/" element={<ItemsListContainer />} />
          <Route
            path="/category/:categoryId" element={<ItemsListContainer />}/>
          <Route path="/products/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path="/file-upload" element={<FileUploadForm />} /> 
          <Route path="/admin" element={<AdminPanel />} /> 
          <Route path="/checkout/:cartId" element={<Checkout />} /> 
          <Route path="/payments" element={<Stripe />} /> 
          <Route path="/order" element={<OrderForm />} /> 
        </Routes>

      </CartProvider>

    </BrowserRouter>
  );
}

export default App;