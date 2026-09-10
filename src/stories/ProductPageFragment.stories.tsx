import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductPageFragment } from '../components/ProductPageFragment';
import { Ruler, ShieldCheck } from 'lucide-react';

const meta: Meta<typeof ProductPageFragment> = {
  title: 'Fragments/ProductPageFragment',
  component: ProductPageFragment,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductPageFragment>;

export const StandardPDP: Story = {
  args: {
    productId: 'prod_breville_barista_touch',
    onAddToCart: (p) => alert(`Added ${p.name} to cart!`),
  },
};

export const CompactMachinePDP: Story = {
  args: {
    productId: 'prod_delonghi_dedica',
    onAddToCart: (p) => alert(`Added ${p.name} to cart!`),
  },
};

export const WithCounterCheckSlot: Story = {
  args: {
    productId: 'prod_breville_barista_touch',
    onAddToCart: (p) => alert(`Added ${p.name} to cart!`),
    renderCounterCheckSlot: (product) => (
      <div className="p-6 bg-indigo-50/70 border border-indigo-100 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold">
          <Ruler className="w-4 h-4" />
          <span>Spatial AI Countertop Fitment Slot</span>
        </div>
        <p className="text-xs text-slate-600">
          This slot embeds the <code>counter-check</code> camera widget into the PDP.
        </p>
        <button
          type="button"
          onClick={() => alert(`Launching camera fitment check for ${product.name}`)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs"
        >
          Verify Fitment with Camera
        </button>
      </div>
    ),
  },
};
