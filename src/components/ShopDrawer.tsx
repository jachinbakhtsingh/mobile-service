import React, { useState } from 'react';
import { PRODUCTS } from '../config/productConfig';
import { FEATURED_ACCESSORIES } from '../config/accessoryConfig';
import { SmartphoneProduct, AccessoryItem } from '../types';
import { X, ShoppingBag, Eye, ArrowRight, Sparkles, Check } from 'lucide-react';

interface ShopDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: SmartphoneProduct) => void;
  onSelectAccessory: (a: AccessoryItem) => void;
}

export const ShopDrawer: React.FC<ShopDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectAccessory,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'phones' | 'accessories'>('phones');

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-[#121113] border-l border-[#29181B] shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#221316]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B0000] flex items-center justify-center text-[#EDE7C7] font-bold text-sm">
                M
              </span>
              <div>
                <h3 className="text-base font-extrabold text-[#EDE7C7]">MOBIXA Catalog</h3>
                <span className="text-[10px] uppercase font-mono text-[#8E8770]">Express Showroom Desk</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-2 rounded-full bg-[#1A181C] text-[#8E8770] hover:text-[#EDE7C7] hover:bg-[#8B0000] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-[#18161A] border border-[#261519]">
            <button
              type="button"
              onClick={() => setActiveTab('phones')}
              className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'phones'
                  ? 'bg-[#8B0000] text-[#EDE7C7] shadow-md'
                  : 'text-[#8E8770] hover:text-[#EDE7C7]'
              }`}
            >
              Flagship Mobiles ({PRODUCTS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('accessories')}
              className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'accessories'
                  ? 'bg-[#8B0000] text-[#EDE7C7] shadow-md'
                  : 'text-[#8E8770] hover:text-[#EDE7C7]'
              }`}
            >
              Accessories ({FEATURED_ACCESSORIES.length})
            </button>
          </div>
        </div>

        {/* Scrollable Item List */}
        <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-3">
          {activeTab === 'phones'
            ? PRODUCTS.map((phone) => (
                <div
                  key={phone.id}
                  className="p-3.5 rounded-2xl bg-[#18161A] border border-[#261519] hover:border-[#8B0000]/60 flex items-center justify-between gap-3 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#0F0E11] border border-[#221316] p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono text-[#8E8770] block truncate">
                      {phone.brand}
                    </span>
                    <h4 className="text-xs font-bold text-[#EDE7C7] truncate group-hover:text-white">
                      {phone.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#8B0000] block mt-0.5">
                      {phone.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProduct(phone);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#241F26] hover:bg-[#8B0000] text-[11px] font-semibold text-[#EDE7C7] transition-colors shrink-0"
                  >
                    View
                  </button>
                </div>
              ))
            : FEATURED_ACCESSORIES.map((acc) => (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-2xl bg-[#18161A] border border-[#261519] hover:border-[#8B0000]/60 flex items-center justify-between gap-3 transition-all group"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#0F0E11] border border-[#221316] p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono text-[#8E8770] block truncate">
                      {acc.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#EDE7C7] truncate group-hover:text-white">
                      {acc.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#EDE7C7] block mt-0.5">
                      {acc.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectAccessory(acc);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#8B0000] hover:bg-[#A30808] text-[11px] font-semibold text-[#EDE7C7] transition-colors shrink-0"
                  >
                    Add
                  </button>
                </div>
              ))}
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-4 border-t border-[#221316]">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#1F1D22] hover:bg-[#28252C] border border-[#29181B] text-xs font-semibold text-[#EDE7C7] flex items-center justify-center gap-2 transition-colors"
          >
            <span>Visit Showroom in Tamil Nadu</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8B0000]" />
          </a>
        </div>
      </div>
    </div>
  );
};
