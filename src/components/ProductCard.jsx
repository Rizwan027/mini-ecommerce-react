import { Link } from 'react-router-dom'
import { Star, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/currency'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <img className="product-image" src={product.image} alt={product.name} loading="lazy"
          onError={(event) => { event.currentTarget.src = 'https://placehold.co/600x500/f0eee8/37382f?text=Product' }} />
      </Link>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <div className="product-card-bottom">
          <div>
            <div className="product-price">{formatINR(product.price)}</div>
            <div className="rating"><Star size={13} fill="currentColor" /> {product.rating} <span>({product.reviewCount})</span></div>
          </div>
          <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`} title="Add to cart"><Plus size={18} /></button>
        </div>
      </div>
    </article>
  )
}