import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal, ArrowDownUp } from 'lucide-react'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

const categories = ['All products', ...new Set(products.map((product) => product.category))]

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All products')
  const [sort, setSort] = useState('featured')

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    let result = products.filter((product) => {
      const matchesSearch = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(normalizedSearch)
      const matchesCategory = category === 'All products' || product.category === category
      return matchesSearch && matchesCategory
    })
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    return result
  }, [search, category, sort])

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> THE EVERYDAY EDIT</span>
          <h1>Good things.<br /><em>Well chosen.</em></h1>
          <p>Thoughtful essentials for your everyday rituals. Less noise, more of what you love.</p>
          <a className="primary-button hero-button" href="#shop">Explore collection <span>↘</span></a>
        </div>
        <div className="hero-art" role="img" aria-label="Carefully selected everyday lifestyle products">
          <div className="hero-circle"></div>
          <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1100&q=85" alt="Minimal lifestyle objects on a table"
            onError={(event) => { event.currentTarget.style.display = 'none' }} />
          <div className="hero-note"><span>CURATED FOR YOU</span><strong>Find your<br />everyday favorite.</strong></div>
        </div>
        <div className="hero-index">01 <span>—</span> 04</div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div><span className="eyebrow">THE COLLECTION</span><h2>Shop the edit<span>.</span></h2></div>
          <p>Useful by design. Made to be part of your day.</p>
        </div>
        <div className="shop-toolbar">
          <div className="search-box"><Search size={18} /><input aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for something good..." /><kbd>⌕</kbd></div>
          <div className="sort-box"><ArrowDownUp size={16} /><select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></div>
        </div>
        <div className="shop-layout">
          <aside className="filters">
            <div className="filter-title"><SlidersHorizontal size={16} /> Categories</div>
            {categories.map((item) => <button key={item} className={`category-option ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)}>{item}<span>{item === 'All products' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}
            <div className="filter-promo"><span>GOOD DESIGN,</span><strong>every day.</strong><p>Small upgrades. Better routines.</p></div>
          </aside>
          <div className="product-results">
            <div className="results-meta"><span>{filteredProducts.length} products</span><span>{category === 'All products' ? 'All categories' : category}</span></div>
            {filteredProducts.length ? <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <EmptyState />}
          </div>
        </div>
      </section>
      <section className="story-strip" id="story"><span className="eyebrow">A LITTLE LESS, A LITTLE BETTER</span><p>Everyday essentials, thoughtfully picked.<br /><em>Because the little things matter.</em></p><span className="story-star">✳</span></section>
    </>
  )
}