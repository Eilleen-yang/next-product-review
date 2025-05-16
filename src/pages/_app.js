import "../styles/globals.css";
import Layout from "../_components/Layout";
import { CartProvider } from "../context/cartContext";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartProvider>
  );
}
