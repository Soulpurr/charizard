import "../styles/globals.css";
import "regenerator-runtime/runtime";
import Footer from "../components/Navigation/Footer";
import Navbar from "../components/Navigation/Navbar";
import CartState from "../context/cartState";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartState>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </CartState>
    </>
  );
}

export default MyApp;
