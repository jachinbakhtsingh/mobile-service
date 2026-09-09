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
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md h-full bg-white border-l border-[#E5DFD4] shadow-2xl p-6 flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#EFEBE3]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[#8B0000] flex items-center justify-center text-white font-bold text-sm shadow-xs">
                M
              </span>
              <div>
                <h3 className="text-base font-extrabold text-[#18181B]">MOBIXA Catalog</h3>
                <span className="text-[10px] uppercase font-mono text-[#71717A] font-medium">Express Showroom Desk</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="p-2 rounded-full bg-[#F6F3ED] text-[#52525B] hover:text-[#18181B] hover:bg-[#E5DFD4] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-[#F6F3ED] border border-[#E5DFD4]">
            <button
              type="button"
              onClick={() => setActiveTab('phones')}
              className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'phones'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'text-[#52525B] hover:text-[#18181B]'
              }`}
            >
              Flagship Mobiles ({PRODUCTS.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('accessories')}
              className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'accessories'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'text-[#52525B] hover:text-[#18181B]'
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
                  className="p-3.5 rounded-2xl bg-[#F8F6F2] border border-[#E5DFD4] hover:border-[#8B0000]/60 flex items-center justify-between gap-3 transition-all group shadow-2xs"
                >
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#E5DFD4] p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono text-[#71717A] block truncate font-medium">
                      {phone.brand}
                    </span>
                    <h4 className="text-xs font-bold text-[#18181B] truncate group-hover:text-[#8B0000]">
                      {phone.name}
                    </h4>
                    <span className="text-xs font-bold text-[#8B0000] block mt-0.5">
                      {phone.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectProduct(phone);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#8B0000] hover:text-white border border-[#E5DFD4] text-[11px] font-semibold text-[#18181B] transition-colors shrink-0 shadow-2xs"
                  >
                    View
                  </button>
                </div>
              ))
            : FEATURED_ACCESSORIES.map((acc) => (
                <div
                  key={acc.id}
                  className="p-3.5 rounded-2xl bg-[#F8F6F2] border border-[#E5DFD4] hover:border-[#8B0000]/60 flex items-center justify-between gap-3 transition-all group shadow-2xs"
                >
                  <div className="w-14 h-14 rounded-xl bg-white border border-[#E5DFD4] p-1.5 flex items-center justify-center shrink-0">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono text-[#71717A] block truncate font-medium">
                      {acc.category}
                    </span>
                    <h4 className="text-xs font-bold text-[#18181B] truncate group-hover:text-[#8B0000]">
                      {acc.name}
                    </h4>
                    <span className="text-xs font-bold text-[#18181B] block mt-0.5">
                      {acc.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectAccessory(acc);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#8B0000] hover:bg-[#A30808] text-[11px] font-semibold text-white transition-colors shrink-0 shadow-2xs"
                  >
                    Add
                  </button>
                </div>
              ))}
        </div>

        {/* Bottom Drawer Footer */}
        <div className="pt-4 border-t border-[#EFEBE3]">
          <a
            href="#contact"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#F6F3ED] hover:bg-[#EFEBE3] border border-[#E5DFD4] text-xs font-semibold text-[#18181B] flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <span>Visit Showroom in Tamil Nadu</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8B0000]" />
          </a>
        </div>
      </div>
    </div>
  );
};
