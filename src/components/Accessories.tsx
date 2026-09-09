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
    <section id="accessories" className="relative py-24 md:py-32 bg-transparent border-t border-[#1C1417]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141315] border border-[#29181B] text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Curated Ecosystem</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#EDE7C7]">
            Everything Your <span className="text-gradient-cream">Phone Needs.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#8E8770] leading-relaxed">
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
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-[#8B0000] text-[#EDE7C7] shadow-lg shadow-[#8B0000]/30'
                  : 'bg-[#141315] text-[#8E8770] hover:text-[#EDE7C7] border border-[#29181B]'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === cat.id ? 'bg-black/20 text-[#EDE7C7]' : 'bg-[#1E1C21] text-[#8E8770]'
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
                className="group relative rounded-2xl bg-[#141315] border border-[#29181B] hover:border-[#8B0000]/60 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-[#8B0000]/15 hover:-translate-y-1"
              >
                <div>
                  {/* Image container */}
                  <div className="relative w-full h-52 rounded-xl bg-[#0F0E10] border border-[#221316] overflow-hidden flex items-center justify-center p-4 group-hover:bg-[#131215] transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Rating badge */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#141315]/90 border border-[#29181B] text-[10px] font-mono text-[#EDE7C7] flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#EDE7C7] fill-[#EDE7C7]" />
                      <span>{item.rating}</span>
                    </div>

                    {item.inStock && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#8B0000]/20 border border-[#8B0000]/40 text-[9px] uppercase font-mono text-[#EDE7C7]">
                        In Stock
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-[#EDE7C7] group-hover:text-white transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#8E8770] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature bullet badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#1C1A1F] text-[10px] text-[#C2BCA8] font-mono"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Price & Add to Bag */}
                <div className="mt-5 pt-3 border-t border-[#221316] flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-[#EDE7C7]">{item.price}</span>
                    <span className="text-[10px] text-[#8E8770] block">Tax inclusive</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                      isAdded
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#8B0000] hover:bg-[#A30808] text-[#EDE7C7] shadow-lg shadow-[#8B0000]/30'
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
