import React, { useState } from "react";
import { 
  X, 
  CreditCard, 
  QrCode, 
  Building, 
  ShieldCheck, 
  Activity, 
  History, 
  User, 
  HelpCircle,
  Gift,
  Heart,
  Calendar
} from "lucide-react";
import { CrowdfundProject, Transaction } from "../types";

interface DonationGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: CrowdfundProject | null;
  projects: CrowdfundProject[];
  onCompleteDonation: (amount: number, projectId: string, donorName: string, email: string, method: string) => void;
  userTransactions: Transaction[];
}

export default function DonationGateway({
  isOpen,
  onClose,
  selectedProject,
  projects,
  onCompleteDonation,
  userTransactions
}: DonationGatewayProps) {
  const [projectId, setProjectId] = useState<string>(selectedProject?.id || projects[0]?.id || "");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("5000");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [checkoutStatus, setCheckoutStatus] = useState<"form" | "loading" | "success">("form");
  const [latestRef, setLatestRef] = useState<string>("");

  // Card sub-state
  const [cardNumber, setCardNumber] = useState<string>("4111 2222 3333 4444");
  const [cardExpiry, setCardExpiry] = useState<string>("12/28");
  const [cardCvv, setCardCvv] = useState<string>("123");

  const [activeSubTab, setActiveSubTab] = useState<"donate" | "history">("donate");

  if (!isOpen) return null;

  const currentSelection = projects.find(p => p.id === projectId) || projects[0];

  const handleSuggestAmount = (val: number) => {
    setCustomAmount(val.toString());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(customAmount);
    if (!parsedAmount || parsedAmount <= 0) {
      alert("Please enter a valid donation value.");
      return;
    }
    if (!donorName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!donorEmail.trim()) {
      alert("Please provide your email address.");
      return;
    }

    // Trigger loader progress simulation
    setCheckoutStatus("loading");
    setIsProcessing(true);

    setTimeout(() => {
      const generatedRef = "TXN-" + Math.floor(100000 + Math.random() * 900000);
      setLatestRef(generatedRef);
      setIsProcessing(false);
      setCheckoutStatus("success");
      onCompleteDonation(parsedAmount, projectId, donorName, donorEmail, paymentMethod);
    }, 2500);
  };

  const resetVoucher = () => {
    setCheckoutStatus("form");
    setDonorName("");
    setDonorEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#131f32] rounded-3xl max-w-4xl w-full border border-slate-800 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Info Panel (Dynamic Campaign Indicator and User Dashboard totals) */}
        <div className="md:w-5/12 bg-gradient-to-br from-blue-900 to-indigo-950 p-8 text-white flex flex-col justify-between overflow-y-auto border-r border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="p-1.5 rounded-lg bg-white/10">
                <Gift className="h-5 w-5 text-blue-200" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200 font-mono">
                Sponsor Dashboard
              </span>
            </div>

            {/* Tab toggler for Transaction history and Donate actions */}
            <div className="flex bg-white/10 rounded-xl p-1 mb-8 self-start border border-white/5">
              <button
                onClick={() => setActiveSubTab("donate")}
                className={`flex-1 py-1 px-3 text-xs font-bold rounded-lg transition-all ${
                  activeSubTab === "donate" 
                    ? "bg-white text-blue-800 shadow-sm" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                Sponsor Kit
              </button>
              <button
                onClick={() => setActiveSubTab("history")}
                className={`flex-1 py-1 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-15 ${
                  activeSubTab === "history" 
                    ? "bg-white text-blue-800 shadow-sm" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                <History className="h-3 w-3 inline" />
                History ({userTransactions.length})
              </button>
            </div>

            {activeSubTab === "donate" ? (
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-blue-200 uppercase">
                  Currently Allocating To
                </span>
                <h3 className="text-xl font-extrabold tracking-tight">
                  {currentSelection ? currentSelection.title : "NayePankh Foundation"}
                </h3>
                <p className="text-xs text-blue-100/90 leading-relaxed font-semibold">
                  {currentSelection ? currentSelection.description : "Your donation will support our primary educational centers and skill accelerators."}
                </p>

                {currentSelection && (
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    <span className="text-[9px] font-black tracking-wider text-blue-200 uppercase block mb-1">
                      Crowdfunding Goal Meter
                    </span>
                    <div className="flex justify-between font-mono font-bold text-xs mb-1.5 text-blue-100">
                      <span>Goal: ₹{currentSelection.targetAmount.toLocaleString()}</span>
                      <span>{Math.round((currentSelection.raisedAmount / currentSelection.targetAmount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, (currentSelection.raisedAmount / currentSelection.targetAmount) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                <span className="text-[10px] font-bold tracking-widest text-blue-100 uppercase block mb-2">
                  My Gift History & Impact
                </span>
                
                {userTransactions.length === 0 ? (
                  <div className="text-center py-8 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-xs text-blue-200 font-semibold">No transactions recorded yet.</p>
                    <p className="text-[10px] text-blue-300 mt-1">Make your first optimistic contribution!</p>
                  </div>
                ) : (
                  userTransactions.map((tx) => (
                    <div 
                      key={tx.id}
                      className="bg-white/15 p-3 rounded-xl border border-white/10 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-[11px] font-bold tracking-tight text-white line-clamp-1">
                          {tx.projectTitle}
                        </span>
                        <span className="text-xs font-black text-emerald-300 font-mono">
                          ₹{tx.amount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-[9px] font-bold font-mono text-blue-200">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {tx.date}
                        </span>
                        <span className="bg-emerald-500/80 text-white font-extrabold px-1.5 py-0.5 rounded-full">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/15">
            <div className="flex items-center gap-2 text-xs text-blue-200 font-semibold">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
              <span>Tax exemption receipts generated instantly.</span>
            </div>
          </div>
        </div>

        {/* Right Processing Body (Vouchers, cards, success panels) */}
        <div className="md:w-7/12 p-8 flex flex-col justify-between overflow-y-auto bg-[#0f172a]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-black text-white tracking-tight">
              {checkoutStatus === "form" ? "Secure Checkout Gateway" : checkoutStatus === "loading" ? "Validating Bank Connection" : "Payment Confirmed!"}
            </h4>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {checkoutStatus === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Campaign drop-down selection */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Designate Contribution To
                </label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-3 border border-slate-700 bg-slate-900 text-white rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id} className="bg-slate-900 text-white">
                      {proj.title} (ID: {proj.id})
                    </option>
                  ))}
                </select>
              </div>

              {/* Suggestions row for amount */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                    Sponsorship Amount (₹ INR)
                  </label>
                  <span className="text-[10px] text-blue-400 font-black">
                    80G Receipt Eligible
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  {[2000, 5000, 10000, 25000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleSuggestAmount(preset)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-black tracking-wide border transition-all ${
                        customAmount === preset.toString()
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750"
                      }`}
                    >
                      ₹{preset.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold text-xs font-mono">₹</span>
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter Custom Amount"
                    className="w-full text-xs font-extrabold pl-7 pr-3 py-3 border border-slate-700 bg-slate-900 text-slate-100 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Personal Particulars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                    Donor Full Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Prashant Shukla"
                    className="w-full text-xs px-3 py-3 border border-slate-700 bg-slate-900 text-slate-100 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                    Email for Exemption Certificate
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="shukla@nayepankh.org"
                    className="w-full text-xs px-3 py-3 border border-slate-700 bg-slate-900 text-slate-100 rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                  Select Gateway Channel
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === "card"
                        ? "bg-blue-600/30 border-blue-500 text-blue-350 text-blue-300 shadow-sm"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Cards
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === "upi"
                        ? "bg-blue-600/30 border-blue-500 text-blue-300 shadow-sm"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                    }`}
                  >
                    <QrCode className="h-4 w-4" />
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      paymentMethod === "netbanking"
                        ? "bg-blue-600/30 border-blue-500 text-blue-300 shadow-sm"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                    }`}
                  >
                    <Building className="h-4 w-4" />
                    NetBanking
                  </button>
                </div>
              </div>

              {/* Channel form display */}
              {paymentMethod === "card" ? (
                <div className="bg-[#18263a] p-4 border border-slate-800 rounded-2xl space-y-3">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">
                      Mock Visa Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full text-xs font-mono px-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        className="w-full text-xs font-mono px-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">
                        CVV Code
                      </label>
                      <input
                        type="password"
                        className="w-full text-xs font-mono px-3 py-2 border border-slate-700 rounded-lg bg-slate-900 text-white"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : paymentMethod === "upi" ? (
                <div className="bg-[#18263a] p-4 border border-slate-800 rounded-2xl text-center space-y-2">
                  <div className="inline-block p-2 bg-slate-900 rounded-lg border border-slate-700">
                    <QrCode className="h-16 w-16 text-blue-300 mx-auto" />
                  </div>
                  <p className="text-xs font-black text-white">UPI ID: pay.nayepankh@icici</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Scan QR using GooglePay, PhonePe, or PayTM at checkout.</p>
                </div>
              ) : (
                <div className="bg-[#18263a] p-4 border border-slate-800 rounded-2xl space-y-1">
                  <p className="text-xs font-bold text-white">Participating Banks</p>
                  <p className="text-[11px] text-slate-400">SBI, HDFC, ICICI, Axis, PNB and 42 other national banks supported.</p>
                </div>
              )}

              {/* Submit triggers */}
              <button
                type="submit"
                className="w-full py-4 text-xs font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] transition-all rounded-2xl shadow-md shadow-slate-950/40 flex items-center justify-center gap-2"
              >
                <Heart className="h-4.5 w-4.5 fill-white" />
                Sponsor ₹{Number(customAmount).toLocaleString()} Now
              </button>

            </form>
          )}

          {checkoutStatus === "loading" && (
            <div className="flex-1 flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-widest text-slate-300 animate-pulse">
                  Verifying Transaction Records...
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Connecting safely with Indian Payment Core Services.
                </p>
              </div>
            </div>
          )}

          {checkoutStatus === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center py-12 space-y-6">
              <div className="h-16 w-16 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center shadow-inner border border-emerald-500/30">
                <svg className="h-8 w-8 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="text-center max-w-sm">
                <span className="text-[10px] font-black text-emerald-300 bg-emerald-500/20 rounded-full px-3 py-1 uppercase tracking-widest font-sans border border-emerald-500/30">
                  Sponsorship Received
                </span>
                <h5 className="text-2xl font-black text-white tracking-tight mt-3">
                  Thank You, {donorName}!
                </h5>
                <p className="text-xs text-slate-300 mt-2 font-semibold">
                  Your generous contribution of <strong className="text-white font-extrabold font-mono">₹{Number(customAmount).toLocaleString()}</strong> was allocated. Visual metrics have updated in real-time.
                </p>
              </div>

              {/* Donation receipt details component */}
              <div className="bg-[#18263a] w-full p-4 border border-dashed border-slate-700 rounded-2xl text-xs font-mono text-slate-300 space-y-2">
                <div className="flex justify-between">
                  <span>Reference ID:</span>
                  <span className="font-bold text-white">{latestRef}</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination Code:</span>
                  <span className="font-bold text-white">{projectId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exemption Status:</span>
                  <span className="text-emerald-400 font-bold">100% Tax Deductible (80G)</span>
                </div>
              </div>

              <button
                onClick={resetVoucher}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-900/30"
              >
                Close Gateway & Back to Academy
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
