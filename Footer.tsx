import React from "react";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Feather 
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "Facebook", icon: <Facebook className="h-4.5 w-4.5" />, href: "https://facebook.com/nayepankh" },
    { label: "Instagram", icon: <Instagram className="h-4.5 w-4.5" />, href: "https://instagram.com/nayepankh" },
    { label: "Twitter", icon: <Twitter className="h-4.5 w-4.5" />, href: "https://twitter.com/nayepankh" },
    { label: "LinkedIn", icon: <Linkedin className="h-4.5 w-4.5" />, href: "https://linkedin.com/company/nayepankh" },
    { label: "YouTube", icon: <Youtube className="h-4.5 w-4.5" />, href: "https://youtube.com/nayepankh" }
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div id="footer-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Organization Mission Brief */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Feather className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block">
                  NayePankh Foundation
                </span>
                <p className="text-[9px] text-blue-400 uppercase tracking-widest font-extrabold">
                  Empowering Futures
                </p>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed font-semibold">
              NayePankh is a registered non-governmental organization powering the flight of underprivileged youth in India. We build high capability networks with digital lab equipment and custom coaching pathways.
            </p>
            
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 bg-slate-800 hover:bg-blue-600 hover:text-white rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links to scroll points */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Core Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a href="#volunteer" className="hover:text-white transition-colors">Become a Mentor Volunteer</a>
              </li>
              <li>
                <a href="#crowdfunding" className="hover:text-white transition-colors">Live Crowdfunding Goals</a>
              </li>
              <li>
                <a href="#dashboard" className="hover:text-white transition-colors">Academic Performance Metrics</a>
              </li>
              <li>
                <a href="#founder" className="hover:text-white transition-colors">Prashant Shukla Vision Core</a>
              </li>
            </ul>
          </div>

          {/* Verification labels */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Governance & Safety
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>NITI Aayog Darpan Registered</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Govt. of Uttar Pradesh Registered NGO</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Section 80G Tax-Exempt Authority</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>COPPA Guarded Educational Hubs</span>
              </li>
            </ul>
          </div>

          {/* Official Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              Official Headquarters
            </h4>
            <ul className="space-y-3 text-xs leading-relaxed font-semibold">
              
              <li className="flex gap-3 start-items">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                <span>
                  Plot No. 8, Pocket B, Vasant Kunj Sector C, New Delhi, Delhi, India 110070
                </span>
              </li>

              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                <span className="font-mono">
                  +91 99999 88888, +91 95555 77777
                </span>
              </li>

              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                <span>
                  info@nayepankh.org, help@nayepankh.org
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Regulatory fine print and copyrights */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-semibold text-slate-500">
          <p>
            &copy; {currentYear} NayePankh Foundation. All Rights Reserved as a registered Sec 8 Indian NGO.
          </p>
          <div className="flex gap-4">
            <a href="#dashboard" className="hover:text-slate-350">Donor Privacy Protection Plan</a>
            <span className="text-slate-700">|</span>
            <a href="#founder" className="hover:text-slate-350">Admin Credentials Console</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
