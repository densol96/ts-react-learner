import useCart from "../hooks/useCart";
import { Page } from "./Nav";


function Footer({currentPage}: {currentPage: Page}) {
    const {totalItems, totalPriceFormatted} = useCart();

    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            {currentPage === Page.CART&& (
                <>
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: {totalPriceFormatted}</p>
                    
                </>
            )}
            <p>Shopping Cart &copy; {year}</p>
        </footer>
    )
}

export default Footer
