import { Link } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import CheckoutProduct from '../Checkout/CheckoutProduct';
import { useStateValue } from '../StateProvider/StateProvider';
import './Payment.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../StateProvider/reducer';
import axios from './axios';
import { useHistory } from 'react-router-dom';

const Payment = () => {

    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true); 

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

        console.log("THE SECRECT IS>>>>>",clientSecret);

    const handelSubmit = async (event) => {
        // do all the stripe stuff....
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            history.replace('/orders')
        })
        
    }


    const handelChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details

        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>
                    )
                </h1>
                {/*  Payment section - delivery address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angels, CA</p>
                    </div>
                </div>

                {/*  Payment section - reviews items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/*  Payment section - Payment method */}

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                        <div className="payment__details">
                            <form onSubmit={handelSubmit}>
                                <CardElement onChange={handelChange} />

                                <div className="payment__priceContainer">
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <>
                                                <p>
                                                    {/* Part of the homework */}
                                                    Subtotal ({basket.length} items): <strong>{value}</strong>
                                                </p>
                                                <small className="subtotal__gift">
                                                    <input type="checkbox" /> This order contains a gift
                                                </small>
                                            </>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)} // Part of the homework
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                               {/*  Error */}
                               {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;