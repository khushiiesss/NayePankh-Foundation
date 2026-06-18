import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Laptop, 
  Clock, 
  HelpCircle, 
  FileText,
  CheckCircle,
  EyeOff
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Student } from "../types";
import { INITIAL_STUDENTS, IMPACT_METRICS } from "../data";

interface DashboardProps {
  students: Student[];
}

export default function Dashboard({ students }: DashboardProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || "NP-STU-101");
  const [privacyMode, setPrivacyMode] = useState<boolean>(true);
  const [verificationInput, setVerificationInput] = useState<string>("");
  const [isVerifiedPersonnel, setIsVerifiedPersonnel] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleVerifyCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationInput.toLowerCase() === "np-staff" || verificationInput.toLowerCase() === "admin") {
      setIsVerifiedPersonnel(true);
      setPrivacyMode(false);
      setAuthError("");
    } else {
      setAuthError("Invalid access token. Try 'np-staff' or 'admin' for mock review.");
    }
  };

  // Convert skill object for recharts BarChart
  const skillChartData = currentStudent ? [
    { name: "Language Literacy", level: currentStudent.skillProgress.literacy },
    { name: "Math Numeracy", level: currentStudent.skillProgress.numeracy },
    { name: "Digital Tech", level: currentStudent.skillProgress.computing },
    { name: "Communications", level: currentStudent.skillProgress.communication }
  ] : [];

  return (
    <section id="dashboard" className="scroll-mt-24 py-16 bg-[#0f172a] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-blue-300 font-extrabold tracking-widest text-xs uppercase bg-blue-500/20 rounded-full px-4 py-1.5 font-sans border border-blue-500/30">
            Real Impact & Academy
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-4 leading-tight">
            How Your Generosity Transforms Lives
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-3 font-semibold">
            Track actual academic success and software skills. We measure, audit, and display the direct outcome of every sponsored kit.
          </p>
        </div>

        {/* Impact metrics highlight board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {IMPACT_METRICS.map((metric, i) => (
            <div 
              key={i} 
              className="bg-[#131f32] p-6 rounded-2xl border border-slate-800 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest font-mono">
                  Verified Metric
                </span>
                <p className="text-3xl font-extrabold text-white mt-2 tracking-tight">
                  {metric.value}
                </p>
                <h4 className="text-sm font-bold text-slate-200 mt-1">
                  {metric.label}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed font-semibold">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Security & Record Privacy Warning panel */}
        <div className="bg-[#131f32] rounded-3xl border border-slate-800 overflow-hidden shadow-2xl mb-12">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white tracking-wide">
                  Secure Data Privacy Environment (COPPA Compliant)
                </h3>
                <p className="text-xs text-blue-100 font-semibold">
                  To protect minor students, primary records are encrypted, anonymized, or masked.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPrivacyMode(!privacyMode)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                  privacyMode 
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
                    : "bg-[#18263a] text-slate-100 border border-slate-700"
                }`}
              >
                {privacyMode ? (
                  <>
                    <Lock className="h-3.5 w-3.5 animate-pulse" />
                    Strict Masking Active
                  </>
                ) : (
                  <>
                    <Unlock className="h-3.5 w-3.5" />
                    Masking Cleared
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Student selection registry */}
            <div className="lg:col-span-4 border-r border-slate-800 pr-0 lg:pr-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">
                  Anonymized Students Directory
                </h4>
                <EyeOff className="h-4 w-4 text-slate-500" />
              </div>
              
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-2">
                {students.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudentId(student.id)}
                    className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                      selectedStudentId === student.id
                        ? "bg-blue-500/10 border-blue-500/35 shadow-lg text-blue-300"
                        : "bg-[#18263a] hover:bg-[#1f3049] border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          {student.id}
                        </span>
                        {privacyMode && (
                          <span className="bg-amber-950 text-amber-400 p-0.5 rounded">
                            <Lock className="h-2.5 w-2.5 inline" />
                          </span>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-white truncate mt-1">
                        {privacyMode ? "Student " + student.id.slice(-3) : student.anonymizedName}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-bold font-mono">
                        {student.classGrade} &bull; Attendance {student.attendanceRate}%
                      </span>
                    </div>
                    <span className="text-xs font-extrabold bg-blue-500/20 text-blue-300 h-6 w-6 rounded-full flex items-center justify-center">
                      ★
                    </span>
                  </button>
                ))}
              </div>

              {/* Private Staff Access Form */}
              {!isVerifiedPersonnel && (
                <form onSubmit={handleVerifyCredential} className="mt-6 pt-6 border-t border-slate-800">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1.5">
                    Clear Privacy Mode (Staff Authorization)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Access Token (np-staff)"
                      value={verificationInput}
                      onChange={(e) => setVerificationInput(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-slate-700 bg-slate-900 rounded-xl text-slate-100 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shrink-0"
                    >
                      Clear
                    </button>
                  </div>
                  {authError && <p className="text-[10px] text-red-400 mt-1.5 font-bold font-mono">{authError}</p>}
                </form>
              )}
            </div>

            {/* Student specific metrics & graphs */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              {/* Header profile */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded-full font-mono border border-slate-700">
                      {currentStudent.id}
                    </span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Active Enrollment
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white mt-1.5">
                    {privacyMode ? "Underage Beneficiary (" + currentStudent.id + ")" : currentStudent.anonymizedName}
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    Coached at our New Delhi community support drive center since {currentStudent.enrolledDate}
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-blue-500/10 p-2.5 rounded-2xl border border-blue-500/20 self-stretch sm:self-auto">
                  <div className="h-10 w-10 text-blue-300 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">
                      Academic Attendance
                    </span>
                    <p className="text-base font-black text-blue-400 font-mono">
                      {currentStudent.attendanceRate}% Presence
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Visualization Graphs */}
              <div id="chart-section" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* GPA Term Progression Area Chart */}
                <div className="bg-[#18263a] p-4 rounded-2xl border border-slate-800">
                  <h5 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
                    GPA Term Progression
                  </h5>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={currentStudent.quarterlyGrades}
                        margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={10} fontWeight="bold" />
                        <YAxis stroke="#94a3b8" domain={[0, 10]} fontSize={10} fontWeight="bold" />
                        <Tooltip contentStyle={{ backgroundColor: '#131f32', borderColor: '#334155', color: '#f1f5f9' }} />
                        <Area 
                          type="monotone" 
                          dataKey="gpa" 
                          stroke="#3b82f6" 
                          strokeWidth={2.5}
                          fillOpacity={1} 
                          fill="url(#gpaGradient)" 
                          name="GPA (Out of 10)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-semibold">
                    *Term-over-term verified academic evaluations curated by our voluntary teaching leads.
                  </p>
                </div>

                {/* Skill Development Metrics Bar Chart */}
                <div className="bg-[#18263a] p-4 rounded-2xl border border-slate-800">
                  <h5 className="text-xs font-black text-slate-200 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Laptop className="h-3.5 w-3.5 text-blue-400" />
                    Core Skill Development Index
                  </h5>
                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={skillChartData}
                        margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} fontWeight="bold" />
                        <YAxis stroke="#94a3b8" domain={[0, 100]} fontSize={10} fontWeight="bold" />
                        <Tooltip contentStyle={{ backgroundColor: '#131f32', borderColor: '#334155', color: '#f1f5f9' }} />
                        <Bar 
                          dataKey="level" 
                          fill="#3b82f6" 
                          radius={[4, 4, 0, 0]} 
                          name="Competence %" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 font-semibold">
                    *Assessed quarterly covering computer skills, digital literacy, and logic classes.
                  </p>
                </div>

              </div>

              {/* Achievements banner */}
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl">
                <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest font-mono">
                  Verified Milestones & Stars
                </span>
                <div className="mt-2 space-y-2">
                  {currentStudent.recentAchievements.map((ach, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                        ✓
                      </span>
                      <p className="text-xs font-semibold text-slate-200">
                        {privacyMode ? "Achieved top quartile recognition in regional community tasks." : ach}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
