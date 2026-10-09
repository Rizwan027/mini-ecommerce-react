import { Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import ShopPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'

function Footer() {
  return <footer className="site-footer"><div className="footer-inner"><span className="footer-brand">NORTHSTAR<span>.</span></span><span>Thoughtful essentials for everyday life.</span><span>© {new Date().getFullYear()} Northstar Supply</span></div></footer>
}

export default function App() {
  return <CartProvider><div className="app-shell"><Header /><Routes><Route path="/" element={<ShopPage />} /><Route path="/products/:id" element={<ProductDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="*" element={<main className="page-container"><h1>Page not found.</h1><a className="text-link" href="/">Return to shop</a></main>} /></Routes><Footer /></div></CartProvider>
}