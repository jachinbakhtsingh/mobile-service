import React from 'react';
import { WHY_CHOOSE_US } from '../config/whyChooseUsConfig';
import { ShieldCheck, Award, Sparkles, Clock, Headphones, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Award':
        return Award;
      case 'Sparkles':
        return Sparkles;
      case 'Clock':
        return Clock;
      case 'Headphones':
        return Headphones;
      case 'CheckCircle2':
      default:
        return CheckCircle2;
    }
  };

  return (
    <section id="why-us" className="relative py-24 md:py-32 bg-[#EDE7C7] border-t border-[#DDD6B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6F3ED] border border-[#E5DFD4] text-[11px] uppercase tracking-[0.2em] text-[#18181B] font-semibold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>The MOBIXA Difference</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
            More Than a <span className="text-gradient-burgundy">Mobile Store.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#52525B] leading-relaxed font-normal">
            Engineered around trust, speed, and technical mastery. We treat your digital life with meticulous precision.
          </p>
        </div>

        {/* 6 Feature Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <div
                key={item.id}
                id={`why-card-${item.id}`}
                className="group relative rounded-2xl bg-[#F8F6F2] border border-[#E5DFD4] hover:border-[#8B0000]/70 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-[#8B0000]/10 hover:-translate-y-1 shadow-xs"
              >
                <div>
                  {/* Top Bar: Icon & Metric Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5DFD4] group-hover:bg-[#8B0000] flex items-center justify-center text-[#8B0000] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 transition-colors" />
                    </div>

                    {item.metric && (
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-[#E5DFD4] text-[#18181B] font-semibold shadow-2xs">
                        {item.metric}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#18181B] group-hover:text-[#8B0000] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#52525B] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EFEBE3] flex items-center gap-1.5 text-[11px] font-mono text-[#8B0000] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>MOBIXA Certified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
