import React, { useState } from "react";
import { MessageSquare, Quote, Heart, Star, ChevronDown, ChevronUp } from "lucide-react";
import { FOUNDER_INFO, INSTANT_FAQS } from "../data";

export default function FounderAndFAQ() {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  const toggleFAQIndex = (i: number) => {
    setOpenFAQIndex(openFAQIndex === i ? null : i);
  };

  return (
    <section id="founder" className="scroll-mt-24 py-16 bg-[#0f172a] border-t border-slate-800">
      <div id="founder-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Founder & CEO Banner Section */}
        <div className="bg-[#131f32] rounded-3xl overflow-hidden text-white shadow-xl border border-slate-800 p-8 md:p-12">
          
          {/* Vision Message Copy */}
          <div className="max-w-4xl mx-auto flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <span className="text-[10px] bg-blue-600/30 border border-blue-500/35 text-blue-300 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest font-mono">
                  Executive Leadership Vision
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white">
                "An underprivileged child's status must never restrict their future flight."
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-semibold">
                {FOUNDER_INFO.bio}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-800 relative flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <Quote className="absolute right-0 top-6 h-12 w-12 text-slate-800 opacity-30 pointer-events-none" />
              <div className="space-y-3 max-w-xl">
                <p className="text-xs md:text-sm text-blue-200 italic font-medium leading-relaxed">
                  "{FOUNDER_INFO.quote}"
                </p>
                <div>
                  <h4 className="text-sm font-black text-white">{FOUNDER_INFO.name}</h4>
                  <p className="text-xs text-blue-400 font-extrabold uppercase tracking-widest mt-0.5">
                    {FOUNDER_INFO.title} &bull; NayePankh NGO
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Accordion FAQ Segment */}
        <div className="pt-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-blue-300 font-extrabold tracking-widest text-xs uppercase bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 font-sans animate-pulse">
              Help Desk & FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-4">
              Answers to Common Questions
            </h2>
            <p className="text-sm md:text-base text-slate-300 mt-3 font-semibold">
              Curious about tax exemptions, curriculum setups, or child privacy controls? We believe in absolute transparency.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {INSTANT_FAQS.map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div 
                  key={index}
                  className="bg-[#131f32] border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFAQIndex(index)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-[#1a293d]"
                  >
                    <span className="text-sm md:text-base font-bold text-white pr-4">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 border-t border-slate-800/80 pt-4">
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-semibold">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
