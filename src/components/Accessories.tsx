import React, { useState } from 'react';
import { ACCESSORY_CATEGORIES, FEATURED_ACCESSORIES } from '../config/accessoryConfig';
import { AccessoryItem } from '../types';
import { Sparkles, ShoppingBag, Check, Star, ArrowRight } from 'lucide-react';

interface AccessoriesProps {
  onAddToCart?: (item: AccessoryItem) => void;
}

export const Accessories: React.FC<AccessoriesProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredItems = activeCategory === 'all'
    ? FEATURED_ACCESSORIES
    : FEATURED_ACCESSORIES.filter((item) => item.category === activeCategory);

  const handleAdd = (item: AccessoryItem) => {
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    if (onAddToCart) onAddToCart(item);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section id="accessories" className="relative py-24 md:py-32 bg-[#8B0000] border-t border-[#A30808] text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-black/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#EDE7C7]" />
            <span>Curated Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Everything Your <span className="text-[#EDE7C7]">Phone Needs.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#EDE7C7]/90 leading-relaxed font-normal">
            From hyper-speed GaN chargers to high-fidelity acoustics and military-grade cases. Precision engineered to augment your daily device.
          </p>
        </div>

        {/* 12 Premium Category Chips (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {ACCESSORY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-2xs ${
                activeCategory === cat.id
                  ? 'bg-[#EDE7C7] text-[#8B0000] shadow-md font-bold'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                activeCategory === cat.id ? 'bg-black/20 text-[#8B0000]' : 'bg-white/20 text-white'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Featured Accessories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isAdded = addedItems[item.id];
            return (
              <div
                key={item.id}
                id={`accessory-card-${item.id}`}
                className="group relative rounded-2xl bg-white border border-[#E5DFD4] hover:border-[#8B0000]/60 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#8B0000]/10 hover:-translate-y-1 shadow-xs"
              >
                <div>
                  {/* Image container */}
                  <div className="relative w-full h-52 rounded-xl bg-[#F8F6F2] border border-[#EAE5DC] overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#F4F1EA] transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Rating badge */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/95 border border-[#E5DFD4] text-[10px] font-mono text-[#18181B] font-semibold flex items-center gap-1 shadow-2xs">
                      <Star className="w-3 h-3 text-[#EAB308] fill-[#EAB308]" />
                      <span>{item.rating}</span>
                    </div>

                    {item.inStock && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#8B0000]/10 border border-[#8B0000]/20 text-[9px] uppercase font-mono text-[#8B0000] font-semibold">
                        In Stock
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-[#18181B] group-hover:text-[#8B0000] transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#52525B] line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature bullet badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#F6F3ED] border border-[#E5DFD4] text-[10px] text-[#52525B] font-mono"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Price & Add to Bag */}
                <div className="mt-5 pt-3 border-t border-[#EFEBE3] flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-[#8B0000]">{item.price}</span>
                    <span className="text-[10px] text-[#71717A] block font-medium">Tax inclusive</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                      isAdded
                        ? 'bg-[#16A34A] text-white shadow-sm'
                        : 'bg-[#8B0000] hover:bg-[#A30808] text-white shadow-sm shadow-[#8B0000]/25'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
