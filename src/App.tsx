import React from 'react';
import { ProductPageFragment } from './components/ProductPageFragment';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <span className="font-extrabold text-slate-900">
          Product Page UI Fragment Harness
        </span>
        <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
          Port 5175
        </span>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <ProductPageFragment
          productId="prod_breville_barista_touch"
          onAddToCart={(product) => alert(`Added ${product.name} to cart!`)}
        />
      </main>
    </div>
  );
};

export default App;
