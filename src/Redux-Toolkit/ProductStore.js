import { createSlice, current } from '@reduxjs/toolkit'

// FOR PRODUCT TOTAL ITEMS CONTROL AND ADD
const productTotalItemControl = (allItem) => {
    let totalProduct = 0;

    allItem.map(item => {
        totalProduct = totalProduct + item.Amaunt;
    })

    return totalProduct;
}

// FOR USER ALL PRODUCT PRICE
const productTotalPriceControl = (items) => {
    let totalPrice = 0;

    items.map(item => {
        totalPrice = totalPrice + (item.price * item.Amaunt);
    });

    return totalPrice;
}


const Initproduct = {
    userProduct: [],
    productTotalItems: 0,
    productTotalprice: 0
}


const ProductStore = createSlice({
    name: 'UserProduct',
    initialState: Initproduct,
    reducers: {
        addUserCart: (state, { payload }) => {
            state.userProduct = [payload, ...state.userProduct];
            state.productTotalItems = productTotalItemControl(state.userProduct);
            state.productTotalprice = productTotalPriceControl(state.userProduct);
        },
        productControl: (state, { payload }) => {
            let currentItemAmaunt = state.userProduct.find(item => item.id == payload[1])
            let amauntControl = currentItemAmaunt.Amaunt;
            if (payload[0] == 'INC') {
                amauntControl = amauntControl + 1
            } else if (payload[0] == 'DEC') {
                amauntControl = amauntControl - 1
                if (amauntControl == 0) {
                    state.userProduct = state.userProduct.filter(item => item.id !== payload[1])
                }
            } else if (payload[0] == 'Delete') {
                state.userProduct = state.userProduct.filter(item => item.id !== payload[1])
            }

            currentItemAmaunt.Amaunt = amauntControl;

            state.productTotalItems = productTotalItemControl(state.userProduct);
            state.productTotalprice = productTotalPriceControl(state.userProduct);
        }
    }
})


export const { addUserCart, productControl } = ProductStore.actions;

export default ProductStore.reducer;