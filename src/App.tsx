import Header from "./components/Header"
import { Page } from "./components/Nav";
import Products from "./components/Products"
import Cart from "./components/Cart"
import Footer from "./components/Footer"

import { useCallback, useState } from "react"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.PRODUCTS);

  const goToProducts = useCallback(()=> {
    setCurrentPage(Page.PRODUCTS);
  }, [])

  const goToCart = useCallback(()=> {
    setCurrentPage(Page.CART);
  }, [])


  return (
    <div className="App">
      <Header goToProducts={goToProducts} goToCart={goToCart} currentPage={currentPage}/>
      {currentPage === Page.PRODUCTS && <Products/>}
      {currentPage === Page.CART && <Cart/>}
      <Footer currentPage={currentPage}/>
    </div>
  )
}

export default App
