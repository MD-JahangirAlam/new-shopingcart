import React from 'react'
import ReactDOM from 'react-dom/client'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import Store from './Redux-Toolkit/CartStore.js';

import Product from './Pages/Product.jsx';
import CartShow from './Pages/CartShow.jsx';

// const Router = createBrowserRouter(
//   createRoutesFromChildren(
//     <Route path='/' element={<App />} >
//       <Route path='/product' element={<Product />} />
//     </Route>
//   )
// )

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/cartshow/:cartId',
        element: <CartShow />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={Router} />
  </Provider>
)
