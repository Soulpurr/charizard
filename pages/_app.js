import "../styles/globals.css";
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CartState from "../context/cartState";

function MyApp({ Component, pageProps }) {
  
  return( 
    <>
    <CartState>
    <Navbar/>  
  <Component {...pageProps} />
  <Footer/>
  </CartState>
  </>)
}

export default MyApp
