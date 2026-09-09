import React, { useState } from 'react';
import { RepairServiceItem } from '../types';
import { REPAIR_SERVICES } from '../config/serviceConfig';
import { BRANDS } from '../config/brandConfig';
import { CONTACT } from '../config/siteConfig';
import { X, Check, Wrench, Clock, Shield, Calendar, Smartphone, PhoneCall } from 'lucide-react';

interface ServiceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: RepairServiceItem | null;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  if (!isOpen) return null;

  const [selectedBrand, setSelectedBrand] = useState<string>('Apple');
  const [deviceModel, setDeviceModel] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedService?.id || REPAIR_SERVICES[0].id
  );
  const [preferredTime, setPreferredTime] = useState<string>('Today, Within 2 Hours (Express)');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);

  const activeService =
    REPAIR_SERVICES.find((s) => s.id === selectedServiceId) || REPAIR_SERVICES[0];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-white border border-[#E5DFD4] shadow-2xl p-6 sm:p-8 text-[#18181B] max-h-[90vh] overflow-y-auto"
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

        {isBooked ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 border border-[#16A34A] flex items-center justify-center text-[#16A34A] mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#18181B]">Repair Desk Slot Reserved</h3>
            <p className="mt-2 text-sm text-[#52525B] max-w-sm">
              Your {selectedBrand} {deviceModel || 'Smartphone'} ({activeService.name}) diagnostic has been scheduled for {preferredTime}. Our certified technician has prepared an intake bay.
            </p>
            <div className="mt-6 p-4 rounded-xl bg-[#F6F3ED] border border-[#E5DFD4] text-xs font-mono text-[#18181B] font-semibold">
              Service Token: #REP-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleBook}>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4 text-[#8B0000]" />
              <span className="text-xs uppercase tracking-widest font-mono text-[#8B0000] font-bold">
                MOBIXA Master Lab Intake
              </span>
            </div>

            <h3 className="text-2xl font-extrabold text-[#18181B]">
              Schedule Mobile Service
            </h3>

            <p className="mt-1 text-xs text-[#52525B]">
              Certified technician examination, genuine OEM parts, and express on-site turnaround.
            </p>

            {/* Brand Selector */}
            <div className="mt-5">
              <label className="text-xs uppercase font-mono text-[#71717A] block mb-2 font-medium">
                1. Select Device Brand
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {BRANDS.slice(0, 12).map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBrand(b.name)}
                    className={`p-2 rounded-xl text-xs font-semibold text-center transition-all ${
                      selectedBrand === b.name
                        ? 'bg-[#8B0000] text-white border border-[#8B0000] shadow-xs'
                        : 'bg-[#F6F3ED] text-[#52525B] border border-[#E5DFD4] hover:text-[#18181B]'
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Input */}
            <div className="mt-4">
              <label className="text-xs uppercase font-mono text-[#71717A] block mb-1.5 font-medium">
                2. Device Model Name / Number
              </label>
              <input
                type="text"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="e.g. iPhone 15 Pro, Galaxy S23, OnePlus 11"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#8B0000]"
              />
            </div>

            {/* Service Type Selector */}
            <div className="mt-4">
              <label className="text-xs uppercase font-mono text-[#71717A] block mb-2 font-medium">
                3. Select Service Requirement
              </label>
              <div className="grid grid-cols-2 gap-2">
                {REPAIR_SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      selectedServiceId === s.id
                        ? 'bg-[#8B0000]/10 border border-[#8B0000] text-[#18181B] shadow-2xs'
                        : 'bg-[#F8F6F2] border border-[#E5DFD4] text-[#52525B] hover:text-[#18181B]'
                    }`}
                  >
                    <span className="text-xs font-bold block">{s.name}</span>
                    <span className="text-[10px] text-[#71717A] block mt-0.5">From {s.startingPrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-5 p-4 rounded-2xl bg-[#F8F6F2] border border-[#E5DFD4] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#71717A] block">Estimated Rate</span>
                <span className="text-lg font-bold text-[#8B0000]">{activeService.startingPrice}</span>
              </div>
              <div className="text-right text-[11px] font-mono text-[#18181B]">
                <span className="block flex items-center gap-1 justify-end font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#8B0000]" /> {activeService.turnaround}
                </span>
                <span className="text-[#52525B] flex items-center gap-1 justify-end">
                  <Shield className="w-3.5 h-3.5 text-[#8B0000]" /> {activeService.warranty}
                </span>
              </div>
            </div>

            {/* Contact / Phone input */}
            <div className="mt-4">
              <label className="text-xs uppercase font-mono text-[#71717A] block mb-1.5 font-medium">
                4. Your Contact Number (For SMS/WhatsApp Confirmation)
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F2] border border-[#E5DFD4] text-sm text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#8B0000]"
              />
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-[#EFEBE3] flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-xl bg-[#8B0000] hover:bg-[#A30808] text-white font-bold text-sm shadow-md shadow-[#8B0000]/30 flex items-center justify-center gap-2 transition-all"
              >
                <Wrench className="w-4 h-4" />
                <span>Confirm Service Booking</span>
              </button>

              <a
                href={`https://wa.me/${CONTACT.whatsappNumber}?text=Hi%20MOBIXA,%20I%20want%20to%20book%20a%20repair%20for%20my%20${encodeURIComponent(selectedBrand)}%20phone%20(${encodeURIComponent(activeService.name)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-[#F6F3ED] hover:bg-[#EFEBE3] border border-[#E5DFD4] text-[#18181B] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
