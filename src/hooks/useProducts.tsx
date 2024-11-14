import { useContext } from "react";
import {UseProductsContextType, ProductsContext} from "../context/ProductsProvider";

export default function useCart(): UseProductsContextType {
    const cartContext: UseProductsContextType = useContext(ProductsContext);
    return cartContext;
}