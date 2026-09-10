import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react';
import {
  ProtonThemeProvider,
  ProtonMetricBox,
  ProtonStatusBadge,
  ProtonButton,
  ProtonSpinner,
} from '@dipesh.singh/proton/react';
import { PriceDisplay, formatPrice } from '@dipesh.singh/commerce-ui';
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
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-2">
        <ProtonSpinner size="lg" variant="coffee" label="Loading product..." />
        <p className="text-xs text-slate-500 font-medium">Loading product specifications...</p>
      </div>
    );
  }

  const handleAdd = () => {
    onAddToCart?.(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <ProtonThemeProvider>
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

            {/* Dimensional Specifications via Proton MetricBox */}
            <ProtonMetricBox
              title="Ground Truth Physical Dimensions"
              badgeText="Metric Specs"
              metrics={[
                { label: 'Width', value: product.width_cm, unit: 'cm' },
                { label: 'Height', value: product.height_cm, unit: 'cm' },
                { label: 'Depth', value: product.depth_cm, unit: 'cm' },
              ]}
              highlightNotice={
                product.top_clearance_cm > 0
                  ? `Required Overhead Clearance (steam / hopper / tilt): +${product.top_clearance_cm} cm`
                  : undefined
              }
            />
          </div>

          {/* Right Column: PDP Details, CounterCheck Slot, and Add-to-Cart */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
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

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <PriceDisplay cents={Math.round(product.price * 100)} size="xl" />
                <ProtonStatusBadge status="success" pulse label="In Stock & Ready to Ship" size="sm" />
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>

              {/* CounterCheck MFE Fragment Injection Slot */}
              <div className="pt-2">
                {renderCounterCheckSlot ? (
                  renderCounterCheckSlot(product)
                ) : (
                  <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 flex items-center justify-between text-xs text-amber-900">
                    <span>CounterCheck AI Fitment Slot</span>
                    <span className="text-[10px] font-bold uppercase bg-amber-200/60 px-2 py-0.5 rounded">
                      MFE Ready
                    </span>
                  </div>
                )}
              </div>

              {/* Upsell / Accessory Recommendations Slot */}
              {renderUpsellSlot && <div className="pt-2">{renderUpsellSlot(product)}</div>}

              {/* Add to Cart Actions */}
              <div className="pt-4 border-t border-slate-100">
                <ProtonButton
                  fullWidth
                  size="lg"
                  variant={addedAnimation ? 'primary' : 'secondary'}
                  startIcon={<ShoppingBag style={{ width: 16, height: 16 }} />}
                  onClick={handleAdd}
                >
                  {addedAnimation ? 'Added to Cart!' : `Add to Cart — ${formatPrice(Math.round(product.price * 100))}`}
                </ProtonButton>
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
    </ProtonThemeProvider>
  );
};

export default ProductPageFragment;
