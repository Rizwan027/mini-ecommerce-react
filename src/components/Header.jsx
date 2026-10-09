import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { itemCount } = useCart()
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Northstar home">
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>NORTHSTAR<span className="brand-dot">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Shop</NavLink>
          <a href="/#story">Our story</a>
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Shopping cart, ${itemCount} items`}>
          <ShoppingBag size={19} /><span className="cart-label">Cart</span>
          <span className="cart-count">{itemCount}</span>
        </Link>
      </div>
    </header>
  )
}