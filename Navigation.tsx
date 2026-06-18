import React, { useState } from "react";
import { Feather, Heart, Menu, X, ArrowUpRight, Gift, User } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDonationModal: () => void;
  totalDonated: number;
}

export default function Navigation({
  activeTab,
  setActiveTab,
  openDonationModal,
  totalDonated
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "crowdfunding", label: "Crowdfunding" },
    { id: "dashboard", label: "Impact & Academy" },
    { id: "founder", label: "Founder's Vision" },
    { id: "volunteer", label: "Join as Volunteer" }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    // Scroll to section smoothly if it exists
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[#131f32]/95 backdrop-blur-md border-b border-slate-800">
      <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Brand Wing Representation */}
          <div 
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-md shadow-blue-900/40 transition-all group-hover:scale-105">
              <Feather className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none">
                NayePankh
                <span className="text-xs bg-blue-550/20 border border-blue-500/30 text-blue-300 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  NGO
                </span>
              </span>
              <div className="flex flex-col mt-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold leading-tight flex items-center gap-1">
                  Foundation
                </span>
                <span className="text-[9px] text-blue-400 font-extrabold tracking-tight">
                  Govt. of UP Registered NGO
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-sm font-semibold tracking-wide transition-colors py-2 px-1 ${
                  activeTab === item.id 
                    ? "text-blue-400" 
                    : "text-slate-300 hover:text-blue-400"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* User Donor Dashboard & Primary CTA actions */}
          <div className="hidden md:flex items-center gap-4">
            {totalDonated > 0 && (
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-blue-200 font-mono">
                  Contrib: ₹{totalDonated.toLocaleString()}
                </span>
                <Gift className="h-3.5 w-3.5 text-blue-400" />
              </div>
            )}
            
            <button
              onClick={openDonationModal}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-sm font-extrabold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-900/30"
            >
              <Heart className="h-4 w-4 fill-white animate-pulse" />
              Sponsor Now
              <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            {totalDonated > 0 && (
              <span className="text-xs font-black text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1.5 rounded-full font-mono">
                ₹{totalDonated}
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#131f32] border-b border-slate-800 absolute left-0 right-0 py-4 px-6 shadow-xl space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left py-3 px-4 rounded-xl text-base font-semibold tracking-wide ${
                activeTab === item.id
                  ? "bg-blue-500/10 text-blue-400 font-bold"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDonationModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-extrabold rounded-xl text-white bg-blue-600 shadow-md"
            >
              <Heart className="h-5 w-5 fill-white" />
              Sponsor Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
