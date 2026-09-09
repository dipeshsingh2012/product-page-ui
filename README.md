# Product Page UI Fragment (`product-page-ui`)

> **Micro-Frontend (MFE) Product Display Page (PDP) Fragment embedding CounterCheck & Upsell widgets**

`product-page-ui` is a standalone frontend fragment delivering the Product Display Page experience.

---

## 🎯 Features

1. **High-Res Appliance Showcase:** Multi-angle image preview with cutout asset support.
2. **Ground-Truth Physical Dimensions:** Displays exact width, height, depth, and ventilation clearances from `product-catalog-service`.
3. **CounterCheck AI Slot:** Embeds the `<CounterCheckWidget />` fragment to let shoppers verify kitchen counter clearance.
4. **Upsell Slot:** Compatible accessories integration via `upsell-recommendations`.
5. **Cart Actions:** Direct integration with `cart-service`.

---

## 🚀 Development

```bash
npm install
npm run dev     # Runs dev server on port 5175
npm run build   # Compiles standalone MFE bundle
```

