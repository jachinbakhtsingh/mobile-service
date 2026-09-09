import React from 'react';
import { REPAIR_STEPS } from '../config/serviceConfig';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const RepairProcess: React.FC = () => {
  return (
    <section className="relative py-20 bg-transparent border-t border-[#1C1417]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#8B0000] font-semibold">
            Seamless Workflow
          </span>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#EDE7C7]">
            How We Restore Your Device
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#8E8770]">
            Four systematic steps from intake to factory seal verification.
          </p>
        </div>

        {/* 4-Step Process: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-px bg-gradient-to-r from-[#8B0000] via-[#EDE7C7]/30 to-[#8B0000] -translate-y-6 z-0" />

          {REPAIR_STEPS.map((step, idx) => (
            <div
              key={step.step}
              id={`repair-step-${step.step}`}
              className="relative z-10 flex flex-col items-center md:items-start p-6 rounded-2xl bg-[#141315] border border-[#29181B] hover:border-[#8B0000] transition-all duration-300 hover:shadow-xl hover:shadow-[#8B0000]/10"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between w-full mb-4">
                <span className="w-10 h-10 rounded-full bg-[#1F181B] border border-[#3D1418] text-[#EDE7C7] font-mono font-bold text-sm flex items-center justify-center shadow-lg shadow-[#8B0000]/20">
                  {step.step}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#8E8770]">
                  Phase {idx + 1}
                </span>
              </div>

              {/* Title & Short Description */}
              <h4 className="text-lg font-bold text-[#EDE7C7] mb-1">
                {step.title}
              </h4>
              <p className="text-xs font-medium text-[#8B0000] mb-2">
                {step.description}
              </p>
              <p className="text-xs text-[#8E8770] leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
