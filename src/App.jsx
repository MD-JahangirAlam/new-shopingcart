import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBar from './Pages/NavBar'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import UserCartPage from './Pages/UserCartPage'

function App() {

  return (
    <>
      <div className="nav-section">
        <NavBar />
      </div>
      <UserCartPage />
      <Outlet />
    </>
  )
}

export default App
