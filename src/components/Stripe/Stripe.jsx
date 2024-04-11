import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentsForm';
import Wrapper from './Wrapper';
import '../../styles/stripe.css';
import ProductCard from './ProductCard';
import PaymentService from '../../services/paymentServices';

const keyStripe = "pk_test_51P324vP7hOvJYPuDVReZigw1bCDnjfhCjphZ4PW9LwHFZ3e8fO0OaiVJnYroF1n3A96kMLkeioO8xweYO6bnuEhu00UrsLPJzH"
const stripePromise = loadStripe(keyStripe);

const Stripe = () => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [clientSecret,setClientSecret] = useState(null);

    const mockCart = [
        { id: "89fa5d32-99b9-45a8-bb51-7afc7658fc53", name: "papas", price: 1000 },
        { id: 2, name: "queso", price: 500 },
        { id: 3, name: "hamburguesa", price: 1500 },
        { id: 4, name: "soda", price: 1000 },
        { id: 5, name: "golosinas", price: 800 }
    ]

    useEffect(() => {
        const getClientSecret = async () => {
            console.log(currentProduct,' CURRENT PRODUCTS ');
            const service = new PaymentService();
            service.createPaymentIntent({productId:currentProduct,callbackSuccess:callbackSuccessPaymentIntent,callbackError:callbackErrorPaymentIntent})
        }
        currentProduct&&getClientSecret();
    }, [currentProduct])

    const callbackSuccessPaymentIntent = (res) =>{
        setClientSecret(res.data.payload.client_secret)
    }

    const callbackErrorPaymentIntent = err => {
        console.log(err);
    }
    return (<>
        <div className="container">
            <h1 className="title">Stripe</h1>
        </div>
        <div className="highlighted container">
            <Wrapper hidden={currentProduct}>
                <div className="productsContainer">
                    {mockCart.map(product => <ProductCard key={product.id} product={product} setCurrentProduct={setCurrentProduct} />)}
                </div>
            </Wrapper>
            <Wrapper hidden={!clientSecret||!stripePromise}>
                <Elements stripe={stripePromise} options={{clientSecret:clientSecret}}>
                    <PaymentForm/>
                </Elements>
            </Wrapper>
        </div>
    </>)
}

export default Stripe;