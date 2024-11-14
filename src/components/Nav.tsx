export enum Page {
    CART="cart", 
    PRODUCTS="products"
  }

export type HeaderProps = {
    goToProducts: () => void,
    goToCart: () => void,
    currentPage: Page
}

function Nav({goToProducts, goToCart, currentPage}: HeaderProps) {
    return (
        <button onClick={currentPage === Page.CART ? goToProducts : goToCart}>
            {`GO TO ${currentPage === Page.CART ? Page.PRODUCTS: Page.CART}`.toUpperCase()}
        </button>
    )
}

export default Nav 
