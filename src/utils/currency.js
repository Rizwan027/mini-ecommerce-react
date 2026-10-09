// Format prices using Indian rupees and Indian number grouping.
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export function formatINR(amount) {
  return inrFormatter.format(amount)
}
