import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    
    // Cart state
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    //this function is for bringing data from local storage.
    useEffect(()=>{
        const bringData = getStoredCart()

        const savedCart = [];
        //we extract object data from LS. that's why we run in loop.
        for(const id in bringData){
            //we find data from products and match it with id.
            const existingData = products.find(product => product.id === id)
            if(existingData){
                const quantity = bringData[id];
                existingData.quantity = quantity;
                savedCart.push(existingData);
            } 
        }
        setCart(savedCart);
        //dependency inject
    },[products])

    
    // below function is for button handler from product.
    const handleToCart = (selectedProduct) => {
            // console.log(product);
            let newCart =[];
            //find existing cart
            const existingCart = cart.find(product => product.id === selectedProduct.id )
            // if cart does not exist 
            if(!existingCart){
                selectedProduct.quantity = 1;
                newCart = [...cart, selectedProduct];
            }
            // if cart exists
            else{
                const rest = cart.filter(product => product.id !== selectedProduct.id);
                existingCart.quantity = existingCart.quantity + 1;
                newCart = [...rest, existingCart];
            }
            setCart(newCart);
            addToDb(selectedProduct.id);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">     
                {
                    products.map(product => <Product 
                        key={product.id}
                        product={product}
                        handleToCartBtn={handleToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;