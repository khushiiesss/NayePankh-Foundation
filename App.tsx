import React, { useState, useEffect } from "react";
import { 
  Heart, 
  Feather, 
  Sparkles, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  ChevronRight,
  BookOpen,
  Laptop
} from "lucide-react";
import { Student, CrowdfundProject, Transaction, Volunteer } from "./types";
import { INITIAL_STUDENTS, INITIAL_PROJECTS } from "./data";

// Component imports
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Crowdfunding from "./components/Crowdfunding";
import DonationGateway from "./components/DonationGateway";
import VolunteerForm from "./components/VolunteerForm";
import FounderAndFAQ from "./components/FounderAndFAQ";
import AIChatbox from "./components/AIChatbox";
import Footer from "./components/Footer";

// Path to the custom-generated vector classroom illustration
const HERO_BANNER_PATH = "/src/assets/images/nayepankh_hero_banner_1781760779226.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [projects, setProjects] = useState<CrowdfundProject[]>(INITIAL_PROJECTS);
  
  // Load transactions or initialize with some default history to show off the visual dashboard
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([
    {
      id: "TXN-902410",
      date: "2026-06-12",
      amount: 4500,
      projectTitle: "Sponsor-a-Classroom Book Kits",
      status: "Success",
      paymentMethod: "card",
      transactionRef: "TXN-902410"
    },
    {
      id: "TXN-719302",
      date: "2026-06-01",
      amount: 15000,
      projectTitle: "Vasant Kunj Digital Learning Lab",
      status: "Success",
      paymentMethod: "upi",
      transactionRef: "TXN-719302"
    }
  ]);

  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<CrowdfundProject | null>(null);

  // Total user contribution tally
  const [totalDonated, setTotalDonated] = useState(19500);

  // Re-calculate total donated whenever transaction list grows
  useEffect(() => {
    const sum = userTransactions
      .filter((t) => t.status === "Success")
      .reduce((acc, t) => acc + t.amount, 0);
    setTotalDonated(sum);
  }, [userTransactions]);

  const openDonationModal = (project: CrowdfundProject | null = null) => {
    setSelectedProject(project);
    setIsDonationOpen(true);
  };

  // Callback executed when custom checkout completes successfully
  const handleCompleteDonation = (
    amount: number,
    projId: string,
    donorName: string,
    email: string,
    method: string
  ) => {
    const selectedProj = projects.find((p) => p.id === projId);
    const targetTitle = selectedProj ? selectedProj.title : "NayePankh General Fund";

    // 1. Create transaction profile
    const newTx: Transaction = {
      id: "TXN-" + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().split("T")[0],
      amount: amount,
      projectTitle: targetTitle,
      status: "Success",
      paymentMethod: method,
      transactionRef: "MOCK-GAT-" + Date.now()
    };

    // 2. Append to user transaction logs
    setUserTransactions((prev) => [newTx, ...prev]);

    // 3. Update the raised total and donor quantity in state
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === projId) {
          return {
            ...p,
            raisedAmount: p.raisedAmount + amount,
            donorCount: p.donorCount + 1
          };
        }
        return p;
      })
    );
  };

  const handleRegisterVolunteer = (newVolunteer: Omit<Volunteer, "id">) => {
    const volRecord: Volunteer = {
      id: "VOL-" + Date.now(),
      ...newVolunteer
    };
    setVolunteers((prev) => [volRecord, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-150 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top sticky brand navigation */}
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openDonationModal={() => openDonationModal(null)}
        totalDonated={totalDonated}
      />

      {/* Hero Header Presentation Section */}
      <header id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white min-h-[580px] flex items-center pt-8 pb-16">
        {/* Subtle background canvas mesh overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-900/10 z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogans and Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 font-extrabold text-xs px-4 py-2 rounded-full border border-blue-500/30">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Optimism and Innovation for Indian Children</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs px-4 py-2 rounded-full border border-emerald-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Govt. of Uttar Pradesh Registered NGO</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Give Underserved <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">New Wings</span> of Literacy.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl font-medium leading-relaxed">
              NayePankh Foundation builds local digital libraries, distributes books, and provides elementary programming coaching. We help underprivileged young minds ascend of their own initiative.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => openDonationModal(null)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-2xl active:scale-[0.98] transition-all shadow-lg shadow-blue-500/10"
              >
                <Heart className="h-4.5 w-4.5 fill-white animate-pulse" />
                Sponsor Future Kits
              </button>
              
              <a 
                href="#crowdfunding"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all"
              >
                Explore Campaigned Goals
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Quick summary line cards */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-center lg:text-left">
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-mono block">₹1.2M+</span>
                <span className="text-[10px] uppercase text-slate-400 tracking-wider font-extrabold">Co-Funded</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-mono block">15K+</span>
                <span className="text-[10px] uppercase text-slate-400 tracking-wider font-extrabold">Kids Tutors</span>
              </div>
              <div className="border-none">
                <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono block">100%</span>
                <span className="text-[10px] uppercase text-slate-400 tracking-wider font-extrabold">Secured allocation</span>
              </div>
            </div>
          </div>

          {/* Render our beautifully AI-generated Classroom Banner */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Visual Frame */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/15 w-full max-w-[500px] aspect-[16/9] bg-slate-900 group">
              <img 
                src={HERO_BANNER_PATH} 
                alt="NayePankh Educational Lab Showcase"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-blue-300 font-mono">
                  Verified Lab Setup: Vasant Kunj Hub
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* Float Badge overlay */}
            <div className="absolute -top-4 -right-2 bg-gradient-to-r from-amber-500 to-amber-600 font-black text-slate-900 text-[10px] px-3.5 py-1.5 rounded-full shadow-lg border border-white/10 flex items-center gap-1.5 animate-bounce">
              <Sparkles className="h-3 w-3 fill-slate-900 text-slate-900" />
              <span>NITI AAYOG DARPAN CODE #Darpan/DL/2026</span>
            </div>

            {/* Secondary float index */}
            <div className="hidden sm:flex absolute -bottom-4 -left-6 bg-slate-800/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 items-center gap-3 shadow-xl">
              <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                <Laptop className="h-4.5 w-4.5" />
              </span>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Programming</span>
                <span className="text-xs font-black text-white">Chromebook Labs Coached</span>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Crowdfunding module */}
      <Crowdfunding 
        projects={projects}
        onSponsorProject={openDonationModal}
      />

      {/* Interactive Academic dashboard */}
      <Dashboard 
        students={students}
      />

      {/* Founder Quote/Bio and FAQ segments */}
      <FounderAndFAQ />

      {/* Volunteer coordinator setup */}
      <VolunteerForm 
        onRegisterVolunteer={handleRegisterVolunteer}
      />

      {/* Unified floating Chatbox */}
      <AIChatbox />

      {/* Footer contacts & coordinates */}
      <Footer />

      {/* Donation Gateway Popup overlay */}
      <DonationGateway 
        isOpen={isDonationOpen}
        onClose={() => setIsDonationOpen(false)}
        selectedProject={selectedProject}
        projects={projects}
        onCompleteDonation={handleCompleteDonation}
        userTransactions={userTransactions}
      />

    </div>
  );
}
