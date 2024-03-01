import {createSlice} from '@reduxjs/toolkit';

const userCartPage = createSlice({
    name: 'userCartPage',
    initialState: {
        userCartPageOpen: false
    },
    reducers: {
        userCartPageShow: (state, {payload})=>{
            state.userCartPageOpen = payload;
        }
    }
});


export const {userCartPageShow} = userCartPage.actions;

export default userCartPage.reducer;