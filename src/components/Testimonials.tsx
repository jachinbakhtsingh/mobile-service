import React from 'react';
import { TESTIMONIALS } from '../config/testimonialsConfig';
import { Star, Quote, CheckCircle2, HeartHandshake } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#EDE7C7] border-t border-[#DDD6B5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D8D1C4] text-[11px] uppercase tracking-[0.2em] text-[#18181B] font-semibold mb-3 shadow-2xs">
            <HeartHandshake className="w-3.5 h-3.5 text-[#8B0000]" />
            <span>Verified Customer Stories</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#18181B]">
            Loved by <span className="text-gradient-burgundy">Mobile Users.</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#52525B] leading-relaxed font-normal">
            Real experiences from smartphone owners, flagship collectors, and device repair clients.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className="group relative rounded-2xl bg-white/95 backdrop-blur-sm border border-[#D8D1C4] hover:border-[#8B0000]/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-[#8B0000]/10 hover:-translate-y-1 shadow-xs"
            >
              <div>
                {/* Quote Icon & Rating Stars */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4CEBF] group-hover:text-[#8B0000] transition-colors" />
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-[#18181B] leading-relaxed italic font-normal">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-[#EFEBE3] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E5DFD4] flex items-center justify-center text-[#8B0000] font-bold text-sm font-mono shadow-2xs">
                    {item.author[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#18181B]">{item.author}</h4>
                    <p className="text-xs text-[#71717A] font-medium">{item.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#8B0000] font-bold block">{item.device}</span>
                  <span className="text-[9px] text-[#71717A] uppercase font-medium">{item.serviceType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
