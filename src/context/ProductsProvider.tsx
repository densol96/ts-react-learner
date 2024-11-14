import { createContext, ReactElement, useEffect, useState } from "react";

export type ProductType = {
    sku: string,
    name: string,
    price: number
};

const initState: ProductType[] = []

export type UseProductsContextType = {products: ProductType[] }

const initContextState: UseProductsContextType = {products: []}

export const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ContextPropType = {children?: ReactElement | ReactElement[]}

export default function ProductsProvider ({children}: ContextPropType): ReactElement {
    const [products, setProducts] = useState<ProductType[]>(initState)

    useEffect(() => {
        const fetchProducts = async(): Promise<ProductType[]> => {
            // npx json-server -w data/products.json -p 3500
            const data = await fetch("http://localhost:3500/products");
            return await data.json();
        }
        fetchProducts().then(data => setProducts(data));
    }, [])

    return (<ProductsContext.Provider value={{ products }}>
        {children}
        </ProductsContext.Provider>
        )
}

