import React from "react";
import { Users, Target, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from "lucide-react";
import { CrowdfundProject } from "../types";

interface CrowdfundingProps {
  projects: CrowdfundProject[];
  onSponsorProject: (project: CrowdfundProject) => void;
}

export default function Crowdfunding({ projects, onSponsorProject }: CrowdfundingProps) {
  return (
    <section id="crowdfunding" className="scroll-mt-24 py-16 bg-[#0f172a] border-t border-slate-800">
      <div id="crowdfund-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-blue-300 font-extrabold tracking-widest text-xs uppercase bg-blue-500/20 rounded-full px-4 py-1.5 font-sans border border-blue-500/30 animate-pulse">
              Optimistic Crowdfunding
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-4 leading-tight font-sans">
              Sponsor Specific Children Programs
            </h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 font-medium">
              Select an educational center task or digital drive. Track your direct contribution goal progress in real-time and feel the direct outcome.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2.5 rounded-2xl shrink-0">
            <Sparkles className="h-4.5 w-4.5 text-blue-400 animate-spin" />
            <span className="text-[11px] font-black uppercase text-blue-300 tracking-wide">
              100% Direct Allocation Guarantee
            </span>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const percentage = Math.min(
              100,
              Math.round((project.raisedAmount / project.targetAmount) * 100)
            );
            const isCompleted = project.raisedAmount >= project.targetAmount;

            return (
              <div 
                key={project.id}
                className="bg-[#131f32] rounded-3xl overflow-hidden border border-slate-800 shadow-xl hover:shadow-2xl hover:border-slate-700 transition-all flex flex-col justify-between group"
              >
                {/* Visual Cover */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 bg-[#131f32]/90 backdrop-blur-md text-blue-300 rounded-full shadow-md border border-slate-800">
                      {project.category}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wide px-3 py-1 bg-emerald-500 text-white rounded-full shadow-sm flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Fully Funded
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] font-bold px-3 py-1 rounded-lg border border-white/10">
                    ID: {project.id}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 font-medium mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Funding Gauge Tracker */}
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <div className="flex justify-between items-end text-xs font-bold text-slate-300 mb-2">
                      <div className="flex gap-1.5 items-center">
                        <Target className="h-3.5 w-3.5 text-blue-400" />
                        <span>Raised: <strong className="text-white font-extrabold font-mono text-[13px]">₹{project.raisedAmount.toLocaleString()}</strong></span>
                      </div>
                      <span className="text-blue-400 font-extrabold font-mono text-[13px]">{percentage}%</span>
                    </div>

                    {/* Progress Slider */}
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          isCompleted ? "bg-emerald-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 mt-3 font-mono">
                      <span>Target: ₹{project.targetAmount.toLocaleString()}</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-indigo-400" />
                        {project.donorCount} Generous Sponsors
                      </span>
                    </div>
                  </div>

                  {/* Trigger Call to action */}
                  <div className="mt-6">
                    <button
                      onClick={() => onSponsorProject(project)}
                      className={`w-full py-3.5 px-5 rounded-2xl text-xs font-black tracking-wider uppercase transition-all active:scale-[0.98] ${
                        isCompleted
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30"
                      }`}
                      disabled={isCompleted}
                    >
                      {isCompleted ? "Goal Completed" : "Sponsor this Goal"}
                    </button>
                    
                    <div className="flex items-center justify-center gap-1.5 mt-3">
                      <ShieldCheck className="h-3 w-3 text-slate-500" />
                      <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                        SECURE 256-BIT MOCK TRANSFERS
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
