import React from 'react';
import { useStateValue } from '../StateProvider/StateProvider';
import './Product.css';

const Product = ({id, title, price, image, rating}) => {
    
    const [{ basket }, dispatch] = useStateValue();

    const addTobasket = () => {
        console.log("This an basket", basket);
        //dispach the items into data layer
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                price: price,
                image: image,
                rating: rating,
            }
        })

    }
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    
                    
                </div>
            </div>
            <img
                src={image}alt=""
            />
            <button onClick={addTobasket}>Add to Basket</button>

        </div>
    );
};

export default Product;