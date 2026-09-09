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
    <section id="mobiles" className="relative py-24 md:py-32 bg-[#8B0000] border-t border-[#A30808] text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-black/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] font-semibold mb-3 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#EDE7C7]" />
              <span>Showroom Flagships</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Find Your <span className="text-[#EDE7C7]">Perfect Phone.</span>
            </h2>
            <p className="mt-3 text-[#EDE7C7]/90 text-base leading-relaxed">
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
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedBrand === brand
                    ? 'bg-[#EDE7C7] text-[#8B0000] shadow-md font-bold'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
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
              className="group relative rounded-2xl bg-white border border-[#E5DFD4] hover:border-[#8B0000]/60 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#8B0000]/10 hover:-translate-y-1 shadow-xs"
            >
              <div>
                {/* Top Bar: Brand & Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs uppercase tracking-widest font-mono text-[#71717A] font-semibold">
                    {product.brand}
                  </span>
                  {product.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/20">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Image Stage */}
                <div className="relative w-full h-56 rounded-xl bg-[#F9F7F3] border border-[#EAE5DC] overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#F5F2EB] transition-colors">
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                    <span className="text-[11px] font-mono text-[#18181B] font-semibold flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#8B0000]" /> Click to Inspect Specs
                    </span>
                  </div>
                </div>

                {/* Product Title & Description */}
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-[#18181B] group-hover:text-[#8B0000] transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-[#52525B] line-clamp-2 leading-relaxed font-normal">
                    {product.description}
                  </p>
                </div>

                {/* Key Spec Snippets */}
                <div className="mt-4 pt-3 border-t border-[#EFEBE3] grid grid-cols-2 gap-2 text-[11px]">
                  <div className="truncate">
                    <span className="text-[#71717A] block text-[9px] uppercase font-medium">Screen</span>
                    <span className="text-[#18181B] font-semibold">{product.specs.display.split(' ')[0]}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-[#71717A] block text-[9px] uppercase font-medium">Camera</span>
                    <span className="text-[#18181B] font-semibold">{product.specs.camera.split('+')[0]}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer: Price & Buttons */}
              <div className="mt-6 pt-4 border-t border-[#EFEBE3] flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-[#8B0000] tracking-tight">{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-[#A1A1AA] line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#52525B] font-medium flex items-center gap-1">
                    <Check className="w-3 h-3 text-[#8B0000]" /> Genuine Stock
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onViewDetails(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#F6F3ED] hover:bg-[#EDE8DE] border border-[#E5DFD4] text-xs font-semibold text-[#18181B] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8B0000]" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onBuyNow(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#8B0000] hover:bg-[#A30808] text-xs font-semibold text-white shadow-md shadow-[#8B0000]/25 transition-all flex items-center justify-center gap-1.5"
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
