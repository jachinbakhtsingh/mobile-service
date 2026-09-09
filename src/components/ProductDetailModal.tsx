import React, { useState } from 'react';
import { SmartphoneProduct } from '../types';
import { X, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw, Cpu, Battery, Camera, Smartphone } from 'lucide-react';
import { CONTACT } from '../config/siteConfig';

interface ProductDetailModalProps {
  product: SmartphoneProduct | null;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'details' | 'buy';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  initialMode = 'details',
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState(product.storageOptions[0] || '');
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-white border border-[#E5DFD4] shadow-2xl p-6 sm:p-8 text-[#18181B] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F6F3ED] border border-[#E5DFD4] text-[#52525B] hover:text-[#18181B] hover:bg-[#E5DFD4] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isOrdered ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 border border-[#16A34A] flex items-center justify-center text-[#16A34A] mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#18181B]">VIP Showroom Reservation Confirmed</h3>
            <p className="mt-2 text-sm text-[#52525B] max-w-sm">
              Your {product.name} ({selectedStorage}, {selectedColor}) has been held at the MOBIXA showroom desk. Our concierge will contact you shortly.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-[#F6F3ED] border border-[#E5DFD4] text-xs font-mono text-[#18181B] font-semibold">
              Order Reference: #MBX-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <div>
            {/* Header / Brand */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest font-mono text-[#8B0000] font-bold">
                {product.brand} Flagship
              </span>
              {product.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#8B0000]/10 text-[#8B0000] border border-[#8B0000]/20 font-semibold font-mono">
                  {product.badge}
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
              {product.name}
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-[#52525B] leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mt-6 items-center">
              {/* Product Photo Stage */}
              <div className="sm:col-span-5 h-48 sm:h-64 rounded-2xl bg-[#F8F6F2] border border-[#E5DFD4] p-4 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>

              {/* Options */}
              <div className="sm:col-span-7 flex flex-col justify-between h-full">
                {/* Color Selector */}
                <div>
                  <span className="text-xs uppercase tracking-wider font-mono text-[#71717A] block mb-2 font-medium">
                    Select Color: <span className="text-[#18181B] font-bold">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === c.name
                            ? 'border-[#18181B] scale-110 shadow-md'
                            : 'border-transparent opacity-75 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Storage Selector */}
                <div className="mt-4">
                  <span className="text-xs uppercase tracking-wider font-mono text-[#71717A] block mb-2 font-medium">
                    Storage Capacity
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.storageOptions.map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSelectedStorage(st)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                          selectedStorage === st
                            ? 'bg-[#8B0000] text-white border border-[#8B0000] shadow-sm'
                            : 'bg-[#F6F3ED] text-[#52525B] border border-[#E5DFD4] hover:text-[#18181B]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Display */}
                <div className="mt-5 pt-3 border-t border-[#EFEBE3] flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-[#8B0000]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-[#71717A] line-through font-medium">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#16A34A] font-mono font-semibold">In Stock &bull; Ready to Ship</span>
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="mt-6 pt-5 border-t border-[#EFEBE3]">
              <span className="text-xs uppercase tracking-widest font-mono text-[#71717A] block mb-3 font-semibold">
                Certified Hardware Telemetry
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#52525B]">
                <div className="p-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4]">
                  <span className="text-[10px] uppercase block text-[#71717A]">Display</span>
                  <span className="text-[#18181B] font-semibold">{product.specs.display}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4]">
                  <span className="text-[10px] uppercase block text-[#71717A]">Processor</span>
                  <span className="text-[#18181B] font-semibold">{product.specs.processor}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4]">
                  <span className="text-[10px] uppercase block text-[#71717A]">Camera</span>
                  <span className="text-[#18181B] font-semibold">{product.specs.camera}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4]">
                  <span className="text-[10px] uppercase block text-[#71717A]">Battery</span>
                  <span className="text-[#18181B] font-semibold">{product.specs.battery}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4]">
                  <span className="text-[10px] uppercase block text-[#71717A]">Storage</span>
                  <span className="text-[#18181B] font-semibold">{selectedStorage}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4]">
                  <span className="text-[10px] uppercase block text-[#71717A]">Warranty</span>
                  <span className="text-[#18181B] font-semibold">1 Year Official OEM</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-5 border-t border-[#EFEBE3] flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleOrder}
                className="flex-1 py-3 px-6 rounded-xl bg-[#8B0000] hover:bg-[#A30808] text-white font-bold text-sm shadow-md shadow-[#8B0000]/30 flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve in Showroom / Buy Now</span>
              </button>

              <a
                href={`https://wa.me/${CONTACT.whatsappNumber}?text=Hi%20MOBIXA,%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(${selectedStorage},%20${selectedColor})`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-[#F6F3ED] hover:bg-[#EFEBE3] border border-[#E5DFD4] text-[#18181B] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
