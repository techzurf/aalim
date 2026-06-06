export interface Aalim {
  id: string;
  name: string;
  title: string;
  district: string;
  madrasa: string;
  experience: string;
  certificates: string[];
  audioSample: string;
  status: 'Pending' | 'Verified' | 'Suspended';
  regDate: string;
  avatar: string;
  isPremium: boolean;
}

export interface Masjid {
  id: string;
  name: string;
  jamathName: string;
  location: string;
  regDoc: string;
  contact: string;
  status: 'Pending' | 'Verified' | 'Suspended';
  regDate: string;
  isPremium: boolean;
  photos: string[];
}

export interface Madrasa {
  id: string;
  name: string;
  location: string;
  contact: string;
  status: 'Verified' | 'Pending';
  regDate: string;
}

export interface JobPosting {
  id: string;
  position: string;
  masjidName: string;
  location: string;
  salary: string;
  postedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  isFeatured: boolean;
}

export interface JobApplication {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  position: string;
  masjidName: string;
  status: 'Pending' | 'Selected' | 'Rejected' | 'Active';
}

export interface SupportTicket {
  id: string;
  userName: string;
  userType: 'Aalim' | 'Masjid';
  issueCategory: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Pending' | 'Closed';
  date: string;
  chats: { sender: 'user' | 'admin'; text: string; time: string }[];
}

export interface Transaction {
  id: string;
  user: string;
  amount: number;
  plan: 'Basic Verification' | 'Premium Quarterly' | 'Premium Institutional Annual';
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  actionPerformed: string;
  timestamp: string;
  moduleAccessed: string;
}

export interface HomeBanner {
  id: string;
  title: string;
  subtitle: string;
  actionText: string;
  isActive: boolean;
}

export const INITIAL_AALIMS: Aalim[] = [
  {
    id: 'A1',
    name: 'Moulana Hazrat Rizwan Al-Qasimi',
    title: 'Senior Imam & Khateeb',
    district: 'Chennai',
    madrasa: 'Darul Uloom Deoband',
    experience: '12 Years',
    certificates: ['Alim-Sanad-2014.pdf', 'Tajweed-Hifz-Diploma.pdf'],
    audioSample: 'surah_rahman_qirat.mp3',
    status: 'Verified',
    regDate: '2026-03-12',
    avatar: 'R',
    isPremium: true
  },
  {
    id: 'A2',
    name: 'Hafez Muhammad Farook',
    title: 'Hifz Instructor & Qari',
    district: 'Madurai',
    madrasa: 'Madrasa Kashiful Huda',
    experience: '6 Years',
    certificates: ['Hifz-Certificate-Kashiful.pdf'],
    audioSample: 'surah_yaseen_farook.wav',
    status: 'Pending',
    regDate: '2026-06-02',
    avatar: 'F',
    isPremium: false
  },
  {
    id: 'A3',
    name: 'Moulvi Abdul Malik Azhari',
    title: 'Arabic Literature Professor',
    district: 'Trichy',
    madrasa: 'Al-Azhar University, Cairo',
    experience: '8 Years',
    certificates: ['BA-Arabic-AlAzhar.pdf', 'Ijaza-Bukhari-Shareef.pdf'],
    audioSample: 'arabic_lecture_intro.mp3',
    status: 'Verified',
    regDate: '2026-04-18',
    avatar: 'M',
    isPremium: true
  },
  {
    id: 'A4',
    name: 'Imam Abu Bakr Siddique',
    title: 'Assistant Imam & Muadhin',
    district: 'Salem',
    madrasa: 'Madrasa Anwarul Uloom',
    experience: '3 Years',
    certificates: ['Aalim-Course-Anwarul.pdf'],
    audioSample: 'adhan_voice_abubakr.mp3',
    status: 'Pending',
    regDate: '2026-06-05',
    avatar: 'B',
    isPremium: false
  },
  {
    id: 'A5',
    name: 'Moulvi Jaffar Sadiq',
    title: 'Primary Arabic Teacher',
    district: 'Chennai',
    madrasa: 'Jamia Darussalam, Oomerabad',
    experience: '5 Years',
    certificates: ['Sanad-Fazeelat-Darussalam.pdf'],
    audioSample: 'tajweed_lesson_sample.mp3',
    status: 'Verified',
    regDate: '2026-05-10',
    avatar: 'J',
    isPremium: false
  },
  {
    id: 'A6',
    name: 'Faisal Ilyas Qadri',
    title: 'Naat Reciter & Speaker',
    district: 'Erode',
    madrasa: 'Al-Huda Arabic Academy',
    experience: '2 Years',
    certificates: ['Adab-Course.pdf'],
    audioSample: 'naat_sample_faisal.mp3',
    status: 'Suspended',
    regDate: '2026-01-15',
    avatar: 'F',
    isPremium: false
  }
];

export const INITIAL_MASJIDS: Masjid[] = [
  {
    id: 'M1',
    name: 'Triplicane Juma Masjid',
    jamathName: 'Triplicane Muslim Association',
    location: 'Chennai',
    regDoc: 'TNSRB-Reg-2010-449.pdf',
    contact: '+91 94440 12345',
    status: 'Verified',
    regDate: '2026-02-15',
    isPremium: true,
    photos: ['triplicane_front.jpg', 'triplicane_interior.jpg']
  },
  {
    id: 'M2',
    name: 'Masjidun Noor',
    jamathName: 'Erode Town Sunnath Jamath',
    location: 'Erode',
    regDoc: 'ERD-TKM-552.pdf',
    contact: '+91 98427 98765',
    status: 'Pending',
    regDate: '2026-06-01',
    isPremium: false,
    photos: ['masjidun_noor.jpg']
  },
  {
    id: 'M3',
    name: 'Markaz Juma Masjid',
    jamathName: 'Trichy City United Jamath',
    location: 'Trichy',
    regDoc: 'TRY-TKM-910.pdf',
    contact: '+91 99940 88821',
    status: 'Verified',
    regDate: '2026-03-22',
    isPremium: true,
    photos: ['markaz_trichy.jpg']
  },
  {
    id: 'M4',
    name: 'Masjid-e-Ibrahim',
    jamathName: 'Madurai South Jamath Council',
    location: 'Madurai',
    regDoc: 'MDU-TKM-011.pdf',
    contact: '+91 97860 33441',
    status: 'Verified',
    regDate: '2026-05-02',
    isPremium: false,
    photos: ['ibrahim_madurai.jpg']
  }
];

export const INITIAL_MADRASAS: Madrasa[] = [
  { id: 'MD1', name: 'Madrasa Noorul Huda', location: 'Erode', contact: '+91 9842100021', status: 'Verified', regDate: '2026-02-21' },
  { id: 'MD2', name: 'Jamia Anwarul Muslimeen', location: 'Salem', contact: '+91 9345123987', status: 'Pending', regDate: '2026-05-30' },
  { id: 'MD3', name: 'Madrasa Riyadhul Jannah', location: 'Chennai', contact: '+91 9445123450', status: 'Verified', regDate: '2026-01-10' }
];

export const INITIAL_JOBS: JobPosting[] = [
  { id: 'JP1', position: 'Chief Imam & Khateeb', masjidName: 'Juma Masjid, Triplicane', location: 'Chennai', salary: '₹ 25,000 - 35,000', postedDate: '2026-06-04', status: 'Pending', isFeatured: false },
  { id: 'JP2', position: 'Hifz Specialist Teacher', masjidName: 'Madrasa Noorul Huda', location: 'Erode', salary: '₹ 18,500 - 22,000', postedDate: '2026-06-03', status: 'Approved', isFeatured: true },
  { id: 'JP3', position: 'Muadhin & Caretaker', masjidName: 'Masjid-e-Ibrahim', location: 'Madurai', salary: '₹ 15,000 - 20,000', postedDate: '2026-06-05', status: 'Approved', isFeatured: false },
  { id: 'JP4', position: 'Islamic Studies Lecturer', masjidName: 'Jamia Anwarul Muslimeen', location: 'Salem', salary: '₹ 22,000 - 30,000', postedDate: '2026-06-05', status: 'Pending', isFeatured: false }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  { id: 'JA1', candidateName: 'Moulvi Abdul Malik Azhari', candidateAvatar: 'M', position: 'Islamic Studies Lecturer', masjidName: 'Jamia Anwarul Muslimeen', status: 'Pending' },
  { id: 'JA2', candidateName: 'Moulana Hazrat Rizwan Al-Qasimi', candidateAvatar: 'R', position: 'Chief Imam & Khateeb', masjidName: 'Juma Masjid, Triplicane', status: 'Active' },
  { id: 'JA3', candidateName: 'Moulvi Jaffar Sadiq', candidateAvatar: 'J', position: 'Primary Arabic Teacher', masjidName: 'Madrasa Riyadhul Jannah', status: 'Selected' },
  { id: 'JA4', candidateName: 'Faisal Ilyas Qadri', candidateAvatar: 'F', position: 'Naat Reciter', masjidName: 'Masjidun Noor', status: 'Rejected' }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'ST1',
    userName: 'Masjidun Noor (Erode)',
    userType: 'Masjid',
    issueCategory: 'Premium Payment Issue',
    priority: 'High',
    status: 'Open',
    date: '2026-06-05',
    chats: [
      { sender: 'user', text: 'Assalamu Alaikum. Our credit card was charged for the annual plan but premium features are not active yet.', time: '10:15 AM' },
      { sender: 'admin', text: 'Walaikum Assalam. Let me verify the Takreem transaction ID. Can you share the transaction receipt screenshot?', time: '10:30 AM' },
      { sender: 'user', text: 'Receipt ID WTXN-8849. Thank you for resolving this.', time: '10:35 AM' }
    ]
  },
  {
    id: 'ST2',
    userName: 'Hafez Muhammad Farook',
    userType: 'Aalim',
    issueCategory: 'Verification Verification Delay',
    priority: 'Medium',
    status: 'Pending',
    date: '2026-06-03',
    chats: [
      { sender: 'user', text: 'Assalamu Alaikum. I submitted my Madrasa Kashiful Huda certificate 3 days ago. How long does the credential review take?', time: '09:00 AM' }
    ]
  },
  {
    id: 'ST3',
    userName: 'Markaz Juma Masjid',
    userType: 'Masjid',
    issueCategory: 'Edit Job post details',
    priority: 'Low',
    status: 'Closed',
    date: '2026-05-28',
    chats: [
      { sender: 'user', text: 'Need to correct the salary range posted for our Hifz vacancy from 14k to 18k.', time: '04:12 PM' },
      { sender: 'admin', text: 'Salary listing updated accordingly. Jazakallah.', time: '05:00 PM' }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TXN01', user: 'Triplicane Juma Masjid', amount: 8499, plan: 'Premium Institutional Annual', status: 'Completed', date: '2026-06-05' },
  { id: 'TXN02', user: 'Moulvi Abdul Malik Azhari', amount: 1599, plan: 'Premium Quarterly', status: 'Completed', date: '2026-06-03' },
  { id: 'TXN03', user: 'Masjidun Noor', amount: 8499, plan: 'Premium Institutional Annual', status: 'Pending', date: '2026-06-05' },
  { id: 'TXN04', user: 'Moulana Hazrat Rizwan Al-Qasimi', amount: 1599, plan: 'Premium Quarterly', status: 'Completed', date: '2026-05-18' },
  { id: 'TXN05', user: 'Masjid-e-Ibrahim', amount: 3500, plan: 'Basic Verification', status: 'Completed', date: '2026-05-10' }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'L1', adminName: 'Admin Zubair', actionPerformed: 'Verified Aalim Hazrat Rizwan Al-Qasimi', timestamp: '2026-06-06 11:30 AM', moduleAccessed: 'Aalim Verification' },
  { id: 'L2', adminName: 'Admin Zubair', actionPerformed: 'Approved Job Posting "Hifz Teacher" for Madrasa Noorul Huda', timestamp: '2026-06-06 10:15 AM', moduleAccessed: 'Job Approvals' },
  { id: 'L3', adminName: 'SuperAdmin Jaffar', actionPerformed: 'Suspended User "Faisal Ilyas Qadri"', timestamp: '2026-06-05 04:45 PM', moduleAccessed: 'User Control' },
  { id: 'L4', adminName: 'Admin Zubair', actionPerformed: 'Sent Push Notification Campaign: "Ramadan Prep Work"', timestamp: '2026-06-05 02:00 PM', moduleAccessed: 'Notification Desk' },
  { id: 'L5', adminName: 'SuperAdmin Jaffar', actionPerformed: 'Updated Home Promotion Banners', timestamp: '2026-06-04 11:12 AM', moduleAccessed: 'Content Management' }
];

export const INITIAL_BANNERS: HomeBanner[] = [
  { id: 'B1', title: 'Find Certified Imams for Madrasa Placement', subtitle: 'Recruitment listings with official credential verification.', actionText: 'Hire Now', isActive: true },
  { id: 'B2', title: 'Hifz competition placements open for Ramadan', subtitle: 'Curated list of professional Qaris and Aalims.', actionText: 'Explore Candidates', isActive: true },
  { id: 'B3', title: 'Al-Ameen Official Credential Verification', subtitle: 'Upgrade profile to receive trust badges.', actionText: 'Verify Account', isActive: false }
];
