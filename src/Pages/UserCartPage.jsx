import React, { useEffect } from 'react'
import { IoIosClose } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { userCartPageShow } from '../Redux-Toolkit/UserCartPageStore';
import { productControl } from '../Redux-Toolkit/ProductStore';

function UserCartPage() {
    const Dispatch = useDispatch()
    const { userCartPageOpen } = useSelector(state => state.UserCartPage);
    const { userProduct, productTotalprice } = useSelector(state => state.UserProduct);

    const userCartBodyControl = e => {
        if (e.target.className == 'user-product' || e.target.className == 'close-btn') {
            Dispatch(userCartPageShow(false))
        }
    }
    useEffect(() => {

        const userCartBody = document.querySelector('.user-product');
        userCartBody.addEventListener('click', userCartBodyControl);
    }, [])


    // for product amaunt control
    const productAmauntControl = (e, id) => {
        if (e == 'INC') {
            Dispatch(productControl([e, id]));
        } else if (e == 'DEC') {
            Dispatch(productControl([e, id]))
        } else if (e == 'Delete') {
            Dispatch(productControl([e, id]))
        }
    }

    return (
        <div className='user-product' style={{ display: userCartPageOpen ? '' : 'none', }}>
            <div className="user-product-body">
                <span className='close-btn'>
                    <IoIosClose style={{ pointerEvents: 'none' }} />
                </span>
                <div className="user-cart-header">
                    <h4>your cart list</h4>
                    <h5>total price : <span>${parseFloat(productTotalprice).toFixed(2)}</span></h5>
                </div>
                <div className="user-cart-list">
                    {
                        userProduct.map((item, index) => {
                            return (
                                <div key={index} className="user-cart-items mt-3">
                                    <div className="cart-img">
                                        <img src={item.image} width='200' height='200' alt="" />
                                    </div>
                                    <div className="user-cart-text">
                                        <h6>{item.title.substring(0, 20)}</h6>
                                        <span style={{ cursor: 'pointer' }} onClick={() => productAmauntControl('Delete', item.id)}>remove</span>
                                    </div>
                                    <div className="user-cart-price">
                                        <h6>price <span>${parseFloat(item.price * item.Amaunt).toFixed(2)}</span></h6>
                                    </div>
                                    <div className="user-cart-control">
                                        <IoIosArrowUp style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => productAmauntControl('INC', item.id)} />
                                        <span style={{ userSelect: 'none' }}>{item.Amaunt}</span>
                                        <IoIosArrowDown style={{ cursor: 'pointer', userSelect: 'none' }} onClick={() => productAmauntControl('DEC', item.id)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserCartPage