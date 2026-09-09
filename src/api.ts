import { ProductDetail } from './types';

const CATALOG_API_URL = import.meta.env.VITE_CATALOG_API_URL || 'http://localhost:8001/api/v1/products';

export async function fetchProductDetails(id: string): Promise<ProductDetail> {
  try {
    const res = await fetch(`${CATALOG_API_URL}/${id}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Could not reach product-catalog-service, using fallback mock product');
  }

  return {
    id: id || 'prod_breville_barista_touch',
    name: 'Barista Touch Espresso Machine',
    brand: 'Breville',
    sku: 'BES880BSS',
    category: 'espresso_machine',
    price: 999.95,
    width_cm: 32.2,
    height_cm: 40.7,
    depth_cm: 32.2,
    weight_kg: 10.3,
    top_clearance_cm: 12.0,
    side_clearance_cm: 5.0,
    rear_clearance_cm: 5.0,
    image_url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80',
    description: 'Automated touchscreen espresso machine with integrated precision grinder and automated microfoam texturing.',
  };
}

