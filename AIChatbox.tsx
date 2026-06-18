import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bird, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Message } from "../types";

export default function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: "Namaste! Welcome to the NayePankh Foundation intelligent support desk. I can guide you on making secure tax-exempt contributions towards our crowdfunding projects, registering as a certified volunteer, or accessing student academic reports securely. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "How do I donate and track my goal?",
    "Who is Prashant Shukla?",
    "Can I join as a local volunteer?",
    "How is student records privacy guaranteed?"
  ];

  // Auto-scroll on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: "usr-" + Date.now(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsLoading(true);
    setApiError(null);

    try {
      // Build correct array payload format
      const payloadMessages = [...messages, userMsg].map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) {
        throw new Error("Local support system returned an invalid state.");
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: "ast-" + Date.now(),
          role: "assistant",
          content: data.content,
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      console.error(err);
      setApiError("Connection delayed or key missing. Please verify server endpoints.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-32px)]">
      
      {/* Floating Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-32px)] sm:w-[400px] h-[70vh] sm:h-[550px] max-h-[600px] bg-[#131f32] rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between mb-4 animate-scale-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-905 px-5 py-4 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                <Bird className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold tracking-tight">NP Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-blue-200 font-semibold uppercase tracking-wider">
                    Gemini Intelligence &bull; Live
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Interactive Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0f172a]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {msg.role !== "user" && (
                  <div className="h-7 w-7 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/25 flex items-center justify-center font-bold text-xs shrink-0 self-end">
                    NP
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed font-semibold ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-[#1d2d44] text-slate-100 rounded-bl-none shadow border border-slate-800/80"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 max-w-[80%] mr-auto items-end">
                <div className="h-7 w-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </div>
                <div className="p-3 bg-[#1d2d44] text-slate-250 rounded-2xl rounded-bl-none shadow border border-slate-800 text-xs font-semibold animate-pulse">
                  Typing guidance...
                </div>
              </div>
            )}

            {apiError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-300 p-3 rounded-xl flex gap-2 items-start text-[11px] font-bold">
                <AlertCircle className="h-4 w-4 text-red-405 shrink-0 mt-0.5" />
                <div>
                  <p>{apiError}</p>
                  <p className="text-[9px] text-red-400 font-normal font-sans mt-0.5">Please check if the GEMINI_API_KEY is configured in your secrets.</p>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Footer (Quick-reply options & inputs) */}
          <div className="p-3 bg-[#131f32] border-t border-slate-800 space-y-2.5">
            
            {/* Standard Quick Questions Selector */}
            {messages.length < 4 && (
              <div className="space-y-1.5">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                  Select Quick Query
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] text-blue-300 font-extrabold bg-blue-500/15 hover:bg-blue-500/25 px-2.5 py-1 rounded-full border border-blue-500/20 mt-1"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Form Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about goals, metrics or skills..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                disabled={isLoading}
                className="flex-1 text-xs font-semibold px-3 py-3 border border-slate-700 bg-slate-900 text-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-blue-500/40"
              />
              <button
                type="submit"
                disabled={isLoading || !inputVal.trim()}
                className="px-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Glowing Support Launcher Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-xl shadow-slate-950/70 hover:scale-105 active:scale-95 transition-all group"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6 stroke-[2.5]" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6 stroke-[2.5] group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#131f32] animate-ping" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#131f32]" />
          </div>
        )}
      </button>

    </div>
  );
}
