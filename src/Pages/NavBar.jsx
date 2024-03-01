import React, { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BsCartPlus } from "react-icons/bs";
import { userCartPageShow } from '../Redux-Toolkit/UserCartPageStore';

const UserDetalse = ({ show }) => {
  return (
    <div className={`user-box ${show ? '' : 'user-box-tow'}`}>
      <div className="user-body">
        <h5>md jon</h5>
        <Link>Siting</Link>
        <button variant="danger" className='btn btn-danger' >
          log out
        </button>
      </div>
    </div>
  )
}

function NavBar() {
  const Dispatch = useDispatch()
  const { userCartPageOpen } = useSelector(state => state.UserCartPage)
  const { productTotalItems } = useSelector(state => state.UserProduct)
  const [showUser, setShowUser] = useState(true)

  const userBox = () => {
    setShowUser(user => !user)
  }

  const showUserCaerPage = () => {
    Dispatch(userCartPageShow(!userCartPageOpen))
  }
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">trasnition</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="/product/1">Product</Nav.Link>
          </Nav>
          <div className="cart-box" onClick={showUserCaerPage} style={{ cursor: 'pointer', fontSize: '25px', marginRight: '12px', color: '#ddd', position: 'relative' }}>
            {/* <Link to={'/usercartvalue'}> */}
            <BsCartPlus />
            <span style={{ position: 'absolute', top: -0, right: -0, fontSize: '12px', backgroundColor: '#c29203', padding: '2px', borderRadius: 4 }}>
              {productTotalItems}
            </span>
            {/* </Link> */}
          </div>
          <div>
            {/* <div className='d-flex'>
              <Link className='icon-body'>
                <PiSignInBold />
              </Link>
              <Link className='icon-body'>
                <PiSignOutBold />
              </Link>
            </div> */}
            <div className='user-icon' onClick={userBox}>
              <FaUser className='faicon' />
              <UserDetalse show={showUser} />
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar