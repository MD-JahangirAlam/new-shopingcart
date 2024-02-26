import React from 'react'
import ReactDOM from 'react-dom/client'

import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux';

import Store from './Redux-Toolkit/ReduxStore.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  // <RouterProvider router={<Router />} />
  <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </Provider>

)
