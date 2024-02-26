import {configureStore} from '@reduxjs/toolkit';

import userCart from './CartStore';

const Store = configureStore({
    reducer: {
        userCart
    }
});

export default Store;