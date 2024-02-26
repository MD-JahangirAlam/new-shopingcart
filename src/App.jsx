import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import NavBar from './Pages/NavBar'
import Product from './Pages/Producr'
import ProductsDitels from './Pages/ProductsDitels'
import UserProductItems from './Pages/UserProductItems'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Product />} />
        <Route path='/cartditels/:id' element={<ProductsDitels />} />
        <Route path='/usercarts' element={<UserProductItems />} />
      </Routes>
    </>
  )
}

export default App
