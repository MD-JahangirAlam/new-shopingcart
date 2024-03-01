import { configureStore } from '@reduxjs/toolkit'
import userStoreCart from './ProductStore'
import userCartPage from './UserCartPageStore';


const Store = configureStore({
    reducer: {
        UserProduct: userStoreCart,
        UserCartPage: userCartPage
    }
});

export default Store;