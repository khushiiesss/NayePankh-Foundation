import { Student, CrowdfundProject } from "./types";

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "NP-STU-101",
    anonymizedName: "Aarav S. (Anonymized for Privacy)",
    age: 11,
    classGrade: "Grade 5",
    enrolledDate: "2024-03-12",
    attendanceRate: 98,
    skillProgress: {
      literacy: 85,
      numeracy: 90,
      computing: 75,
      communication: 80
    },
    quarterlyGrades: [
      { quarter: "Term 1", gpa: 7.8 },
      { quarter: "Term 2", gpa: 8.2 },
      { quarter: "Term 3", gpa: 8.5 },
      { quarter: "Term 4", gpa: 9.1 }
    ],
    recentAchievements: ["1st Place in Local Mathematics Quiz", "Perfect Attendance Star Badge"]
  },
  {
    id: "NP-STU-102",
    anonymizedName: "Diya M. (Anonymized for Privacy)",
    age: 13,
    classGrade: "Grade 7",
    enrolledDate: "2023-09-01",
    attendanceRate: 94,
    skillProgress: {
      literacy: 95,
      numeracy: 78,
      computing: 88,
      communication: 92
    },
    quarterlyGrades: [
      { quarter: "Term 1", gpa: 8.0 },
      { quarter: "Term 2", gpa: 8.4 },
      { quarter: "Term 3", gpa: 8.9 },
      { quarter: "Term 4", gpa: 9.3 }
    ],
    recentAchievements: ["Best Creative Writing Essay Award", "Digital Literacy Certificate Grad"]
  },
  {
    id: "NP-STU-103",
    anonymizedName: "Karan P. (Anonymized for Privacy)",
    age: 9,
    classGrade: "Grade 3",
    enrolledDate: "2024-06-15",
    attendanceRate: 91,
    skillProgress: {
      literacy: 70,
      numeracy: 85,
      computing: 60,
      communication: 72
    },
    quarterlyGrades: [
      { quarter: "Term 1", gpa: 6.5 },
      { quarter: "Term 2", gpa: 7.0 },
      { quarter: "Term 3", gpa: 7.8 },
      { quarter: "Term 4", gpa: 8.2 }
    ],
    recentAchievements: ["Most Improved Reader of the Quarter"]
  },
  {
    id: "NP-STU-104",
    anonymizedName: "Sneha R. (Anonymized for Privacy)",
    age: 14,
    classGrade: "Grade 8",
    enrolledDate: "2023-01-20",
    attendanceRate: 96,
    skillProgress: {
      literacy: 92,
      numeracy: 88,
      computing: 95,
      communication: 89
    },
    quarterlyGrades: [
      { quarter: "Term 1", gpa: 8.5 },
      { quarter: "Term 2", gpa: 8.8 },
      { quarter: "Term 3", gpa: 9.0 },
      { quarter: "Term 4", gpa: 9.4 }
    ],
    recentAchievements: ["Completed Python Coding Basics", "Literacy peer tutor of the month"]
  },
  {
    id: "NP-STU-105",
    anonymizedName: "Rahul G. (Anonymized for Privacy)",
    age: 12,
    classGrade: "Grade 6",
    enrolledDate: "2024-01-10",
    attendanceRate: 95,
    skillProgress: {
      literacy: 78,
      numeracy: 82,
      computing: 80,
      communication: 76
    },
    quarterlyGrades: [
      { quarter: "Term 1", gpa: 7.2 },
      { quarter: "Term 2", gpa: 7.6 },
      { quarter: "Term 3", gpa: 8.0 },
      { quarter: "Term 4", gpa: 8.3 }
    ],
    recentAchievements: ["Science Model Competition Runner-up"]
  }
];

export const INITIAL_PROJECTS: CrowdfundProject[] = [
  {
    id: "PRJ-001",
    title: "Vasant Kunj Digital Learning Lab",
    description: "Equipping a community education space with 10 Chromebooks, stable internet, and digital tutoring tools for 120+ student coders daily.",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800",
    targetAmount: 350000,
    raisedAmount: 245000,
    donorCount: 148,
    category: "Education"
  },
  {
    id: "PRJ-002",
    title: "Sponsor-a-Classroom Book Kits",
    description: "Distribution of high-quality vernacular books, notebook registers, math toolboxes, and science starter kits to 5 different centers.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    targetAmount: 120000,
    raisedAmount: 98500,
    donorCount: 79,
    category: "Education"
  },
  {
    id: "PRJ-003",
    title: "Youth Vocational Skill Center",
    description: "Running weekend tailoring, artisan crafting, and computer hardware workshops for senior kids to pave pathways to secure livelihoods.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=800",
    targetAmount: 500000,
    raisedAmount: 310000,
    donorCount: 204,
    category: "Infrastructure"
  },
  {
    id: "PRJ-004",
    title: "Daily Nutrition & Healthy Meal Drives",
    description: "Providing nutrient-rich lunches, milk packs, and winter fruit distribution to sustain high learning retention levels in primary students.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    targetAmount: 200000,
    raisedAmount: 184500,
    donorCount: 315,
    category: "Nutrition"
  }
];

export const FOUNDER_INFO = {
  name: "Prashant Shukla",
  title: "CEO & Founder",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  bio: "Prashant Shukla founded NayePankh Foundation driven by a simple, powerful belief: a child's socio-economic status should never determine their ultimate potential in life. Under his visionary and energetic leadership, NayePankh has expanded from a local tutoring circle to a registered prominent foundation supporting thousands of underprivileged young learners. His emphasis on modern tools (digital setups, hands-on science) alongside core values continues to guide our operations and secure massive public backing.",
  quote: "Our mission is to attach wings of real-world knowledge, skill enablement, and digital competence. When we educate one underprivileged boy or girl, we do not just rescue a single childhood—we enable an entire family's intergenerational flight."
};

export const INSTANT_FAQS = [
  {
    question: "What does the organization name 'NayePankh' signify?",
    answer: "NayePankh translates directly to 'New Wings' in Hindi. We seek to act as the wind beneath the wings of underprivileged children, lifting them through high-quality primary coaching, programming training, and vocational skills."
  },
  {
    question: "How do I know my donation is secure and goes to the right child?",
    answer: "We ensure extreme accountability. Every rupee raised is mapped to a specific Crowdfunding campaign. Through our user impact report portal, you can monitor student records (anonymized for minors' safety) with genuine, certified quarterly GPA marks and computer skill progression gauges."
  },
  {
    question: "Do you protect the privacy of underprivileged students?",
    answer: "Absolutely. Student names are fully obscured to initials/pseudonyms and photographs are replaced by professional visual representations in the public directory to abide by international children safety guidelines."
  },
  {
    question: "How can I join as an active local volunteer?",
    answer: "You can submit the Volunteer Sign-up Form on this website! Select your skills (such as technology, communications, or elementary teaching), specify availability, and our coordinators will reach out immediately."
  },
  {
    question: "Can I make contributions towards a custom goal?",
    answer: "Yes, you can contribute any amount via our custom donation gateway. You can also allocate your donation to any of the 4 key crowdfunding areas to watch their real-time gauges rise."
  }
];

export const IMPACT_METRICS = [
  { label: "Children Empowered", value: "15,000+", desc: "Receiving high quality tutoring, clothes & vocational courses" },
  { label: "Community Centers", value: "12+", desc: "Safe environments operating across cities with computer labs" },
  { label: "Qualified Volunteers", value: "450+", desc: "Young professionals, tech leads, and academic tutors" },
  { label: "Average Academic Improvement", value: "32%", desc: "Grade point increase mapped between pre and post-enrollment" }
];
