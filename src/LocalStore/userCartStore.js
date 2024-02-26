

const cart = class {
    static addCart = (e)=>{
        localStorage.setItem('cart', JSON.stringify(e))
    }
    static getCart = () =>{
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}


export const {addCart, getCart} = cart;