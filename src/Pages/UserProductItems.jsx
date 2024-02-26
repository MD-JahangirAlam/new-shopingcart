import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAmauntValue } from "../Redux-Toolkit/CartStore";
function UserProductItems() {
    const { userCartValue, cartTotal } = useSelector(state => state.userCart);

    const Dispatch = useDispatch();

    const quantityControl = (e, id) => {
        if (e == 'dec') {
            Dispatch(addAmauntValue([e, id]))
        } else if (e == 'inc') {
            Dispatch(addAmauntValue([e, id]))
        } else if (e == 'delete') {
            Dispatch(addAmauntValue([e, id]))
        } else if (e == 'alldelete') {
            Dispatch(addAmauntValue([e, null]))
        }
    }


    return (
        <div className="container">
            <h1 className="text-center p-5">user product list</h1>
            <div className="user-card d-flex justify-content-center">
                <div className="cart-body">
                    <div className="cart-detales p-5">
                        <div className="cart-total d-flex justify-content-between">
                            <h3><span style={{ color: 'red' }}>All Total</span> ${cartTotal}</h3>
                            <div className="cartalldelete-btn">
                                <button onClick={() => quantityControl('alldelete')} className="btn btn-danger">All Delete</button>
                            </div>
                        </div>
                    </div>
                    <ul className="user-cart cart-header">
                        <li>product</li>
                        <li>price</li>
                        <li>total</li>
                        <li>amaunt</li>
                        <li>delete</li>
                    </ul>
                    {
                        userCartValue.map((items, index) => {
                            return (
                                <ul key={index} className="user-cart cart-data">
                                    <li>
                                        <img width="50px" height="50px" src={items.thumbnail} alt="" />
                                    </li>
                                    <li>
                                        ${items.price}
                                    </li>
                                    <li>${items.price * items.amaunt}</li>
                                    <li>
                                        <button className="btn btn-primary" onClick={() => quantityControl('dec', items.id)}>-</button>
                                        <small style={{ padding: "8px", textAlign: "center" }}>{items.amaunt}</small>
                                        <button className="btn btn-primary" onClick={() => quantityControl('inc', items.id)}>+</button>
                                    </li>
                                    <li>
                                        <button onClick={() => quantityControl('delete', items.id)} className="btn btn-danger">Delete</button>
                                    </li>
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProductItems;
