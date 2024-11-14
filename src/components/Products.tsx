import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import Product from "./Product";

function Products() {
    const {products} = useProducts();
    console.log(products);
    return (
        <div>
            HELLO
            {products.map(product => <Product key={product.sku} product={product} /> )}
        </div>
    )
}

export default Products
