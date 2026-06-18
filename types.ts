export interface Student {
  id: string; // e.g. "NP-204"
  anonymizedName: string; // e.g. "S. Kumar" or "A. Patil"
  age: number;
  classGrade: string;
  enrolledDate: string;
  attendanceRate: number; // e.g. 94%
  skillProgress: {
    literacy: number; // 0-100
    numeracy: number;
    computing: number;
    communication: number;
  };
  quarterlyGrades: {
    quarter: string; // e.g. "Q1", "Q2"
    gpa: number; // 0-10
  }[];
  recentAchievements: string[];
}

export interface CrowdfundProject {
  id: string;
  title: string;
  description: string;
  image: string;
  targetAmount: number;
  raisedAmount: number;
  donorCount: number;
  category: "Education" | "Nutrition" | "Infrastructure" | "Livelihood";
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  projectTitle: string;
  status: "Success" | "Processing" | "Failed";
  paymentMethod: string;
  transactionRef: string;
}

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  skills: string[];
  availability: string;
  message: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
