import React, { useEffect, useState } from 'react';
import { Box, HelpCircle, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import { fetchProductDetails } from '../api';
import { ProductDetail } from '../types';

interface ProductPageFragmentProps {
  productId?: string;
  onAddToCart?: (product: ProductDetail) => void;
  renderCounterCheckSlot?: (product: ProductDetail) => React.ReactNode;
  renderUpsellSlot?: (product: ProductDetail) => React.ReactNode;
}

export const ProductPageFragment: React.FC<ProductPageFragmentProps> = ({
  productId = 'prod_breville_barista_touch',
  onAddToCart,
  renderCounterCheckSlot,
  renderUpsellSlot,
}) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchProductDetails(productId);
      setProduct(data);
    }
    load();
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleAdd = () => {
    onAddToCart?.(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="py-6 space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery & Dimensional Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl overflow-hidden bg-white border border-slate-200 p-8 shadow-sm flex items-center justify-center">
            <img
              src={product.image_url}
              alt={product.name}
              className="max-h-96 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Dimensional Specifications Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Box className="w-4 h-4 text-indigo-600" /> Ground Truth Physical Dimensions
              </h4>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded-full">
                Metric Specs
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-100 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              <div>
                <span className="text-xs text-slate-400 block">Width</span>
                <span className="text-sm font-black text-slate-800">{product.width_cm} cm</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Height</span>
                <span className="text-sm font-black text-slate-800">{product.height_cm} cm</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Depth</span>
                <span className="text-sm font-black text-slate-800">{product.depth_cm} cm</span>
              </div>
            </div>

            {product.top_clearance_cm > 0 && (
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs text-amber-800">
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  Required Overhead Clearance (steam / hopper / tilt):
                </span>
                <span className="font-bold">+{product.top_clearance_cm} cm</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: PDP Details, CounterCheck Slot, and Add-to-Cart */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-400">• SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-600">4.9 (840 reviews)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-emerald-600 font-bold">In Stock & Ready to Ship</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>

            {/* CounterCheck MFE Fragment Injection Slot */}
            <div className="pt-2">
              {renderCounterCheckSlot ? (
                renderCounterCheckSlot(product)
              ) : (
                <div className="p-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 flex items-center justify-between text-xs text-indigo-800">
                  <span>CounterCheck AI Fitment Slot</span>
                  <span className="text-[10px] font-bold uppercase bg-indigo-200/60 px-2 py-0.5 rounded">
                    MFE Ready
                  </span>
                </div>
              )}
            </div>

            {/* Upsell / Accessory Recommendations Slot */}
            {renderUpsellSlot && <div className="pt-2">{renderUpsellSlot(product)}</div>}

            {/* Add to Cart Actions */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-3.5 px-4 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  addedAnimation
                    ? 'bg-emerald-600 shadow-emerald-200'
                    : 'bg-slate-900 hover:bg-slate-800 shadow-slate-200'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {addedAnimation ? 'Added to Cart!' : `Add to Cart — $${product.price.toFixed(2)}`}
              </button>
            </div>

            <div className="pt-2 flex items-center justify-around text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Official Warranty
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-slate-400" /> Free Returns If Doesn't Fit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageFragment;
