# ModernShop

ModernShop is being rebuilt as a modular e-commerce storefront and business-management demo using JavaScript ES Modules, Vite, and custom CSS.

## Current stage

The `modern-rebuild` branch contains the initial multi-page application scaffold:

- Storefront entry: `index.html`
- Sign-in screen entry: `login.html`
- Admin workspace entry: `admin/index.html`
- JavaScript ES Module entry points under `src/app/`
- Shared custom CSS under `src/styles/`
- An initial IndexedDB connection utility under `src/core/storage/`

## Development

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

## Tests

```bash
npm test
```

## Important limitations

This scaffold does not yet implement real authentication, products, inventory, orders, customers, checkout, payment processing, or business analytics. The IndexedDB utility only opens the local database; no application data is stored yet.

The original project remains available on the `main` branch while the rebuild is developed separately.
