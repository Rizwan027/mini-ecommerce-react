# Northstar — Mini E-Commerce Application

A responsive mini e-commerce storefront built for the React Developer Intern take-home assessment.

## Features

- India-focused product catalogue with prices in Indian Rupees (INR)
- Indian number grouping and currency formatting via `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`
- Product catalogue stored locally in `src/data/products.json`
- Responsive product grid and product cards
- Search products by name, category, or description
- Filter products by category
- Sort by featured, price (ascending/descending), or rating
- Product detail routes using React Router
- Add products to the cart, remove them, and adjust quantities
- Cart item count and subtotal/total calculation
- Cart persistence using `localStorage`
- Empty states for unmatched searches, missing products, and an empty cart
- Responsive desktop, tablet, and mobile layouts
- Accessible labels for key controls and fallback images
- Demo checkout confirmation (no real payment is processed)

## Technology

- React 18
- Vite
- React Router
- React Hooks (`useState`, `useMemo`, `useEffect`, `useContext`)
- Lucide React icons
- CSS
- Browser `localStorage`

## Requirements

Install Node.js (LTS recommended) and npm.

## Run locally

1. Extract or clone this repository.
2. Open a terminal in the project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    EmptyState.jsx
    Header.jsx
    ProductCard.jsx
  context/
    CartContext.jsx
  data/
    products.json
  utils/
    currency.js
  pages/
    CartPage.jsx
    ProductDetailsPage.jsx
    ShopPage.jsx
  App.jsx
  main.jsx
  styles.css
index.html
vite.config.js
package.json
```

## State and cart design

`CartProvider` provides shared cart state to the header, product cards, product detail page, and cart page. The cart is stored as an array of product objects with a `quantity` property. `useEffect` synchronizes cart state with `localStorage`, so items remain after a page refresh. Derived values (`itemCount` and `subtotal`) are calculated from the current cart rather than stored separately.

## Product data

The app imports the local JSON catalogue. No backend or external product API is required. Product photography uses remote Unsplash image URLs, so an internet connection is needed for those images. A fallback image is shown if a product image fails.

## GitHub submission

```bash
git init
git add .
git commit -m "Build mini e-commerce React application"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Create the GitHub repository first and replace the placeholder remote URL with your own repository URL.

## Assessment notes

This is a front-end demo only. The checkout action shows a confirmation and does not collect payment details or create a real order. Review the code and make sure you can explain the component structure, React Hooks, filtering, routing, cart calculations, and localStorage persistence before submitting.
