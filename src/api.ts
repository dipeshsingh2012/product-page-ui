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

  const MOCK_PRODUCTS: Record<string, ProductDetail> = {
    prod_breville_barista_touch: {
      id: 'prod_breville_barista_touch',
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
    },
    prod_hiljhil_guji: {
      id: 'prod_hiljhil_guji',
      name: 'Ethiopian Guji Single Origin (250g)',
      brand: 'Hiljhil Roasters',
      sku: 'HJ-GUJI-250',
      category: 'coffee_beans',
      price: 22.00,
      width_cm: 10.0,
      height_cm: 20.0,
      depth_cm: 6.0,
      weight_kg: 0.25,
      top_clearance_cm: 0.0,
      side_clearance_cm: 0.0,
      rear_clearance_cm: 0.0,
      image_url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=600&auto=format&fit=crop&q=80',
      description: 'Heirloom natural process roasted at Hiljhil Cafe. Crisp floral aromas with sweet nectarine and wild lavender finish.',
    },
    prod_hiljhil_espresso_blend: {
      id: 'prod_hiljhil_espresso_blend',
      name: 'Highland Dark Peak Espresso Blend (500g)',
      brand: 'Hiljhil Roasters',
      sku: 'HJ-DPE-500',
      category: 'coffee_beans',
      price: 28.50,
      width_cm: 12.0,
      height_cm: 24.0,
      depth_cm: 8.0,
      weight_kg: 0.5,
      top_clearance_cm: 0.0,
      side_clearance_cm: 0.0,
      rear_clearance_cm: 0.0,
      image_url: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&auto=format&fit=crop&q=80',
      description: 'Signature house blend of Colombia & Sumatra. Rich dark chocolate, candied walnut, and velvety crema for milk drinks.',
    },
    prod_delonghi_dedica: {
      id: 'prod_delonghi_dedica',
      name: 'Dedica Deluxe Slim Espresso Machine',
      brand: "De'Longhi",
      sku: 'EC680M',
      category: 'espresso_machine',
      price: 299.95,
      width_cm: 14.9,
      height_cm: 30.5,
      depth_cm: 33.0,
      weight_kg: 4.2,
      top_clearance_cm: 5.0,
      side_clearance_cm: 3.0,
      rear_clearance_cm: 4.0,
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      description: 'Ultra-slim 6-inch wide manual espresso machine engineered for constrained kitchen and apartment countertop setups.',
    },
    prod_fellow_ode_gen2: {
      id: 'prod_fellow_ode_gen2',
      name: 'Ode Gen 2 Precision Brew Grinder',
      brand: 'Fellow',
      sku: 'FEL-ODE-G2',
      category: 'grinder',
      price: 345.00,
      width_cm: 12.0,
      height_cm: 24.1,
      depth_cm: 23.9,
      weight_kg: 4.5,
      top_clearance_cm: 4.0,
      side_clearance_cm: 2.0,
      rear_clearance_cm: 2.0,
      image_url: 'https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?w=600&auto=format&fit=crop&q=80',
      description: 'Low-profile single dose grinder with 64mm flat burrs designed specifically for pour-overs, AeroPress, and cold brews.',
    },
  };

  return MOCK_PRODUCTS[id] || MOCK_PRODUCTS['prod_breville_barista_touch'];
}

