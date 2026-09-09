import React from 'react';
import { REPAIR_STEPS } from '../config/serviceConfig';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const RepairProcess: React.FC = () => {
  return (
    <section className="relative py-20 bg-[#EDE7C7] border-t border-[#DDD6B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#8B0000] font-bold">
            Seamless Workflow
          </span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#18181B]">
            How We Restore Your Device
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#52525B]">
            Four systematic steps from intake to factory seal verification.
          </p>
        </div>

        {/* 4-Step Process: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-px bg-gradient-to-r from-[#8B0000]/20 via-[#8B0000] to-[#8B0000]/20 -translate-y-6 z-0" />

          {REPAIR_STEPS.map((step, idx) => (
            <div
              key={step.step}
              id={`repair-step-${step.step}`}
              className="relative z-10 flex flex-col items-center md:items-start p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#D8D1C4] hover:border-[#8B0000] hover:bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#8B0000]/10 shadow-xs"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between w-full mb-4">
                <span className="w-10 h-10 rounded-full bg-white border border-[#E5DFD4] text-[#8B0000] font-mono font-extrabold text-sm flex items-center justify-center shadow-2xs">
                  {step.step}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#71717A] font-semibold">
                  Phase {idx + 1}
                </span>
              </div>

              {/* Title & Short Description */}
              <h4 className="text-lg font-bold text-[#18181B] mb-1">
                {step.title}
              </h4>
              <p className="text-xs font-semibold text-[#8B0000] mb-2">
                {step.description}
              </p>
              <p className="text-xs text-[#52525B] leading-relaxed font-normal">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
