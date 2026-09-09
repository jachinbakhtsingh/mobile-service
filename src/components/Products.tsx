import React, { useState } from 'react';
import { PRODUCTS } from '../config/productConfig';
import { SmartphoneProduct } from '../types';
import { Eye, ShoppingBag, Sparkles, Check, ArrowRight, Shield } from 'lucide-react';

interface ProductsProps {
  onViewDetails: (product: SmartphoneProduct) => void;
  onBuyNow: (product: SmartphoneProduct) => void;
}

export const Products: React.FC<ProductsProps> = ({ onViewDetails, onBuyNow }) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');

  const brandsFilter = ['all', 'Apple', 'Samsung', 'OnePlus', 'Google Pixel', 'Xiaomi', 'Nothing'];

  const filteredProducts = selectedBrand === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());

  return (
    <section id="mobiles" className="relative py-24 md:py-32 bg-transparent border-t border-[#1C1417]">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141315] border border-[#29181B] text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] mb-3">
              <Sparkles className="w-3 h-3 text-[#8B0000]" />
              <span>Showroom Flagships</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#EDE7C7]">
              Find Your <span className="text-gradient-cream">Perfect Phone.</span>
            </h2>
            <p className="mt-3 text-[#8E8770] text-base leading-relaxed">
              From everyday essentials to flagship performance, discover devices built for every kind of user.
            </p>
          </div>

          {/* Brand Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {brandsFilter.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedBrand === brand
                    ? 'bg-[#8B0000] text-[#EDE7C7] shadow-md shadow-[#8B0000]/40'
                    : 'bg-[#141315] text-[#8E8770] hover:text-[#EDE7C7] border border-[#29181B]'
                }`}
              >
                {brand === 'all' ? 'All Brands' : brand}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group relative rounded-2xl bg-[#141315] border border-[#29181B] hover:border-[#8B0000]/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B0000]/15 hover:-translate-y-1"
            >
              <div>
                {/* Top Bar: Brand & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#8E8770]">
                    {product.brand}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#8B0000]/20 text-[#EDE7C7] border border-[#8B0000]/40">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Image Stage */}
                <div className="relative w-full h-56 rounded-xl bg-[#0F0E10] border border-[#221316] overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#121114] transition-colors">
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E10]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <span className="text-[11px] font-mono text-[#EDE7C7] flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#8B0000]" /> Click to Inspect Specs
                    </span>
                  </div>
                </div>

                {/* Product Title & Description */}
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-[#EDE7C7] group-hover:text-white transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#8E8770] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Key Spec Snippets */}
                <div className="mt-4 pt-3 border-t border-[#221316] grid grid-cols-2 gap-2 text-[11px] text-[#8E8770]">
                  <div className="truncate">
                    <span className="text-[#8E8770]/60 block text-[9px] uppercase">Screen</span>
                    <span className="text-[#EDE7C7] font-medium">{product.specs.display.split(' ')[0]}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[#8E8770]/60 block text-[9px] uppercase">Camera</span>
                    <span className="text-[#EDE7C7] font-medium">{product.specs.camera.split('+')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Buttons */}
              <div className="mt-6 pt-4 border-t border-[#221316] flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#EDE7C7] tracking-tight">{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-[#8E8770] line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#8E8770] flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#8B0000]" /> Genuine Stock
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onViewDetails(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#1D1B20] hover:bg-[#26242B] border border-[#29181B] text-xs font-semibold text-[#EDE7C7] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8B0000]" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onBuyNow(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#8B0000] hover:bg-[#A30808] text-xs font-semibold text-[#EDE7C7] shadow-lg shadow-[#8B0000]/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
