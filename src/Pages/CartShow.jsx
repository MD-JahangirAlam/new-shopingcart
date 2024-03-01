import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function CartShow() {
    const {cartId} = useParams();
    const [cart, setCart] = useState([])

    useEffect(() =>{
        axios.get('https://fakestoreapi.com/products').then(res =>{
            if(res.status == 200){
                const cartItem = res.data.filter(items => items.id == cartId);

                setCart(cartItem)
            }
        })
    },[])

    // console.log(cart[0].image)
  return (
    <>
    {
        cart.length > 0 ?
        <div className='container'>
        <div className="product-box mt-5">
            <div className="product-header">
                <h4 className='text-center pt-4' style={{textTransform: 'uppercase'}}>your product description</h4>
            </div>
            <div className="product-body">
                <div className="product-img">
                    <img src={cart[0].image} alt="fdgdfgd" />
                </div>
                <div className="product-description">
                    <h3>{cart[0].title}</h3>
                    <p>{cart[0].description}</p>
                    <h5>${cart[0].price}</h5>
                    <button className="btn btn-primary">cart</button>
                </div>
            </div>
        </div>
    </div>
        : <></>
    }
    </>
  )
}

export default CartShow