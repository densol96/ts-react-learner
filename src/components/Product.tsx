import {ProductType} from "../context/ProductsProvider"
import useCart from "../hooks/useCart"
import {formatCurrency} from "../context/CartProvider"

function Product({ product }: {product: ProductType}) {
    const image: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    const {dispatch, REDUCER_ACTIONS, cart} = useCart();

    const onAddToCart = () => dispatch({type: REDUCER_ACTIONS.ADD, payload: {...product, qty: 1}})
    const inCart = cart.some((item) => item.sku === product.sku)
    return (
        <article className="product">
            <h3>{product.name}</h3>
            <img src={image} alt="Product image" className="product__img" />
            <p>{formatCurrency(product.price)}</p>
            {inCart && '-> Item in Cart :)'}
            <button onClick={onAddToCart}>Add to cart</button>
        </article>
    )
}

export default Product
