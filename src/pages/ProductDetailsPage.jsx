import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Star, ShoppingBag } from 'lucide-react'
import products from '../data/products.json'
import { useCart } from '../context/CartContext'
import EmptyState from '../components/EmptyState'
import { formatINR } from '../utils/currency'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))
  const { addToCart } = useCart()

  if (!product) return <main className="page-container"><EmptyState title="Product not found" message="This product may have been removed or the link may be incorrect." /><Link className="text-link" to="/">← Back to shop</Link></main>

  return (
    <main className="page-container detail-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to collection</Link>
      <div className="detail-layout">
        <div className="detail-image"><img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.src = 'https://placehold.co/900x800/f0eee8/37382f?text=Product' }} /></div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category.toUpperCase()}</span>
          <h1>{product.name}<span>.</span></h1>
          <div className="detail-rating"><span className="rating"><Star size={15} fill="currentColor" /> {product.rating}</span> <span>({product.reviewCount} reviews)</span></div>
          <div className="detail-price">{formatINR(product.price)}</div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-perks"><span><Check size={16} /> Thoughtfully selected</span><span><Check size={16} /> Easy everyday use</span></div>
          <button className="primary-button add-detail-button" onClick={() => addToCart(product)}><ShoppingBag size={18} /> Add to cart <span>{formatINR(product.price)}</span></button>
          <p className="detail-footnote">A little upgrade for your everyday.</p>
        </div>
      </div>
    </main>
  )
}