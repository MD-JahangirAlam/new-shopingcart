import { createSlice } from "@reduxjs/toolkit";
import { addCart, getCart } from "../LocalStore/userCartStore";

const cartValueControl = (e) => {
    let cartAmaunt = 0;
    e.map((items) => {
        // console.log(items);
        cartAmaunt = cartAmaunt + items.amaunt;
    });

    return cartAmaunt;
};

const cartTotalValue = (e) => {
    let cartTotal = 0;
    e.map((items) => {
        cartTotal = cartTotal + (items.price * items.amaunt);
    });
    return cartTotal;
};

const userContent = {
    userCartValue: getCart() ? getCart() : [],
    cartAmaunt: getCart() ? cartValueControl(getCart()) : 0,
    cartTotal: getCart() ? cartTotalValue(getCart()) : 0,
    isLoding: true,
};

const UserCart = createSlice({
    name: "userCart",
    initialState: userContent,
    reducers: {
        addUserCart: (state, action) => {
            // FOR ADD INITIALSTATE VALUE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            state.userCartValue = [action.payload, ...state.userCartValue];
            // FOR ADD LOCAL STORE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            addCart(state.userCartValue);
            // FOR ADD INITIALSTATE CART AMAUNT VALUE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            state.cartAmaunt = cartValueControl(state.userCartValue);
            //FOR ADD INITIALSTATE CART TOTAL VALUE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            state.cartTotal = cartTotalValue(state.userCartValue);
        },
        addAmauntValue: (state, { payload }) => {
            // IF THERE ARE NOT ANY VALUE'S IN STATE USERCARTVALIE ::::::::::::::::::::::::::::::::::::::::::::::::::
            if (state.userCartValue.length == 0) return;

            if (payload[1] == null) {
                // FOR ALL CART ITEM DELETE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                if (payload[0] == 'alldelete') {

                    state.userCartValue = [];
                }

                // FOR ADD LOCAL STORE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                addCart(state.userCartValue);
                // FOR ADD INITIALSTATE CART AMAUNT VALUE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                state.cartAmaunt = cartValueControl(state.userCartValue);
                //FOR ADD INITIALSTATE CART TOTAL VALUE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                state.cartTotal = cartTotalValue(state.userCartValue);

                return;
            }

            // FOR FINDING CURRENT CART ITEM ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            const currentItems = state.userCartValue.find(
                (items) => items.id == payload[1]
            );

            // FOR SETING CURRENT CART AMAUNT VALUE IN TO THE VARIABLE:::::::::::::::::::::::::::::::::::::::::::::::
            let currentAmaunt = currentItems.amaunt;

            // FOR INC AND DEC OF CART ITEM :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            if (payload[0] == "inc") {
                // FOR INC OF CART ITEM :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                currentAmaunt = currentAmaunt + 1;
            } else if (payload[0] == "dec") {
                // FOR DEC OF CART ITEM :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                currentAmaunt = currentAmaunt - 1;
            }

            // FOR ADD CART AMAUNT VALUE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            currentItems.amaunt = currentAmaunt;

            // FOR CART ITEMS DELETE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            if (currentAmaunt == 0 || payload[0] == 'delete') {
                const deleteCartItems = state.userCartValue.filter(items => items.id !== payload[1])

                state.userCartValue = deleteCartItems;
            }



            // FOR ADD LOCAL STORE ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            addCart(state.userCartValue);
            // FOR ADD INITIALSTATE CART AMAUNT VALUE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            state.cartAmaunt = cartValueControl(state.userCartValue);
            //FOR ADD INITIALSTATE CART TOTAL VALUE :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
            state.cartTotal = cartTotalValue(state.userCartValue);
        },
    },
});

export const { addUserCart, addAmauntValue } = UserCart.actions;

export default UserCart.reducer;
