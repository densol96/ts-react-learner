import useCart from "../hooks/useCart";
import Nav, { HeaderProps } from "./Nav";

function Header({goToProducts, goToCart, currentPage}: HeaderProps) {
    const {totalPriceFormatted, totalItems} = useCart();

    return (
        <header className="header">
            <div className="header__title-bar">
                <h1>Acme Co.</h1>
                <div className="header__price-box">
                    <p>Total items: {totalItems}</p>
                    <p>Total price: {totalPriceFormatted}</p>
                    <Nav goToProducts={goToProducts} goToCart={goToCart} currentPage={currentPage}/>
                </div>
            </div>
        </header>
    )
}

export default Header
