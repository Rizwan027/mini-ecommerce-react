import { Search } from 'lucide-react'

export default function EmptyState({ title = 'No products found', message = 'Try another search or choose a different category.' }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Search size={25} /></span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}