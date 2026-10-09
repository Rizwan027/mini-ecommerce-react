import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import EmptyState from '../components/EmptyState'
import { useState } from 'react'
import { formatINR } from '../utils/currency'

export default function CartPage() {
  const { cart, itemCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (orderPlaced) return <main className="page-container checkout-success"><CheckCircle2 size={48} /><span className="eyebrow">DEMO CHECKOUT</span><h1>You're all set<span>.</span></h1><p>This is a demo store, so no payment was taken. Your order confirmation is simulated.</p><button className="primary-button" onClick={() => { clearCart(); setOrderPlaced(false) }}>Continue shopping <span>↗</span></button></main>

  return (
    <main className="page-container cart-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Continue shopping</Link>
      <div className="cart-heading"><div><span className="eyebrow">YOUR SELECTION</span><h1>Shopping bag<span>.</span></h1></div><span className="cart-item-label">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span></div>
      {!cart.length ? <EmptyState title="Your bag is taking a break" message="There’s nothing here just yet. Find something you love and add it to your bag." /> : (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Cart items">
            {cart.map((item) => <article className="cart-row" key={item.id}>
              <Link to={`/products/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.name} /></Link>
              <div className="cart-item-main"><span className="product-category">{item.category}</span><Link to={`/products/${item.id}`} className="cart-item-name">{item.name}</Link><span className="cart-unit-price">{formatINR(item.price)}</span>
                <div className="quantity-control"><button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button></div>
              </div>
              <div className="cart-row-end"><strong>{formatINR(item.price * item.quantity)}</strong><button className="remove-button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={16} /> Remove</button></div>
            </article>)}
            <button className="clear-cart" onClick={clearCart}>Clear bag</button>
          </section>
          <aside className="order-summary"><span className="eyebrow">THE TOTAL</span><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div><div className="summary-line"><span>Shipping</span><span className="free-shipping">Free</span></div><div className="summary-line"><span>Taxes</span><span>Calculated at checkout</span></div><div className="summary-total"><span>Total</span><strong>{formatINR(subtotal)}</strong></div><button className="primary-button checkout-button" onClick={() => setOrderPlaced(true)}><ShoppingBag size={17} /> Continue to checkout <span>↗</span></button><p className="demo-note">Demo only — no payment processing.</p></aside>
        </div>
      )}
    </main>
  )
}