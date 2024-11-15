import useCart from "../hooks/useCart"
import useProducts from "../hooks/useProducts"
import Product from "./Product";

function Products() {
    const {products} = useProducts();
    console.log(products);
    return (
        <div>
            {products.length === 0 && <p>Currently, there are no avaialable products for sale</p>}
            {products.map(product => <Product key={product.sku} product={product} /> )}
        </div>
    )
}

export default Products
