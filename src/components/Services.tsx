import React from 'react';
import { REPAIR_SERVICES } from '../config/serviceConfig';
import { RepairServiceItem } from '../types';
import {
  Smartphone,
  BatteryCharging,
  Zap,
  Camera,
  Volume2,
  Cpu,
  Droplets,
  Wrench,
  Clock,
  Shield,
  ArrowRight,
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: RepairServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  // Map icon strings to Lucide components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return Smartphone;
      case 'BatteryCharging':
        return BatteryCharging;
      case 'Zap':
        return Zap;
      case 'Camera':
        return Camera;
      case 'Volume2':
        return Volume2;
      case 'Cpu':
        return Cpu;
      case 'Droplets':
        return Droplets;
      case 'Wrench':
      default:
        return Wrench;
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-transparent border-t border-[#1C1417]">
      {/* Background Burgundy Aura */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#8B0000]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141315] border border-[#29181B] text-[11px] uppercase tracking-[0.2em] text-[#EDE7C7] mb-3">
            <Wrench className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Master Technician Lab</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#EDE7C7]">
            Broken Screen? <span className="text-gradient-burgundy">We've Got It.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#8E8770] leading-relaxed">
            Professional mobile repair with the care your device deserves. ESD-protected clean stations, certified OEM parts, and express turnarounds.
          </p>
        </div>

        {/* 8 Repair Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {REPAIR_SERVICES.map((service) => {
            const Icon = getIcon(service.iconName);
            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group relative rounded-2xl bg-[#141315] border border-[#29181B] hover:border-[#8B0000]/80 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-[#19171C] hover:shadow-2xl hover:shadow-[#8B0000]/15 hover:-translate-y-1"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#1F181B] border border-[#2B1519] group-hover:bg-[#8B0000] group-hover:border-[#8B0000] flex items-center justify-center text-[#EDE7C7] mb-5 transition-all duration-300 shadow-md">
                    <Icon className="w-5 h-5 text-[#EDE7C7]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#EDE7C7] group-hover:text-white transition-colors">
                    {service.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#8E8770] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Metrics & Booking Action */}
                <div className="mt-6 pt-4 border-t border-[#221316]">
                  <div className="flex items-center justify-between text-[11px] text-[#8E8770] mb-3 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8B0000]" />
                      {service.turnaround}
                    </span>
                    <span className="flex items-center gap-1 text-[#EDE7C7]">
                      <Shield className="w-3 h-3 text-[#8B0000]" />
                      {service.warranty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#8E8770] uppercase block">Starts from</span>
                      <span className="text-base font-bold text-[#EDE7C7]">{service.startingPrice}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1F181B] hover:bg-[#8B0000] text-xs font-semibold text-[#EDE7C7] border border-[#2B1519] group-hover:border-transparent transition-all flex items-center gap-1"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
