/**
 * CareerMap Institutes & Transparency Data Subsystem
 * 
 * Supports:
 * 1. Schools (Class 8-10, 11-12) & Colleges (UG, PG, Diploma, PhD)
 * 2. Board selection: UP Board, CBSE, ICSE, State Boards
 * 3. Verified vs Unverified Placement Badges & Student-by-Student packages
 * 4. On-site Physical Audit Booking & Inspection Reports
 * 5. Side-by-Side Comparison Matrix with Advantages & Disadvantages
 * 6. Direct Application / Contact options (Website, Phone, WhatsApp, Apply Now)
 * 7. Verification & Audit Request Queues for the Admin Backend
 */

import { sanitizeInput, logSecurityEvent } from "./security-service";

export type InstituteType = "college" | "school" | "university";
export type EducationLevel = "class_8_10" | "class_11_12" | "ug" | "pg" | "diploma" | "phd";
export type BoardType = "CBSE" | "ICSE" | "UP Board" | "State Board" | "IB" | "Autonomous";
export type StreamType =
  | "Science (PCM)"
  | "Science (PCB)"
  | "Commerce"
  | "Arts/Humanities"
  | "Engineering (B.Tech CS/IT/AI)"
  | "Engineering (Mech/Civil/EE)"
  | "Management (BBA/MBA)"
  | "Medical & Healthcare (MBBS/BDS)"
  | "Law (BA/BBA LLB)"
  | "Computer Applications (BCA/MCA)"
  | "Design & Architecture"
  | "Vocational & Polytechnic";

export interface StudentPlacementRecord {
  id: string;
  studentName: string;
  company: string;
  packageLPA: number;
  year: number;
  role: string;
  verified: boolean;
  verificationSource: string;
}

export interface InstitutePlacementData {
  status: "verified" | "unverified";
  badgeNotice: string;
  lastYearPlacementRate: number; // e.g. 96 (%)
  allTimePlacementRate: number; // e.g. 92 (%)
  averagePackageLPA: number;
  highestPackageLPA: number;
  medianPackageLPA: number;
  topRecruiters: string[];
  students: StudentPlacementRecord[];
}

export interface AuditDetails {
  status: "verified" | "unverified";
  badgeNotice: string;
  lastAuditDate?: string;
  auditTeamSize?: number;
  inspectedLabs?: {
    physicsLab: boolean;
    chemistryLab: boolean;
    biologyLab: boolean;
    csDeptLabs: boolean;
    managementClassrooms: boolean;
    sportsGrounds: boolean;
  };
  studentSamplingConducted: boolean;
  randomStudentInterviewCount: number;
  topStudentInterviewCount: number;
  studentFeedbackSummary?: string;
  infrastructureVerdict?: string;
}

export type OwnershipType = "central_govt" | "state_govt" | "deemed" | "private" | "international";
export type InstitutionCategory = "government" | "private";

export interface InstituteReview {
  id: string;
  studentName: string;
  studentEmail: string;
  studentRole?: string;
  ratingOutOf10: number; // Out of 10.0
  comment: string;
  date: string;
  parentReviewId?: string;
  replies: InstituteReview[];
  likes: number;
}

export type PhotoCategory = "campus" | "classrooms" | "labs" | "grounds" | "sports";

export interface InstitutePhoto {
  id: string;
  category: PhotoCategory;
  title: string;
  url: string;
  type: "highlight" | "ground_reality"; // Shows transparent true inspection vs official photo
  status: "verified" | "unverified";
  caption: string;
}

export interface Institute {
  id: string;
  name: string;
  shortName: string;
  type: InstituteType;
  levels: EducationLevel[];
  boards?: BoardType[];
  streams: StreamType[];
  location: {
    city: string;
    state: string;
    area: string;
    address: string;
    geo: { lat: number; lng: number };
    googleMapsUrl: string;
  };
  establishedYear: number;
  yearsInOperation: number;
  website: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  ownershipType: OwnershipType;
  institutionCategory: InstitutionCategory;
  totalStudentsEnrolled: number;
  seatMatrix: {
    availableSeats: number;
    totalSeats: number;
  };
  feeStructure: {
    tuitionPerYear: number;
    hostelPerYear?: number;
    totalEstimated: number;
    scholarshipAvailable: boolean;
    notes: string;
  };
  ratings: {
    overall: number; // Out of 10.0
    faculty: number;
    infrastructure: number;
    studentCaliber: number;
    sportsAndExtracurricular: number;
    techLevel: number;
  };
  advantages: string[];
  disadvantages: string[];
  placement: InstitutePlacementData;
  audit: AuditDetails;
  photos: InstitutePhoto[];
  reviews: InstituteReview[];
  rankScore: number; // 1-100 calculated ranking
  featured: boolean;
}

// Request Queues
export interface PlacementVerificationRequest {
  id: string;
  instituteId: string;
  instituteName: string;
  contactPerson: string;
  officialEmail: string;
  phone: string;
  whatsapp: string;
  companyContactDetails: string;
  notes: string;
  status: "pending" | "contacting_companies" | "verified" | "rejected";
  createdAt: string;
}

export interface OnSiteAuditRequest {
  id: string;
  instituteId: string;
  instituteName: string;
  contactPerson: string;
  officialEmail: string;
  phone: string;
  whatsapp: string;
  coursesToAudit: string[];
  preferredAuditDate: string;
  teamSizeRequested: number;
  travelLodgingAgreed: boolean;
  notes: string;
  status: "pending_review" | "scheduled" | "team_assigned" | "completed" | "rejected";
  createdAt: string;
}

export interface NewInstituteRequest {
  id: string;
  instituteName: string;
  type: InstituteType;
  locationName: string;
  exactGeolocation: string;
  establishedYear: number;
  website: string;
  officialEmail: string;
  contactPhone: string;
  streamsOffered: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface DirectApplication {
  id: string;
  instituteId: string;
  instituteName: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  desiredCourseOrGrade: string;
  lastAcademicScore: string;
  message: string;
  status: "received" | "forwarded_to_institute";
  createdAt: string;
}

// Initial Seed Institutes Database
export const initialInstitutes: Institute[] = [
  {
    id: "iit-delhi",
    name: "Indian Institute of Technology Delhi (IITD)",
    shortName: "IIT Delhi",
    type: "college",
    levels: ["ug", "pg", "phd"],
    streams: [
      "Engineering (B.Tech CS/IT/AI)",
      "Engineering (Mech/Civil/EE)",
      "Design & Architecture",
    ],
    location: {
      city: "New Delhi",
      state: "Delhi",
      area: "Hauz Khas",
      address: "IIT Campus, Hauz Khas, New Delhi 110016",
      geo: { lat: 28.545, lng: 77.1926 },
      googleMapsUrl: "https://maps.google.com/?q=IIT+Delhi",
    },
    establishedYear: 1961,
    yearsInOperation: 65,
    website: "https://home.iitd.ac.in",
    contact: {
      email: "admissions@iitd.ac.in",
      phone: "+91-11-2659-7135",
      whatsapp: "+91-9876543210",
    },
    ownershipType: "central_govt",
    institutionCategory: "government",
    totalStudentsEnrolled: 11500,
    seatMatrix: {
      availableSeats: 340,
      totalSeats: 1450,
    },
    feeStructure: {
      tuitionPerYear: 225000,
      hostelPerYear: 45000,
      totalEstimated: 270000,
      scholarshipAvailable: true,
      notes: "Full fee waiver for SC/ST/PwD; merit-cum-means scholarship for general students.",
    },
    ratings: {
      overall: 9.8,
      faculty: 9.8,
      infrastructure: 9.6,
      studentCaliber: 10.0,
      sportsAndExtracurricular: 9.4,
      techLevel: 10.0,
    },
    advantages: [
      "Top-tier international & domestic placements with marquee tech giants",
      "World-class faculty with active IEEE/ACM research publications",
      "Unmatched peer group & startup incubation ecosystem",
      "Fully verified independent placement record with direct corporate confirmation",
    ],
    disadvantages: [
      "Intensely competitive academic grading curve",
      "Older hostel wings undergoing phased renovation",
      "High cutoff requirement (Top 0.05% in JEE Advanced)",
    ],
    placement: {
      status: "verified",
      badgeNotice:
        "Verified Placement: Independently cross-checked directly with employer HR records (Google, Microsoft, Goldman Sachs, etc.).",
      lastYearPlacementRate: 97.4,
      allTimePlacementRate: 95.8,
      averagePackageLPA: 25.8,
      highestPackageLPA: 120.0,
      medianPackageLPA: 22.0,
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Apple", "Oracle", "Tower Research"],
      students: [
        {
          id: "st_1",
          studentName: "Aditya Sharma",
          company: "Google India",
          packageLPA: 54.5,
          year: 2025,
          role: "Software Development Engineer",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Google HR APAC)",
        },
        {
          id: "st_2",
          studentName: "Sneha Patel",
          company: "Microsoft IDC",
          packageLPA: 51.0,
          year: 2025,
          role: "Core Software Engineer",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Microsoft HR)",
        },
        {
          id: "st_3",
          studentName: "Rohan Verma",
          company: "Goldman Sachs",
          packageLPA: 38.0,
          year: 2025,
          role: "Quantitative Analyst",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (GS Campus Team)",
        },
      ],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: Physical verification conducted by CareerMap Audit Team. Random student sampling & lab inspection confirmed.",
      lastAuditDate: "2025-10-18",
      auditTeamSize: 4,
      inspectedLabs: {
        physicsLab: true,
        chemistryLab: true,
        biologyLab: true,
        csDeptLabs: true,
        managementClassrooms: true,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 42,
      topStudentInterviewCount: 15,
      studentFeedbackSummary:
        "Students praised high technical freedom, 24/7 supercomputing cluster access, and active coding societies. Noted high workload during minor exam weeks.",
      infrastructureVerdict:
        "Outstanding HPC clusters, robotics facilities, and Olympic-sized sports grounds. Academic blocks maintained to high standards.",
    },
    photos: [
      {
        id: "p1",
        category: "campus",
        title: "IIT Delhi Iconic Main Building & Lawn",
        url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Main administrative & academic building courtyard",
      },
      {
        id: "p2",
        category: "labs",
        title: "Bharti School of Telecommunication & CS Lab",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "High performance workstation labs with GPU clusters",
      },
      {
        id: "p3",
        category: "grounds",
        title: "IITD Main Sports Ground & Athletic Track",
        url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        type: "ground_reality",
        status: "verified",
        caption: "Audited Ground Reality: Floodlit football and cricket facility",
      },
    ],
    reviews: [
      {
            "id": "rev_iitd_1",
            "studentName": "Aarav Gupta",
            "studentEmail": "aarav.g@iitd.ac.in",
            "studentRole": "Final Year B.Tech CSE",
            "ratingOutOf10": 9.8,
            "comment": "Unmatched peer group and research funding. Supercomputing facilities at Bharti School are 24/7 accessible. Coding culture and hackathons are unmatched across India.",
            "date": "2026-02-14",
            "likes": 28,
            "replies": [
                  {
                        "id": "rev_iitd_1_1",
                        "studentName": "Pooja Deshmukh",
                        "studentEmail": "pooja.d@iitd.ac.in",
                        "studentRole": "3rd Year Electrical",
                        "ratingOutOf10": 9.5,
                        "comment": "Can confirm! The workload can get intense during minor exams week, but professors and TAs are very supportive.",
                        "date": "2026-02-15",
                        "parentReviewId": "rev_iitd_1",
                        "likes": 12,
                        "replies": []
                  }
            ]
      },
      {
            "id": "rev_iitd_2",
            "studentName": "Kunal Singhania",
            "studentEmail": "kunal.s@alumni.iitd.ac.in",
            "studentRole": "Alumni (2025 Batch)",
            "ratingOutOf10": 9.6,
            "comment": "Placement season was transparent and well-coordinated. Top international quant funds and AI labs visited campus.",
            "date": "2026-01-20",
            "likes": 19,
            "replies": []
      }
],
    rankScore: 98,
    featured: true,
  },
  {
    id: "dtu-delhi",
    name: "Delhi Technological University (DTU)",
    shortName: "DTU Delhi",
    type: "college",
    levels: ["ug", "pg", "phd"],
    streams: [
      "Engineering (B.Tech CS/IT/AI)",
      "Engineering (Mech/Civil/EE)",
      "Management (BBA/MBA)",
    ],
    location: {
      city: "New Delhi",
      state: "Delhi",
      area: "Rohini",
      address: "Shahbad Daulatpur, Main Bawana Road, Rohini, Delhi 110042",
      geo: { lat: 28.7499, lng: 77.117 },
      googleMapsUrl: "https://maps.google.com/?q=DTU+Delhi",
    },
    establishedYear: 1941,
    yearsInOperation: 85,
    website: "https://www.dtu.ac.in",
    contact: {
      email: "info@dtu.ac.in",
      phone: "+91-11-2787-1018",
      whatsapp: "+91-9876543211",
    },
    ownershipType: "state_govt",
    institutionCategory: "government",
    totalStudentsEnrolled: 14200,
    seatMatrix: {
      availableSeats: 620,
      totalSeats: 2500,
    },
    feeStructure: {
      tuitionPerYear: 195000,
      hostelPerYear: 52000,
      totalEstimated: 247000,
      scholarshipAvailable: true,
      notes: "Delhi Government fee waiver schemes applicable for economically weaker sections.",
    },
    ratings: {
      overall: 9.4,
      faculty: 9.2,
      infrastructure: 9.2,
      studentCaliber: 9.4,
      sportsAndExtracurricular: 9.4,
      techLevel: 9.4,
    },
    advantages: [
      "Legendary alumni network across Silicon Valley and Indian corporate sectors",
      "Outstanding campus placement record for Tech and Consulting roles",
      "Vibrant student teams (Defiance Racing, UAS Drone Team, Solar Car)",
      "Prime Delhi location with easy metro access",
    ],
    disadvantages: [
      "Large batch sizes in Computer Science branches",
      "Administrative paperwork can be slower compared to private institutes",
      "Hostel allotment ratio is tighter for local Delhi candidates",
    ],
    placement: {
      status: "verified",
      badgeNotice:
        "Verified Placement: Formally cross-verified with recruitment departments of Amazon, Atlassian, and Adobe.",
      lastYearPlacementRate: 93.8,
      allTimePlacementRate: 91.5,
      averagePackageLPA: 18.2,
      highestPackageLPA: 82.5,
      medianPackageLPA: 16.0,
      topRecruiters: ["Amazon", "Adobe", "Atlassian", "Uber", "Qualcomm", "TCS Digital"],
      students: [
        {
          id: "dtu_st_1",
          studentName: "Priyanshu Bansal",
          company: "Atlassian",
          packageLPA: 57.2,
          year: 2025,
          role: "Associate Software Engineer",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Atlassian HR)",
        },
        {
          id: "dtu_st_2",
          studentName: "Aman Gupta",
          company: "Amazon AWS",
          packageLPA: 45.0,
          year: 2025,
          role: "Cloud Support & SDE",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Amazon Campus Recruitment)",
        },
      ],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: CareerMap Auditors surveyed labs, classrooms, and cafeteria. Random student interactions validated overall high academic rigor.",
      lastAuditDate: "2025-11-04",
      auditTeamSize: 3,
      inspectedLabs: {
        physicsLab: true,
        chemistryLab: true,
        biologyLab: false,
        csDeptLabs: true,
        managementClassrooms: true,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 35,
      topStudentInterviewCount: 12,
      studentFeedbackSummary:
        "Students highlighted incredible coding and tech society culture. Mentioned library air conditioning and seating can get crowded during semester finals.",
      infrastructureVerdict:
        "Sprawling 164-acre lush green campus, modern sports complex, well-equipped IoT and robotics laboratories.",
    },
    photos: [
      {
        id: "dtu_p1",
        category: "campus",
        title: "DTU OAT & Academic Central Complex",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Main open-air theater and surrounding academic blocks",
      },
      {
        id: "dtu_p2",
        category: "labs",
        title: "Computer Center & Advanced Networking Lab",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        type: "ground_reality",
        status: "verified",
        caption: "Audited Ground Reality: High-speed gigabit LAN lab facilities",
      },
    ],
    reviews: [
      {
            "id": "rev_dtu_1",
            "studentName": "Vikram Sethi",
            "studentEmail": "vikram.s@dtu.ac.in",
            "studentRole": "3rd Year IT",
            "ratingOutOf10": 9.4,
            "comment": "164-acre lush green campus in Rohini. Super active tech societies like IEEE, DTU Solar Car, and Defianz Racing. Placements for tech branches are exceptionally strong.",
            "date": "2026-02-01",
            "likes": 22,
            "replies": [
                  {
                        "id": "rev_dtu_1_1",
                        "studentName": "Ananya Roy",
                        "studentEmail": "ananya.r@dtu.ac.in",
                        "studentRole": "2nd Year Software Eng",
                        "ratingOutOf10": 9.2,
                        "comment": "Hostel facilities in new blocks are top tier. Library remains open till late night.",
                        "date": "2026-02-05",
                        "parentReviewId": "rev_dtu_1",
                        "likes": 8,
                        "replies": []
                  }
            ]
      }
],
    rankScore: 94,
    featured: true,
  },
  {
    id: "amity-noida",
    name: "Amity University Uttar Pradesh, Noida",
    shortName: "Amity Noida",
    type: "university",
    levels: ["ug", "pg", "phd", "diploma"],
    streams: [
      "Engineering (B.Tech CS/IT/AI)",
      "Management (BBA/MBA)",
      "Law (BA/BBA LLB)",
      "Design & Architecture",
    ],
    location: {
      city: "Noida",
      state: "Uttar Pradesh",
      area: "Sector 125",
      address: "Amity University Campus, Sector 125, Noida, UP 201313",
      geo: { lat: 28.544, lng: 77.333 },
      googleMapsUrl: "https://maps.google.com/?q=Amity+University+Noida",
    },
    establishedYear: 2005,
    yearsInOperation: 21,
    website: "https://www.amity.edu",
    contact: {
      email: "admissions@amity.edu",
      phone: "+91-120-2445252",
      whatsapp: "+91-9876543212",
    },
    ownershipType: "private",
    institutionCategory: "private",
    totalStudentsEnrolled: 35000,
    seatMatrix: {
      availableSeats: 2100,
      totalSeats: 8000,
    },
    feeStructure: {
      tuitionPerYear: 360000,
      hostelPerYear: 140000,
      totalEstimated: 500000,
      scholarshipAvailable: true,
      notes: "Up to 100% scholarship for high board marks / national entrance percentiles.",
    },
    ratings: {
      overall: 8.4,
      faculty: 8.2,
      infrastructure: 9.8,
      studentCaliber: 7.8,
      sportsAndExtracurricular: 9.6,
      techLevel: 8.8,
    },
    advantages: [
      "Ultra-modern luxury campus with international exchange programs",
      "Vast array of student societies, sports courts, and food courts (H-Block)",
      "Strong corporate relations ensuring large pool of mass & boutique recruiters",
      "Flexible curriculum with foreign language electives",
    ],
    disadvantages: [
      "Placement statistics are self-reported and pending independent employer cross-check",
      "Higher tuition fees compared to public universities",
      "Large student intake creates wide variance in individual student outcomes",
      "Strict 75% attendance criteria enforced rigorously",
    ],
    placement: {
      status: "unverified",
      badgeNotice:
        "⚠️ Unverified Placement: Placement numbers are currently based on institution self-reported claims. Awaiting direct company confirmation.",
      lastYearPlacementRate: 88.5,
      allTimePlacementRate: 85.0,
      averagePackageLPA: 7.2,
      highestPackageLPA: 45.0,
      medianPackageLPA: 6.0,
      topRecruiters: ["Cognizant", "Wipro", "Accenture", "HCL", "Deloitte", "DXC Technology"],
      students: [
        {
          id: "am_st_1",
          studentName: "Kunal Kashyap",
          company: "Cognizant",
          packageLPA: 6.5,
          year: 2025,
          role: "Programmer Analyst",
          verified: false,
          verificationSource: "Institute Self-Reported (Company Verification Pending)",
        },
        {
          id: "am_st_2",
          studentName: "Divya Chauhan",
          company: "Accenture",
          packageLPA: 4.5,
          year: 2025,
          role: "Associate Software Engineer",
          verified: false,
          verificationSource: "Institute Self-Reported (Company Verification Pending)",
        },
      ],
    },
    audit: {
      status: "unverified",
      badgeNotice:
        "⚠️ Pending Audit: Formal on-site physical verification by CareerMap team has been requested. Currently displaying public/curated data.",
      studentSamplingConducted: false,
      randomStudentInterviewCount: 0,
      topStudentInterviewCount: 0,
      infrastructureVerdict:
        "Photos and campus claims indicate state-of-the-art facilities; independent audit pending schedule confirmation.",
    },
    photos: [
      {
        id: "am_p1",
        category: "campus",
        title: "Amity Noida Central Fountain & Promenade",
        url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "unverified",
        caption: "Central campus boulevard and modern faculties",
      },
      {
        id: "am_p2",
        category: "classrooms",
        title: "Amity Business School Tiered Lecture Hall",
        url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "unverified",
        caption: "Air-conditioned amphitheater classrooms with AV controls",
      },
    ],
    reviews: [
      {
            "id": "rev_amity_1",
            "studentName": "Manish Kapoor",
            "studentEmail": "manish.k@s.amity.edu",
            "studentRole": "Final Year BBA",
            "ratingOutOf10": 8.4,
            "comment": "State of the art air-conditioned classrooms, Olympic-sized swimming pool, indoor sports complex, and vibrant campus life. Best suited for students who take personal initiative.",
            "date": "2026-01-18",
            "likes": 14,
            "replies": []
      }
],
    rankScore: 78,
    featured: false,
  },
  {
    id: "coep-pune",
    name: "COEP Technological University (College of Engineering Pune)",
    shortName: "COEP Pune",
    type: "college",
    levels: ["ug", "pg", "phd"],
    streams: [
      "Engineering (B.Tech CS/IT/AI)",
      "Engineering (Mech/Civil/EE)",
    ],
    location: {
      city: "Pune",
      state: "Maharashtra",
      area: "Shivajinagar",
      address: "Wellesley Road, Shivajinagar, Pune 411005",
      geo: { lat: 18.5293, lng: 73.8565 },
      googleMapsUrl: "https://maps.google.com/?q=COEP+Pune",
    },
    establishedYear: 1854,
    yearsInOperation: 172,
    website: "https://www.coeptech.ac.in",
    contact: {
      email: "director@coep.ac.in",
      phone: "+91-20-2550-7000",
      whatsapp: "+91-9876543213",
    },
    ownershipType: "state_govt",
    institutionCategory: "government",
    totalStudentsEnrolled: 5200,
    seatMatrix: {
      availableSeats: 180,
      totalSeats: 900,
    },
    feeStructure: {
      tuitionPerYear: 145000,
      hostelPerYear: 38000,
      totalEstimated: 183000,
      scholarshipAvailable: true,
      notes: "Maharashtra State DTE scholarships applicable for eligible categories.",
    },
    ratings: {
      overall: 9.4,
      faculty: 9.4,
      infrastructure: 9.0,
      studentCaliber: 9.6,
      sportsAndExtracurricular: 9.2,
      techLevel: 9.4,
    },
    advantages: [
      "Second oldest engineering institution in India with storied heritage",
      "Unrivaled placement in core engineering, automotive, and tech firms in Pune/Mumbai hub",
      "Very affordable fee structure for top-tier academic ROI",
      "Independently verified placements with direct employer confirmation",
    ],
    disadvantages: [
      "Historic heritage buildings have limited elevator accessibility in select wings",
      "Maharashtra State MHT-CET quota reserves majority seats for domicile students",
      "Hostel accommodation demand exceeds available rooms",
    ],
    placement: {
      status: "verified",
      badgeNotice:
        "Verified Placement: Independently confirmed directly with Barclay's, Bajaj Auto, and Tata Motors HR teams.",
      lastYearPlacementRate: 94.2,
      allTimePlacementRate: 92.0,
      averagePackageLPA: 14.5,
      highestPackageLPA: 50.5,
      medianPackageLPA: 12.0,
      topRecruiters: ["Barclays", "Bajaj Auto", "Tata Motors", "Mastercard", "Nvidia", "Infosys"],
      students: [
        {
          id: "coep_st_1",
          studentName: "Tanmay Deshmukh",
          company: "Nvidia Pune",
          packageLPA: 36.0,
          year: 2025,
          role: "Hardware & Systems Engineer",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Nvidia Campus Lead)",
        },
        {
          id: "coep_st_2",
          studentName: "Pooja Kulkarni",
          company: "Barclays India",
          packageLPA: 18.5,
          year: 2025,
          role: "Technology Analyst",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Barclays HR)",
        },
      ],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: Complete physical assessment completed by CareerMap team. Laboratories & student feedback validated.",
      lastAuditDate: "2025-09-12",
      auditTeamSize: 3,
      inspectedLabs: {
        physicsLab: true,
        chemistryLab: true,
        biologyLab: false,
        csDeptLabs: true,
        managementClassrooms: false,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 30,
      topStudentInterviewCount: 10,
      studentFeedbackSummary:
        "Students commended rigorous project-based learning and boat club regatta culture. Requested modernization of older civil testing benches.",
      infrastructureVerdict:
        "Historic stone architecture blended with newly added robotic and VLSI laboratories. Riverside boat club and athletic grounds in great shape.",
    },
    photos: [
      {
        id: "coep_p1",
        category: "campus",
        title: "COEP Heritage Main Hall",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Historic Victorian Gothic central heritage building",
      },
      {
        id: "coep_p2",
        category: "grounds",
        title: "COEP Boat Club & Sports Ground",
        url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        type: "ground_reality",
        status: "verified",
        caption: "Audited Ground Reality: Mula river boat club facilities",
      },
    ],
    reviews: [
      {
            "id": "rev_coep_1",
            "studentName": "Tanvi Joshi",
            "studentEmail": "tanvi.j@coep.ac.in",
            "studentRole": "4th Year Mechanical",
            "ratingOutOf10": 9.6,
            "comment": "Heritage institution with incredible industrial ties in Pune's automotive and engineering hub. The student satellite team and boat club on Mula river are legendary.",
            "date": "2026-02-10",
            "likes": 17,
            "replies": []
      }
],
    rankScore: 92,
    featured: true,
  },
  {
    id: "rvce-bangalore",
    name: "RV College of Engineering (RVCE), Bangalore",
    shortName: "RVCE Bangalore",
    type: "college",
    levels: ["ug", "pg"],
    streams: [
      "Engineering (B.Tech CS/IT/AI)",
      "Engineering (Mech/Civil/EE)",
      "Computer Applications (BCA/MCA)",
    ],
    location: {
      city: "Bangalore",
      state: "Karnataka",
      area: "Mysore Road",
      address: "Mysore Road, RV Vidyaniketan Post, Bangalore 560059",
      geo: { lat: 12.9237, lng: 77.4987 },
      googleMapsUrl: "https://maps.google.com/?q=RV+College+of+Engineering+Bangalore",
    },
    establishedYear: 1963,
    yearsInOperation: 63,
    website: "https://www.rvce.edu.in",
    contact: {
      email: "principal@rvce.edu.in",
      phone: "+91-80-6717-8000",
      whatsapp: "+91-9876543214",
    },
    ownershipType: "private",
    institutionCategory: "private",
    totalStudentsEnrolled: 6800,
    seatMatrix: {
      availableSeats: 240,
      totalSeats: 1200,
    },
    feeStructure: {
      tuitionPerYear: 280000,
      hostelPerYear: 85000,
      totalEstimated: 365000,
      scholarshipAvailable: true,
      notes: "KCET subsidized fees for Karnataka residents; COMEDK & Management quota rates apply.",
    },
    ratings: {
      overall: 9.2,
      faculty: 9.2,
      infrastructure: 8.8,
      studentCaliber: 9.4,
      sportsAndExtracurricular: 8.6,
      techLevel: 9.6,
    },
    advantages: [
      "Bangalore Tech Capital proximity ensures 400+ visiting tech recruiters every season",
      "Exceptional coding community & hackathon winning culture",
      "Consistently strong median tech packages comparable to top NITs",
      "Independently verified placement claims with direct company cross-checks",
    ],
    disadvantages: [
      "Academics are fast-paced with frequent continuous internal evaluations (CIE)",
      "Campus is compact (52 acres) compared to suburban residential universities",
      "Management quota seats carry significantly higher capitation charges",
    ],
    placement: {
      status: "verified",
      badgeNotice:
        "Verified Placement: Verified directly with recruiting heads of Cisco, SAP Labs, and Texas Instruments.",
      lastYearPlacementRate: 96.1,
      allTimePlacementRate: 93.8,
      averagePackageLPA: 19.8,
      highestPackageLPA: 62.0,
      medianPackageLPA: 17.5,
      topRecruiters: ["Cisco", "SAP Labs", "Texas Instruments", "Intuit", "Amazon", "PhonePe"],
      students: [
        {
          id: "rv_st_1",
          studentName: "Varun Hegde",
          company: "Cisco Systems",
          packageLPA: 34.0,
          year: 2025,
          role: "Software Consulting Engineer",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Cisco University Relations)",
        },
      ],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: CareerMap Audit Team validated electronics, AI, and cloud laboratories.",
      lastAuditDate: "2025-08-20",
      auditTeamSize: 3,
      inspectedLabs: {
        physicsLab: true,
        chemistryLab: true,
        biologyLab: false,
        csDeptLabs: true,
        managementClassrooms: false,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 28,
      topStudentInterviewCount: 11,
      studentFeedbackSummary:
        "Students appreciated direct internship opportunities during 7th and 8th semester. Noted parking congestion during peak morning hours.",
      infrastructureVerdict:
        "High-density server labs, dedicated semiconductor research room, clean hygienic mess and cafeteria.",
    },
    photos: [
      {
        id: "rv_p1",
        category: "campus",
        title: "RVCE Information Science & Tech Block",
        url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Newly constructed computing and research tower",
      },
    ],
    reviews: [
      {
            "id": "rev_rvce_1",
            "studentName": "Siddharth Rao",
            "studentEmail": "siddharth.r@rvce.edu.in",
            "studentRole": "3rd Year CSE",
            "ratingOutOf10": 9.4,
            "comment": "Located right in India's Silicon Valley. Exceptional placements with tier-1 product companies and startups visiting all year round.",
            "date": "2026-01-28",
            "likes": 21,
            "replies": []
      }
],
    rankScore: 93,
    featured: true,
  },
  // SCHOOLS DATASET (Class 8th to 12th)
  {
    id: "dps-rk-puram",
    name: "Delhi Public School (DPS), R.K. Puram",
    shortName: "DPS R.K. Puram",
    type: "school",
    levels: ["class_8_10", "class_11_12"],
    boards: ["CBSE"],
    streams: [
      "Science (PCM)",
      "Science (PCB)",
      "Commerce",
      "Arts/Humanities",
    ],
    location: {
      city: "New Delhi",
      state: "Delhi",
      area: "R.K. Puram",
      address: "Sector XII, R.K. Puram, New Delhi 110022",
      geo: { lat: 28.5667, lng: 77.1783 },
      googleMapsUrl: "https://maps.google.com/?q=DPS+RK+Puram",
    },
    establishedYear: 1972,
    yearsInOperation: 54,
    website: "https://dpsrkp.net",
    contact: {
      email: "principal@dpsrkp.net",
      phone: "+91-11-4911-5555",
      whatsapp: "+91-9876543215",
    },
    ownershipType: "private",
    institutionCategory: "private",
    totalStudentsEnrolled: 9500,
    seatMatrix: {
      availableSeats: 180,
      totalSeats: 850,
    },
    feeStructure: {
      tuitionPerYear: 185000,
      hostelPerYear: 120000,
      totalEstimated: 305000,
      scholarshipAvailable: true,
      notes: "Fee structure covers all academic activities, computer club (Exun), and standard lab consumables.",
    },
    ratings: {
      overall: 9.8,
      faculty: 9.6,
      infrastructure: 9.6,
      studentCaliber: 9.8,
      sportsAndExtracurricular: 9.8,
      techLevel: 9.8,
    },
    advantages: [
      "Nationally renowned for highest numbers of IIT-JEE, NEET, and AIIMS selections",
      "Exun Clan – Asia's premier high-school technology and computer club with coding contests",
      "Unrivaled holistic extracurriculars: debating, Model United Nations, robotics, performing arts",
      "World-class athletic facilities (Olympic-size swimming pool, turf grounds, squash courts)",
    ],
    disadvantages: [
      "Very high competition level can induce academic stress for young students",
      "Stringent admission entrance cutoffs for Class 9 and Class 11 streams",
      "Large batch sizes requiring student self-discipline",
    ],
    placement: {
      status: "unverified",
      badgeNotice: "Schools prepare students for 10th and 12th Board examinations and premier university entrance tests (JEE, NEET, CUET, NDA). Job placement packages are not applicable.",
      lastYearPlacementRate: 0,
      allTimePlacementRate: 0,
      averagePackageLPA: 0,
      highestPackageLPA: 0,
      medianPackageLPA: 0,
      topRecruiters: ["Top University Admissions", "IITs / AIIMS Entrance", "CUET Premier Colleges", "National Defense Academy (NDA)"],
      students: [],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: CareerMap Team physically inspected Physics, Chemistry, Biology, and AI Labs. Student caliber and sporting grounds confirmed.",
      lastAuditDate: "2025-11-15",
      auditTeamSize: 4,
      inspectedLabs: {
        physicsLab: true,
        chemistryLab: true,
        biologyLab: true,
        csDeptLabs: true,
        managementClassrooms: true,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 45,
      topStudentInterviewCount: 20,
      studentFeedbackSummary:
        "Students love the Exun coding lab and parliamentary debate circles. Teachers offer extensive doubt sessions after regular classes.",
      infrastructureVerdict:
        "State of the art Atal Tinkering Lab, clean chemistry hoods, Olympic swimming pavilion, synthetic athletic track.",
    },
    photos: [
      {
        id: "dps_p1",
        category: "campus",
        title: "DPS RK Puram Central Campus & Lawns",
        url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Main quadrangle with state of the art academic wings",
      },
      {
        id: "dps_p2",
        category: "labs",
        title: "Atal Tinkering & Robotics Laboratory",
        url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        type: "ground_reality",
        status: "verified",
        caption: "Audited Ground Reality: Active student robotics workbenches with 3D printers",
      },
    ],
    reviews: [
      {
            "id": "rev_dps_1",
            "studentName": "Devika Mehra",
            "studentEmail": "devika.m@alumni.dpsrkp.net",
            "studentRole": "Class 12 Alumna (CBSE 98.4%)",
            "ratingOutOf10": 9.8,
            "comment": "Incredible academic grounding. Exun club teaches real software development from 8th grade. Highly disciplined environment with dedicated board faculties.",
            "date": "2026-02-08",
            "likes": 31,
            "replies": []
      }
],
    rankScore: 99,
    featured: true,
  },
  {
    id: "up-model-lucknow",
    name: "Government Inter College / UP Board Model School, Lucknow",
    shortName: "GIC UP Board Lucknow",
    type: "school",
    levels: ["class_8_10", "class_11_12"],
    boards: ["UP Board"],
    streams: ["Science (PCM)", "Science (PCB)", "Commerce", "Arts/Humanities"],
    location: {
      city: "Lucknow",
      state: "Uttar Pradesh",
      area: "Nishatganj",
      address: "Main GIC Road, Nishatganj, Lucknow, UP 226007",
      geo: { lat: 26.8667, lng: 80.95 },
      googleMapsUrl: "https://maps.google.com/?q=Government+Inter+College+Lucknow",
    },
    establishedYear: 1948,
    yearsInOperation: 78,
    website: "https://madhyamikshiksha.up.gov.in",
    contact: {
      email: "gic.lucknow@upgov.in",
      phone: "+91-522-2345678",
      whatsapp: "+91-9876543216",
    },
    ownershipType: "state_govt",
    institutionCategory: "government",
    totalStudentsEnrolled: 3200,
    seatMatrix: {
      availableSeats: 95,
      totalSeats: 450,
    },
    feeStructure: {
      tuitionPerYear: 3200,
      hostelPerYear: 6000,
      totalEstimated: 9200,
      scholarshipAvailable: true,
      notes: "Subsidized government education. Free textbook & mid-day support schemes up to Class 8.",
    },
    ratings: {
      overall: 8.8,
      faculty: 9.0,
      infrastructure: 8.4,
      studentCaliber: 9.2,
      sportsAndExtracurricular: 8.6,
      techLevel: 8.2,
    },
    advantages: [
      "Exceptional value with near-zero tuition cost and qualified permanent civil faculty",
      "Rigorous Hindi and Mathematics foundational syllabus under UP Madhyamik Shiksha Parishad",
      "Strong historical track record in UP State Civil Services (UPPSC) and NDA selections",
      "Very large traditional open playground and green campus",
    ],
    disadvantages: [
      "Laboratory equipment is functional but older generation (manual titration, standard meters)",
      "Smart classroom computers are limited in number per batch",
      "Extracurricular clubs (coding, MUN) depend heavily on student-led initiatives",
    ],
    placement: {
      status: "unverified",
      badgeNotice: "Schools prepare students for 10th and 12th Board examinations and premier university entrance tests (JEE, NEET, CUET, NDA). Job placement packages are not applicable.",
      lastYearPlacementRate: 0,
      allTimePlacementRate: 0,
      averagePackageLPA: 0,
      highestPackageLPA: 0,
      medianPackageLPA: 0,
      topRecruiters: ["Top University Admissions", "IITs / AIIMS Entrance", "CUET Premier Colleges", "National Defense Academy (NDA)"],
      students: [],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: Physical verification completed. Verified faculty qualifications, labs, and student sampling.",
      lastAuditDate: "2025-10-02",
      auditTeamSize: 2,
      inspectedLabs: {
        physicsLab: true,
        chemistryLab: true,
        biologyLab: true,
        csDeptLabs: true,
        managementClassrooms: false,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 30,
      topStudentInterviewCount: 8,
      studentFeedbackSummary:
        "Students praised Mathematics and Physics teachers for exam-oriented conceptual clarity. Suggested upgrading the computer lab internet connection.",
      infrastructureVerdict:
        "Clean traditional brick campus. Spacious playground with active kabaddi, cricket, and athletic tracks. Basic CS lab with 25 working desktop systems.",
    },
    photos: [
      {
        id: "up_p1",
        category: "campus",
        title: "GIC Lucknow Historic Main Entrance",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Historic colonial era red-brick facade and central corridor",
      },
      {
        id: "up_p2",
        category: "labs",
        title: "Physics Mechanics Laboratory",
        url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
        type: "ground_reality",
        status: "verified",
        caption: "Audited Ground Reality: Working optical benches, vernier calipers, and pendulum apparatus",
      },
    ],
    reviews: [
      {
            "id": "rev_up_1",
            "studentName": "Abhishek Yadav",
            "studentEmail": "abhishek.y@gov.in",
            "studentRole": "Class 12th Board Student",
            "ratingOutOf10": 9.0,
            "comment": "Virtually zero fees with very strong state-level faculty. Exceptional physics and chemistry teachers who focus on competitive examinations alongside UP Board syllabus.",
            "date": "2026-01-15",
            "likes": 16,
            "replies": []
      }
],
    rankScore: 82,
    featured: false,
  },
  {
    id: "doon-school",
    name: "The Doon School, Dehradun",
    shortName: "The Doon School",
    type: "school",
    levels: ["class_8_10", "class_11_12"],
    boards: ["ICSE", "IB"],
    streams: ["Science (PCM)", "Science (PCB)", "Commerce", "Arts/Humanities"],
    location: {
      city: "Dehradun",
      state: "Uttarakhand",
      area: "Mall Road",
      address: "The Doon School, Mall Road, Dehradun 248001",
      geo: { lat: 30.334, lng: 78.026 },
      googleMapsUrl: "https://maps.google.com/?q=The+Doon+School+Dehradun",
    },
    establishedYear: 1935,
    yearsInOperation: 91,
    website: "https://www.doonschool.com",
    contact: {
      email: "admissions@doonschool.com",
      phone: "+91-135-252-6400",
      whatsapp: "+91-9876543217",
    },
    ownershipType: "international",
    institutionCategory: "private",
    totalStudentsEnrolled: 520,
    seatMatrix: {
      availableSeats: 35,
      totalSeats: 90,
    },
    feeStructure: {
      tuitionPerYear: 680000,
      hostelPerYear: 520000,
      totalEstimated: 1200000,
      scholarshipAvailable: true,
      notes: "Full boarding institution. Need-based bursaries available up to 100% of fees for qualifying applicants.",
    },
    ratings: {
      overall: 9.6,
      faculty: 9.8,
      infrastructure: 9.8,
      studentCaliber: 9.6,
      sportsAndExtracurricular: 10.0,
      techLevel: 9.2,
    },
    advantages: [
      "India's pre-eminent all-boarding school with unmatched global alumni leadership network",
      "70-acre estate with world-standard sports pavilions, shooting ranges, and art conservatories",
      "Dual curriculum choice: ICSE/ISC and International Baccalaureate (IB) Diploma",
      "Emphasis on character, public service, environmental expeditions, and leadership",
    ],
    disadvantages: [
      "High annual boarding fee structure",
      "Exclusively all-boarding environment with strict residential regimen",
      "Boys-only enrollment model for residential school",
    ],
    placement: {
      status: "unverified",
      badgeNotice: "Schools prepare students for 10th and 12th Board examinations and premier university entrance tests (JEE, NEET, CUET, NDA). Job placement packages are not applicable.",
      lastYearPlacementRate: 0,
      allTimePlacementRate: 0,
      averagePackageLPA: 0,
      highestPackageLPA: 0,
      medianPackageLPA: 0,
      topRecruiters: ["Top University Admissions", "IITs / AIIMS Entrance", "CUET Premier Colleges", "National Defense Academy (NDA)"],
      students: [],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: CareerMap Audit Team spent 2 days evaluating residential boarding houses, dining halls, labs, and sports arenas.",
      lastAuditDate: "2025-10-25",
      auditTeamSize: 4,
      inspectedLabs: {
        physicsLab: true,
        chemistryLab: true,
        biologyLab: true,
        csDeptLabs: true,
        managementClassrooms: true,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 40,
      topStudentInterviewCount: 15,
      studentFeedbackSummary:
        "Students praised master-student mentorship, outdoor mountaineering expeditions, and school governance council. Zero tolerance for bullying.",
      infrastructureVerdict:
        "World-class Kilachand Library, modern chemistry and astronomy observatory, sprawling Rose Bowl amphitheater.",
    },
    photos: [
      {
        id: "doon_p1",
        category: "campus",
        title: "The Doon School Chandbagh Estate",
        url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Historic Chandbagh campus surrounded by mountain greenery",
      },
    ],
    reviews: [
      {
            "id": "rev_doon_1",
            "studentName": "Kabir Thapar",
            "studentEmail": "kabir.t@alumni.doonschool.com",
            "studentRole": "Old Boy / Alumnus",
            "ratingOutOf10": 9.8,
            "comment": "70-acre campus in Dehradun valley. Unrivaled character building, public speaking, mountaineering expeditions, and global university counselling.",
            "date": "2026-01-12",
            "likes": 25,
            "replies": []
      }
],
    rankScore: 97,
    featured: true,
  },
  {
    id: "srcc-delhi",
    name: "Shri Ram College of Commerce (SRCC), Delhi University",
    shortName: "SRCC Delhi",
    type: "college",
    levels: ["ug", "pg"],
    streams: ["Commerce", "Management (BBA/MBA)"],
    location: {
      city: "New Delhi",
      state: "Delhi",
      area: "North Campus",
      address: "University of Delhi, Maurice Nagar, Delhi 110007",
      geo: { lat: 28.6926, lng: 77.2144 },
      googleMapsUrl: "https://maps.google.com/?q=SRCC+Delhi",
    },
    establishedYear: 1926,
    yearsInOperation: 100,
    website: "https://www.srcc.edu",
    contact: {
      email: "principaloffice@srcc.du.ac.in",
      phone: "+91-11-2766-7905",
      whatsapp: "+91-9876543218",
    },
    ownershipType: "central_govt",
    institutionCategory: "government",
    totalStudentsEnrolled: 2800,
    seatMatrix: {
      availableSeats: 110,
      totalSeats: 650,
    },
    feeStructure: {
      tuitionPerYear: 32000,
      hostelPerYear: 45000,
      totalEstimated: 77000,
      scholarshipAvailable: true,
      notes: "Central University highly subsidized fee structure with multiple merit endowments.",
    },
    ratings: {
      overall: 9.8,
      faculty: 9.8,
      infrastructure: 9.2,
      studentCaliber: 10.0,
      sportsAndExtracurricular: 9.4,
      techLevel: 9.2,
    },
    advantages: [
      "Asia's foremost commerce and economics institute; unmatched finance placements",
      "Top global investment banks and MBB consultancies (McKinsey, BCG, Bain) recruit annually",
      "Very low tuition fees providing astronomical return on investment",
      "Verified corporate recruitment data confirmed with top consulting HR offices",
    ],
    disadvantages: [
      "Extremely narrow CUET cutoff percentiles (Top 99.8%+ in Commerce/Math)",
      "Focus is specialized on Commerce and Economics (no STEM/Tech degrees)",
      "Limited on-campus hostel seats; majority students arrange PG in Hudson Lane/Kamla Nagar",
    ],
    placement: {
      status: "verified",
      badgeNotice:
        "Verified Placement: Verified directly with recruiting partners at McKinsey & Co, Bain & Company, and DE Shaw.",
      lastYearPlacementRate: 96.8,
      allTimePlacementRate: 95.2,
      averagePackageLPA: 12.8,
      highestPackageLPA: 35.0,
      medianPackageLPA: 11.5,
      topRecruiters: [
        "McKinsey & Company",
        "Bain & Company",
        "Boston Consulting Group",
        "DE Shaw",
        "Deloitte USI",
        "KPMG",
      ],
      students: [
        {
          id: "srcc_st_1",
          studentName: "Ananya Singhania",
          company: "Bain & Company",
          packageLPA: 24.0,
          year: 2025,
          role: "Associate Consultant",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (Bain Campus Recruiting)",
        },
        {
          id: "srcc_st_2",
          studentName: "Hardik Agarwal",
          company: "DE Shaw India",
          packageLPA: 22.5,
          year: 2025,
          role: "Financial Analyst",
          verified: true,
          verificationSource: "Direct Corporate Confirmation (DE Shaw Talent Acquisition)",
        },
      ],
    },
    audit: {
      status: "verified",
      badgeNotice:
        "Verified On-Site Campus Audit: CareerMap Audit Team validated central air-conditioned library, computer analytics lab, and sports arena.",
      lastAuditDate: "2025-11-10",
      auditTeamSize: 3,
      inspectedLabs: {
        physicsLab: false,
        chemistryLab: false,
        biologyLab: false,
        csDeptLabs: true,
        managementClassrooms: true,
        sportsGrounds: true,
      },
      studentSamplingConducted: true,
      randomStudentInterviewCount: 38,
      topStudentInterviewCount: 14,
      studentFeedbackSummary:
        "Students praised student-run investment cell, consulting club, and case study competitions. Highlighted excellent corporate readiness training.",
      infrastructureVerdict:
        "Fully air-conditioned campus, Bloomberg terminal equipped finance laboratory, Commonwealth Games standard indoor sports complex.",
    },
    photos: [
      {
        id: "srcc_p1",
        category: "campus",
        title: "SRCC Main Red-Brick Campus & Quadrangle",
        url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        type: "highlight",
        status: "verified",
        caption: "Iconic red brick architecture in Maurice Nagar North Campus",
      },
    ],
    reviews: [
      {
            "id": "rev_srcc_1",
            "studentName": "Ishita Saxena",
            "studentEmail": "ishita.s@srcc.du.ac.in",
            "studentRole": "3rd Year B.Com (Hons)",
            "ratingOutOf10": 9.8,
            "comment": "India's premier commerce institution. Marquee consulting firms (McKinsey, BCG, Bain) and investment banks recruit every year. Peer group is 99+ percentile in CUET.",
            "date": "2026-02-11",
            "likes": 29,
            "replies": []
      }
],
    rankScore: 96,
    featured: true,
  },
];

// Local Storage Keys for User & Admin Mutations
const INSTITUTES_STORAGE_KEY = "cm_institutes_data_v2";
const VERIFICATION_REQUESTS_KEY = "cm_verification_requests_v2";
const AUDIT_REQUESTS_KEY = "cm_audit_requests_v2";
const NEW_INSTITUTES_KEY = "cm_new_institute_requests_v2";
const STUDENT_APPLICATIONS_KEY = "cm_student_applications_v2";

export function loadInstitutes(): Institute[] {
  try {
    const raw = localStorage.getItem(INSTITUTES_STORAGE_KEY);
    if (!raw) {
      saveInstitutes(initialInstitutes);
      return initialInstitutes;
    }
    const list: Institute[] = JSON.parse(raw);
    let modified = false;

    // Migrate any legacy data from local storage
    list.forEach((inst) => {
      // 1. Migrate rating scale (if ratings <= 5.0, multiply by 2 for 10.0 scale)
      if (inst.ratings && inst.ratings.overall <= 5.0) {
        inst.ratings.overall = Math.round(inst.ratings.overall * 2 * 10) / 10;
        inst.ratings.faculty = Math.round(inst.ratings.faculty * 2 * 10) / 10;
        inst.ratings.infrastructure = Math.round(inst.ratings.infrastructure * 2 * 10) / 10;
        inst.ratings.studentCaliber = Math.round(inst.ratings.studentCaliber * 2 * 10) / 10;
        inst.ratings.sportsAndExtracurricular = Math.round(inst.ratings.sportsAndExtracurricular * 2 * 10) / 10;
        inst.ratings.techLevel = Math.round(inst.ratings.techLevel * 2 * 10) / 10;
        modified = true;
      }
      // 2. Ensure ownership fields
      if (!inst.ownershipType) {
        inst.ownershipType = inst.name.toLowerCase().includes("iit") || inst.name.toLowerCase().includes("srcc") ? "central_govt" : inst.type === "school" ? "private" : "state_govt";
        modified = true;
      }
      if (!inst.institutionCategory) {
        inst.institutionCategory = inst.ownershipType === "private" || inst.ownershipType === "international" ? "private" : "government";
        modified = true;
      }
      if (!inst.totalStudentsEnrolled) {
        inst.totalStudentsEnrolled = inst.type === "school" ? 4500 : 9200;
        modified = true;
      }
      if (!inst.seatMatrix) {
        inst.seatMatrix = { availableSeats: Math.floor(inst.totalStudentsEnrolled * 0.15), totalSeats: Math.floor(inst.totalStudentsEnrolled * 0.25) };
        modified = true;
      }
      // 3. Ensure reviews array
      if (!inst.reviews) {
        inst.reviews = [];
        modified = true;
      }
      // 4. For schools, clear placement job records
      if (inst.type === "school" && inst.placement && inst.placement.students && inst.placement.students.length > 0) {
        inst.placement.students = [];
        inst.placement.lastYearPlacementRate = 0;
        inst.placement.allTimePlacementRate = 0;
        inst.placement.averagePackageLPA = 0;
        inst.placement.badgeNotice = "Schools focus on 10th and 12th Board examinations and premier university entrance tests. Job placement packages are not applicable.";
        modified = true;
      }
    });

    if (modified) {
      saveInstitutes(list);
    }
    return list;
  } catch {
    return initialInstitutes;
  }
}

export function saveInstitutes(institutes: Institute[]): void {
  localStorage.setItem(INSTITUTES_STORAGE_KEY, JSON.stringify(institutes));
}

export function getInstituteById(id: string): Institute | undefined {
  const all = loadInstitutes();
  return all.find((inst) => inst.id === id);
}

// Filters & Query Helpers
export interface InstituteFilterOptions {
  type?: "all" | "college" | "school" | "university";
  level?: "all" | EducationLevel;
  board?: "all" | BoardType;
  stream?: "all" | StreamType;
  city?: "all" | string;
  cities?: string[];
  ownership?: "all" | OwnershipType;
  category?: "all" | InstitutionCategory;
  minPlacementStatus?: "all" | "verified_only";
  auditStatus?: "all" | "verified_only";
  maxFee?: number;
  searchQuery?: string;
  sortBy?: "rank" | "fee_low" | "placement" | "rating";
}

export function queryInstitutes(filters: InstituteFilterOptions): Institute[] {
  let list = loadInstitutes();

  if (filters.searchQuery) {
    const q = sanitizeInput(filters.searchQuery.toLowerCase());
    list = list.filter(
      (inst) =>
        inst.name.toLowerCase().includes(q) ||
        inst.shortName.toLowerCase().includes(q) ||
        inst.location.city.toLowerCase().includes(q) ||
        inst.location.area.toLowerCase().includes(q) ||
        inst.streams.some((s) => s.toLowerCase().includes(q))
    );
  }

  if (filters.type && filters.type !== "all") {
    list = list.filter((inst) => inst.type === filters.type);
  }

  if (filters.level && filters.level !== "all") {
    list = list.filter((inst) => inst.levels.includes(filters.level as EducationLevel));
  }

  if (filters.board && filters.board !== "all") {
    list = list.filter((inst) => inst.boards?.includes(filters.board as BoardType));
  }

  if (filters.stream && filters.stream !== "all") {
    list = list.filter((inst) => inst.streams.includes(filters.stream as StreamType));
  }

  if (filters.cities && filters.cities.length > 0 && !filters.cities.includes("all")) {
    const citySet = new Set(filters.cities.map((c) => c.toLowerCase()));
    list = list.filter((inst) => citySet.has(inst.location.city.toLowerCase()));
  } else if (filters.city && filters.city !== "all") {
    list = list.filter((inst) => inst.location.city.toLowerCase() === filters.city?.toLowerCase());
  }

  if (filters.ownership && filters.ownership !== "all") {
    list = list.filter((inst) => inst.ownershipType === filters.ownership);
  }

  if (filters.category && filters.category !== "all") {
    list = list.filter((inst) => inst.institutionCategory === filters.category);
  }

  if (filters.minPlacementStatus === "verified_only") {
    list = list.filter((inst) => inst.placement.status === "verified");
  }

  if (filters.auditStatus === "verified_only") {
    list = list.filter((inst) => inst.audit.status === "verified");
  }

  if (filters.maxFee && filters.maxFee > 0) {
    list = list.filter((inst) => inst.feeStructure.tuitionPerYear <= filters.maxFee!);
  }

  // Sorting
  if (filters.sortBy === "fee_low") {
    list.sort((a, b) => a.feeStructure.tuitionPerYear - b.feeStructure.tuitionPerYear);
  } else if (filters.sortBy === "placement") {
    list.sort((a, b) => b.placement.averagePackageLPA - a.placement.averagePackageLPA);
  } else if (filters.sortBy === "rating") {
    list.sort((a, b) => b.ratings.overall - a.ratings.overall);
  } else {
    // Default rank
    list.sort((a, b) => b.rankScore - a.rankScore);
  }

  return list;
}

// Side-by-Side Comparison Generator
export interface ComparisonResult {
  institutes: Institute[];
  verdict: {
    winnerId: string;
    summary: string;
    categoryWins: {
      placement: string;
      fees: string;
      infrastructure: string;
      academics: string;
    };
  };
}

export function compareInstitutes(ids: string[]): ComparisonResult {
  const institutes = ids
    .map((id) => getInstituteById(id))
    .filter((inst): inst is Institute => !!inst);

  if (institutes.length === 0) {
    throw new Error("No valid institutes selected for comparison.");
  }

  // Determine Category Leaders
  const placementLeader = [...institutes].sort(
    (a, b) => b.placement.averagePackageLPA - a.placement.averagePackageLPA
  )[0];

  const feeLeader = [...institutes].sort(
    (a, b) => a.feeStructure.tuitionPerYear - b.feeStructure.tuitionPerYear
  )[0];

  const infraLeader = [...institutes].sort(
    (a, b) => b.ratings.infrastructure - a.ratings.infrastructure
  )[0];

  const academicLeader = [...institutes].sort(
    (a, b) => b.ratings.faculty - a.ratings.faculty
  )[0];

  const overallLeader = [...institutes].sort((a, b) => b.rankScore - a.rankScore)[0];

  const summary =
    institutes.length === 2
      ? `${overallLeader.name} takes the lead with higher overall rank (${overallLeader.rankScore}/100) and ${
          overallLeader.id === placementLeader.id ? "superior placement metrics" : "academic faculty reputation"
        }, whereas ${
          institutes.find((i) => i.id !== overallLeader.id)?.name
        } offers ${feeLeader.id !== overallLeader.id ? "a more budget-friendly fee structure" : "distinctive campus advantages"}.`
      : `Comparison between ${institutes.length} institutions indicates ${overallLeader.name} provides the strongest balance of career outcomes and academic rigor.`;

  return {
    institutes,
    verdict: {
      winnerId: overallLeader.id,
      summary,
      categoryWins: {
        placement: placementLeader.name,
        fees: feeLeader.name,
        infrastructure: infraLeader.name,
        academics: academicLeader.name,
      },
    },
  };
}

// Student Score / Marks Guidance Analyzer
export interface StudentRecommendation {
  strongAreas: string[];
  recommendedBoards: BoardType[];
  recommendedStreams: StreamType[];
  careerPaths: string[];
  suggestedInstitutes: Institute[];
}

export function analyzeStudentMarksAndPreferences(input: {
  currentClass: "class_8" | "class_10" | "class_12";
  mathScore: number;
  scienceScore: number;
  englishScore: number;
  socialScore: number;
  techInterest: boolean;
  sportsInterest: boolean;
  businessInterest: boolean;
  medicalInterest: boolean;
  budgetPerYear?: number;
}): StudentRecommendation {
  const strongAreas: string[] = [];
  const recommendedBoards: BoardType[] = [];
  const recommendedStreams: StreamType[] = [];
  const careerPaths: string[] = [];

  if (input.mathScore >= 80) strongAreas.push("Analytical & Mathematical Problem Solving");
  if (input.scienceScore >= 80) strongAreas.push("Scientific Reasoning & Laboratory Research");
  if (input.englishScore >= 80) strongAreas.push("Verbal Fluency & Communication");
  if (input.socialScore >= 80) strongAreas.push("Social Humanities & Critical Perspectives");

  if (input.currentClass === "class_8") {
    // Board Guidance
    if (input.techInterest || input.mathScore >= 85) {
      recommendedBoards.push("CBSE");
      careerPaths.push("Software Engineering", "AI Research", "Robotics");
    }
    if (input.englishScore >= 85 || input.socialScore >= 85) {
      recommendedBoards.push("ICSE");
      careerPaths.push("Law & Judiciary", "Civil Services", "Corporate Communications");
    }
    if (input.budgetPerYear && input.budgetPerYear < 20000) {
      recommendedBoards.push("UP Board", "State Board");
      careerPaths.push("Government Defense Services (NDA)", "State Engineering & Civil Services");
    } else {
      recommendedBoards.push("CBSE", "ICSE");
    }
  }

  // Stream Guidance
  if (input.mathScore >= 75 && (input.techInterest || input.scienceScore >= 70)) {
    recommendedStreams.push("Science (PCM)", "Engineering (B.Tech CS/IT/AI)");
  }
  if (input.scienceScore >= 75 && input.medicalInterest) {
    recommendedStreams.push("Science (PCB)", "Medical & Healthcare (MBBS/BDS)");
    careerPaths.push("Doctor (MBBS)", "Biotechnologist", "Pharmacologist");
  }
  if (input.businessInterest || (input.mathScore >= 70 && input.socialScore >= 70)) {
    recommendedStreams.push("Commerce", "Management (BBA/MBA)");
    careerPaths.push("Chartered Accountant (CA)", "Investment Banker", "Corporate Strategist");
  }
  if (input.socialScore >= 75 || input.englishScore >= 75) {
    recommendedStreams.push("Arts/Humanities", "Law (BA/BBA LLB)");
    careerPaths.push("Civil Services (UPSC IAS/IPS)", "Corporate Lawyer", "Journalist");
  }

  // Default fallbacks if empty
  if (recommendedStreams.length === 0) recommendedStreams.push("Science (PCM)", "Commerce");
  if (recommendedBoards.length === 0) recommendedBoards.push("CBSE");

  const suggestedInstitutes = loadInstitutes().filter((inst) =>
    inst.streams.some((s) => recommendedStreams.includes(s))
  );

  return {
    strongAreas,
    recommendedBoards,
    recommendedStreams,
    careerPaths,
    suggestedInstitutes: suggestedInstitutes.slice(0, 4),
  };
}

// Request Submissions
export function submitPlacementVerificationRequest(req: Omit<PlacementVerificationRequest, "id" | "createdAt" | "status">): PlacementVerificationRequest {
  const raw = localStorage.getItem(VERIFICATION_REQUESTS_KEY);
  const list: PlacementVerificationRequest[] = raw ? JSON.parse(raw) : [];

  const newReq: PlacementVerificationRequest = {
    ...req,
    id: "pv_" + Date.now(),
    contactPerson: sanitizeInput(req.contactPerson),
    officialEmail: sanitizeInput(req.officialEmail),
    phone: sanitizeInput(req.phone),
    whatsapp: sanitizeInput(req.whatsapp),
    companyContactDetails: sanitizeInput(req.companyContactDetails),
    notes: sanitizeInput(req.notes),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  list.unshift(newReq);
  localStorage.setItem(VERIFICATION_REQUESTS_KEY, JSON.stringify(list));
  logSecurityEvent("PLACEMENT_VERIFY_REQUESTED", "verification", "info", `Verification request submitted for ${req.instituteName}`);
  return newReq;
}

export function getPlacementVerificationRequests(): PlacementVerificationRequest[] {
  try {
    const raw = localStorage.getItem(VERIFICATION_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function updatePlacementVerificationRequestStatus(id: string, status: PlacementVerificationRequest["status"]): void {
  const list = getPlacementVerificationRequests();
  const item = list.find((r) => r.id === id);
  if (item) {
    item.status = status;
    localStorage.setItem(VERIFICATION_REQUESTS_KEY, JSON.stringify(list));
    logSecurityEvent("PLACEMENT_REQUEST_STATUS_UPDATED", "verification", "info", `Request ${id} updated to ${status}`);
  }
}

export function submitOnSiteAuditRequest(req: Omit<OnSiteAuditRequest, "id" | "createdAt" | "status">): OnSiteAuditRequest {
  const raw = localStorage.getItem(AUDIT_REQUESTS_KEY);
  const list: OnSiteAuditRequest[] = raw ? JSON.parse(raw) : [];

  const newReq: OnSiteAuditRequest = {
    ...req,
    id: "audit_" + Date.now(),
    contactPerson: sanitizeInput(req.contactPerson),
    officialEmail: sanitizeInput(req.officialEmail),
    phone: sanitizeInput(req.phone),
    whatsapp: sanitizeInput(req.whatsapp),
    notes: sanitizeInput(req.notes),
    status: "pending_review",
    createdAt: new Date().toISOString(),
  };

  list.unshift(newReq);
  localStorage.setItem(AUDIT_REQUESTS_KEY, JSON.stringify(list));
  logSecurityEvent("CAMPUS_AUDIT_REQUESTED", "verification", "info", `Campus audit booked for ${req.instituteName} on ${req.preferredAuditDate}`);
  return newReq;
}

export function getOnSiteAuditRequests(): OnSiteAuditRequest[] {
  try {
    const raw = localStorage.getItem(AUDIT_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function updateOnSiteAuditStatus(id: string, status: OnSiteAuditRequest["status"]): void {
  const list = getOnSiteAuditRequests();
  const item = list.find((r) => r.id === id);
  if (item) {
    item.status = status;
    localStorage.setItem(AUDIT_REQUESTS_KEY, JSON.stringify(list));
    logSecurityEvent("AUDIT_STATUS_UPDATED", "verification", "info", `Audit request ${id} updated to ${status}`);
  }
}

export function submitNewInstituteRequest(req: Omit<NewInstituteRequest, "id" | "createdAt" | "status">): NewInstituteRequest {
  const raw = localStorage.getItem(NEW_INSTITUTES_KEY);
  const list: NewInstituteRequest[] = raw ? JSON.parse(raw) : [];

  const newReq: NewInstituteRequest = {
    ...req,
    id: "new_inst_" + Date.now(),
    instituteName: sanitizeInput(req.instituteName),
    locationName: sanitizeInput(req.locationName),
    exactGeolocation: sanitizeInput(req.exactGeolocation),
    website: sanitizeInput(req.website),
    officialEmail: sanitizeInput(req.officialEmail),
    contactPhone: sanitizeInput(req.contactPhone),
    streamsOffered: sanitizeInput(req.streamsOffered),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  list.unshift(newReq);
  localStorage.setItem(NEW_INSTITUTES_KEY, JSON.stringify(list));
  logSecurityEvent("NEW_INSTITUTE_SUBMITTED", "data_mutation", "info", `New institute onboarding submission for ${req.instituteName}`);
  return newReq;
}

export function getNewInstituteRequests(): NewInstituteRequest[] {
  try {
    const raw = localStorage.getItem(NEW_INSTITUTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function approveNewInstituteRequest(id: string): Institute | null {
  const list = getNewInstituteRequests();
  const target = list.find((item) => item.id === id);
  if (!target) return null;

  target.status = "approved";
  localStorage.setItem(NEW_INSTITUTES_KEY, JSON.stringify(list));

  const allInstitutes = loadInstitutes();
  const created: Institute = {
    id: target.instituteName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4),
    name: target.instituteName,
    shortName: target.instituteName.split(" ")[0],
    type: target.type,
    levels: target.type === "school" ? ["class_8_10", "class_11_12"] : ["ug", "pg"],
    boards: target.type === "school" ? ["CBSE"] : undefined,
    streams: ["Science (PCM)", "Commerce", "Engineering (B.Tech CS/IT/AI)"],
    location: {
      city: target.locationName,
      state: "India",
      area: target.locationName,
      address: target.locationName,
      geo: { lat: 28.6, lng: 77.2 },
      googleMapsUrl: target.exactGeolocation.startsWith("http")
        ? target.exactGeolocation
        : `https://maps.google.com/?q=${encodeURIComponent(target.instituteName)}`,
    },
    establishedYear: target.establishedYear,
    yearsInOperation: new Date().getFullYear() - target.establishedYear,
    website: target.website,
    contact: {
      email: target.officialEmail,
      phone: target.contactPhone,
      whatsapp: target.contactPhone,
    },
    ownershipType: "private",
    institutionCategory: "private",
    totalStudentsEnrolled: target.type === "school" ? 3000 : 6000,
    seatMatrix: {
      availableSeats: 150,
      totalSeats: 600,
    },
    reviews: [],
    feeStructure: {
      tuitionPerYear: target.type === "school" ? 85000 : 180000,
      totalEstimated: target.type === "school" ? 85000 : 180000,
      scholarshipAvailable: true,
      notes: "Newly onboarded institution profile pending detailed fee verification.",
    },
    ratings: {
      overall: 8.0,
      faculty: 4.0,
      infrastructure: 4.0,
      studentCaliber: 4.0,
      sportsAndExtracurricular: 4.0,
      techLevel: 4.0,
    },
    advantages: ["Newly onboarded institution directly verified with administration"],
    disadvantages: ["Detailed placement history currently undergoing independent corporate verification"],
    placement: {
      status: "unverified",
      badgeNotice: "⚠️ Unverified Placement: Newly listed institute. Independent placement cross-check pending.",
      lastYearPlacementRate: 80,
      allTimePlacementRate: 75,
      averagePackageLPA: 5.5,
      highestPackageLPA: 14.0,
      medianPackageLPA: 5.0,
      topRecruiters: [],
      students: [],
    },
    audit: {
      status: "unverified",
      badgeNotice: "⚠️ Pending Audit: Formal on-site verification not yet performed.",
      studentSamplingConducted: false,
      randomStudentInterviewCount: 0,
      topStudentInterviewCount: 0,
    },
    photos: [],
    rankScore: 75,
    featured: false,
  };

  allInstitutes.unshift(created);
  saveInstitutes(allInstitutes);
  logSecurityEvent("INSTITUTE_APPROVED", "data_mutation", "info", `New institute '${created.name}' published by Admin.`);
  return created;
}

export function submitDirectStudentApplication(app: Omit<DirectApplication, "id" | "createdAt" | "status">): DirectApplication {
  const raw = localStorage.getItem(STUDENT_APPLICATIONS_KEY);
  const list: DirectApplication[] = raw ? JSON.parse(raw) : [];

  const newApp: DirectApplication = {
    ...app,
    id: "app_" + Date.now(),
    studentName: sanitizeInput(app.studentName),
    studentEmail: sanitizeInput(app.studentEmail),
    studentPhone: sanitizeInput(app.studentPhone),
    desiredCourseOrGrade: sanitizeInput(app.desiredCourseOrGrade),
    lastAcademicScore: sanitizeInput(app.lastAcademicScore),
    message: sanitizeInput(app.message),
    status: "received",
    createdAt: new Date().toISOString(),
  };

  list.unshift(newApp);
  localStorage.setItem(STUDENT_APPLICATIONS_KEY, JSON.stringify(list));
  logSecurityEvent("STUDENT_APPLICATION_SUBMITTED", "data_mutation", "info", `Student application for ${app.instituteName} from ${app.studentName}`);
  return newApp;
}

export function getDirectStudentApplications(): DirectApplication[] {
  try {
    const raw = localStorage.getItem(STUDENT_APPLICATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}


// Student Reviews Subsystem
export function addInstituteReview(
  instituteId: string,
  review: {
    studentName: string;
    studentEmail: string;
    studentRole?: string;
    ratingOutOf10: number;
    comment: string;
    parentReviewId?: string;
  }
): InstituteReview {
  const institutes = loadInstitutes();
  const inst = institutes.find((i) => i.id === instituteId);
  if (!inst) throw new Error("Institute not found");

  const newReview: InstituteReview = {
    id: "rev_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    studentName: sanitizeInput(review.studentName),
    studentEmail: sanitizeInput(review.studentEmail),
    studentRole: sanitizeInput(review.studentRole || "Student"),
    ratingOutOf10: Math.min(10, Math.max(1, review.ratingOutOf10)),
    comment: sanitizeInput(review.comment),
    date: new Date().toISOString().split("T")[0],
    parentReviewId: review.parentReviewId,
    replies: [],
    likes: 0,
  };

  if (!inst.reviews) inst.reviews = [];

  if (review.parentReviewId) {
    // Nested reply: find parent review recursively
    const addToParent = (list: InstituteReview[]): boolean => {
      for (const r of list) {
        if (r.id === review.parentReviewId) {
          if (!r.replies) r.replies = [];
          r.replies.push(newReview);
          return true;
        }
        if (r.replies && r.replies.length > 0) {
          if (addToParent(r.replies)) return true;
        }
      }
      return false;
    };

    const added = addToParent(inst.reviews);
    if (!added) {
      inst.reviews.unshift(newReview);
    }
  } else {
    inst.reviews.unshift(newReview);
  }

  // Recalculate average rating if ratings available
  const allRatings: number[] = [];
  const collectRatings = (list: InstituteReview[]) => {
    list.forEach((r) => {
      allRatings.push(r.ratingOutOf10);
      if (r.replies) collectRatings(r.replies);
    });
  };
  collectRatings(inst.reviews);
  if (allRatings.length > 0) {
    const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
    inst.ratings.overall = Math.round(avg * 10) / 10;
  }

  saveInstitutes(institutes);
  logSecurityEvent("REVIEW_POSTED", "data_mutation", "info", `Student review posted for ${inst.name} by ${newReview.studentName}`);
  return newReview;
}

export function likeInstituteReview(instituteId: string, reviewId: string): void {
  const institutes = loadInstitutes();
  const inst = institutes.find((i) => i.id === instituteId);
  if (!inst || !inst.reviews) return;

  const likeInList = (list: InstituteReview[]): boolean => {
    for (const r of list) {
      if (r.id === reviewId) {
        r.likes = (r.likes || 0) + 1;
        return true;
      }
      if (r.replies && r.replies.length > 0) {
        if (likeInList(r.replies)) return true;
      }
    }
    return false;
  };

  likeInList(inst.reviews);
  saveInstitutes(institutes);
}

export function updateInstitute(updated: Institute): void {
  const institutes = loadInstitutes();
  const index = institutes.findIndex((i) => i.id === updated.id);
  if (index !== -1) {
    institutes[index] = updated;
    saveInstitutes(institutes);
    logSecurityEvent("INSTITUTE_UPDATED", "data_mutation", "info", `Institute '${updated.name}' updated by Admin.`);
  }
}

export function deleteInstitute(id: string): void {
  const institutes = loadInstitutes();
  const filtered = institutes.filter((i) => i.id !== id);
  saveInstitutes(filtered);
  logSecurityEvent("INSTITUTE_DELETED", "data_mutation", "warning", `Institute '${id}' deleted by Admin.`);
}
