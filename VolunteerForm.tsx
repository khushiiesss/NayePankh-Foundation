import React, { useState } from "react";
import { Users, Mail, Phone, Calendar, Heart, Shield, CheckCircle } from "lucide-react";
import { Volunteer } from "../types";

interface VolunteerFormProps {
  onRegisterVolunteer: (volunteer: Omit<Volunteer, "id">) => void;
}

export const AVAILABLE_SKILLS = [
  "Elementary Teaching",
  "Programming & Digital Skills",
  "Creative Art & Craft",
  "Event Coordinating",
  "Sponsorship Outreach",
  "Social Media & Content Writing"
];

export default function VolunteerForm({ onRegisterVolunteer }: VolunteerFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [availability, setAvailability] = useState("Weekends");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || selectedSkills.length === 0) {
      alert("Please provide details and select at least one supporting skill.");
      return;
    }

    onRegisterVolunteer({
      fullName,
      email,
      skills: selectedSkills,
      availability,
      message
    });

    setIsSubmitted(true);
    
    // Auto reset form entries
    setFullName("");
    setEmail("");
    setPhone("");
    setSelectedSkills([]);
    setMessage("");
  };

  return (
    <section id="volunteer" className="scroll-mt-24 py-16 bg-[#0f172a] border-t border-slate-800">
      <div id="volunteer-container" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left copy columns */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-blue-300 font-extrabold tracking-widest text-xs uppercase bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 font-sans animate-pulse">
              Community Engagement
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Attach Your Wings to NayePankh
            </h2>
            <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed">
              We are constantly seeking motivated teachers, tech leaders, coders, and communications enthusiasts who want to sponsor their spare time towards educating our children.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 text-blue-300 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Support Young Minds</h4>
                  <p className="text-xs text-slate-400 mt-1">Lead primary classrooms, arithmetic workshops, or tech labs.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 text-blue-300 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-white">Earn Official Certification</h4>
                  <p className="text-xs text-slate-400 mt-1">Receive highly commended social contribution letters for your career.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <p className="text-xs text-blue-305 font-extrabold text-blue-300">
                * Prashant Shukla (CEO) regularly reviews performance logs of active mentors and issues awards of honor to leaders.
              </p>
            </div>
          </div>

          {/* Right form input column */}
          <div className="lg:col-span-7 bg-[#131f32] p-8 rounded-3xl border border-slate-800 shadow-2xl">
            {isSubmitted ? (
               <div className="text-center py-12 space-y-4">
                 <div className="h-14 w-14 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                   <CheckCircle className="h-7 w-7" />
                 </div>
                 <div>
                   <h3 className="text-xl font-black text-white tracking-tight">Application Transmitted!</h3>
                   <p className="text-xs md:text-sm text-slate-300 mt-2 font-semibold">
                     Thank you for stepping forward. Our community coordinators at the New Delhi regional head office will verify your details and connect with you shortly.
                   </p>
                 </div>
                 <button
                   onClick={() => setIsSubmitted(false)}
                   className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all"
                 >
                   Register Another Volunteer
                 </button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Users className="h-5 w-5" />
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-205 text-white">
                    Sponsor Registration Form
                  </h3>
                </div>

                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Users className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Please enter your name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs pl-10 pr-3 py-3 border border-slate-705 bg-slate-900 border-slate-700 rounded-xl text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-10 pr-3 py-3 border border-slate-705 bg-slate-900 border-slate-700 rounded-xl text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                      Contact number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type="tel"
                        placeholder="9876543210 (Optional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs pl-10 pr-3 py-3 border border-slate-705 bg-slate-900 border-slate-700 rounded-xl text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                      Availability
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-505 text-slate-500" />
                      </div>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full text-xs pl-10 pr-3 py-3 border border-slate-705 bg-slate-900 border-slate-700 rounded-xl text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                      >
                        <option value="Weekends">Weekends only</option>
                        <option value="Weekdays">Weekdays only</option>
                        <option value="Flexible">Flexible hours</option>
                        <option value="Remote">Remote tasks only</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Skill selection tokens */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                    Skills You Want to Contribute (Select Multiple)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABLE_SKILLS.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-900/30"
                              : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                          }`}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-slate-400 tracking-wider mb-1.5">
                    Brief Statement of Purpose
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us why you want to support NayePankh..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 border border-slate-705 bg-slate-900 border-slate-700 rounded-xl text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 font-extrabold text-white rounded-2xl text-xs font-black tracking-wider uppercase transition-all shadow-md shadow-blue-900/45"
                >
                  Transmit Application Voucher
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
