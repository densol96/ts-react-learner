import { useState } from "react";

import CartContext from "../context/CartProvider";
import CartLineItem from "./CartLineItem";
import useCart from "../hooks/useCart";

function Cart() {
    const [confirm, setConfirm] = useState<boolean>(false);
    const {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart, totalPriceFormatted} = useCart();
    const onSubmitOrder = () => {
        dispatch({type: REDUCER_ACTIONS.SUBMIT})
        setConfirm(true);
    }
    return confirm ? <h2>Thank ypu for your order!</h2> 
    : <>
        <h2 className="offscreen">Cart</h2>
        <ul className="cart">
            {cart.map(item => <CartLineItem key={item.sku} item={item} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />)}
        </ul>
        <div className="cart__totals">
            <p>Total Items: {totalItems}</p>
            <p>Total Price: {totalPriceFormatted}</p>
            <button disabled={!totalItems} className="cart__submit" onClick={onSubmitOrder}>
                Place Order
            </button>
        </div>
    </>
    
}

export default Cart
