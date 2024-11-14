import { useContext } from "react";
import {CartContextType, CartContext} from "../context/CartProvider";

export default function useCart(): CartContextType {
    const cartContext: CartContextType = useContext(CartContext);
    return cartContext;
}