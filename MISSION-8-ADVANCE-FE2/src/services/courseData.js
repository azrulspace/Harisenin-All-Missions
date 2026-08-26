const defaultCourseData = [
  {
    id: 1,
    software: "Figma",
    title: "Belajar UI/UX Design Mobile Application & Website",
    description: "Dasar UI/UX mobile app & website, riset, wireframe, design system, sampai prototipe interaktif.",
    chapters: 9,
    videos: 20,
    level: "Beginner",
    price: "GRATIS",
    status: "ACTIVE",
    learners: 35,
    lastEdit: "Sat, 22 Aug 2026",
    footer: "LAST UPDATE 16 AUG 2026"
  },
  {
    id: 2,
    software: "Figma",
    title: "Visual Design Foundation & Illustration",
    description: "Fondasi desain visual, layout, teori warna, tipografi, ilustrasi flat, isometric, hingga infografis.",
    chapters: 9,
    videos: 20,
    level: "Beginner",
    price: "GRATIS",
    status: "ACTIVE",
    learners: 0,
    lastEdit: "Sat, 22 Aug 2026",
    footer: "COMING SOON"
  },
  {
    id: 3,
    software: "Framer",
    title: "Framer Website Builder Interactive",
    description: "Membangun website interaktif end-to-end di Framer seperti style system, komponen, animasi, publish.",
    chapters: 9,
    videos: 20,
    level: "Beginner",
    price: "GRATIS",
    status: "ACTIVE",
    learners: 0,
    lastEdit: "Sat, 22 Aug 2026",
    footer: "COMING SOON"
  },
  {
    id: 4,
    software: "Blender",
    title: "3D Design with Blender from Scratch",
    description: "Dari nol belajar Blender, mulai dari navigasi, manipulasi objek, sampai menjual 10 ikon 3D di Gumroad.",
    chapters: 9,
    videos: 20,
    level: "Beginner",
    price: "GRATIS",
    status: "COMING_SOON",
    learners: 0,
    lastEdit: "Sat, 22 Aug 2026",
    footer: "COMING SOON"
  },
  {
    id: 5,
    software: "Adobe After Effects",
    title: "Motion Graphics with After Effects",
    description: "Animasi logo, lower third, transisi, dan efek visual dasar menggunakan After Effects.",
    chapters: 9,
    videos: 20,
    level: "Beginner",
    price: "GRATIS",
    status: "COMING_SOON",
    learners: 0,
    lastEdit: "Sat, 22 Aug 2026",
    footer: "COMING SOON"
  },
  {
    id: 6,
    software: "CapCut",
    title: "Video Editing Reels & Short Form",
    description: "Teknik editing video pendek untuk TikTok dan Reels yang engaging menggunakan CapCut PC.",
    chapters: 9,
    videos: 20,
    level: "Beginner",
    price: "GRATIS",
    status: "DRAFT",
    learners: 0,
    lastEdit: "Sat, 22 Aug 2026",
    footer: "COMING SOON"
  },
  {
    id: 7,
    software: "Vibe Coding",
    title: "Figma to Vibe Coding Automation",
    description: "Konversi desain Figma ke kode interaktif menggunakan tools Vibe Coding terkini.",
    chapters: 9,
    videos: 20,
    level: "Beginner",
    price: "GRATIS",
    status: "DRAFT",
    learners: 0,
    lastEdit: "Sat, 22 Aug 2026",
    footer: "COMING SOON"
  }
];

export const getCourses = () => {
  const saved = localStorage.getItem('admin_courses');
  if (saved) {
    return JSON.parse(saved);
  }
  return defaultCourseData;
};

export const saveCourses = (courses) => {
  localStorage.setItem('admin_courses', JSON.stringify(courses));
};

export const initialCourseData = defaultCourseData; // Retained for backwards compatibility if needed

export const mockCourseDetail = {
  id: "1",
  title: "Belajar Teknik Desain UI/UX untuk Calon Desainer Aplikasi Mobile & Website",
  learnersJoined: 35,
  description: "Dalam kursus \"Belajar Teknik Desain UI/UX untuk Calon Desainer Aplikasi Mobile & Website\", peserta akan mempelajari dasar-dasar desain antarmuka pengguna dan pengalaman pengguna. Kursus ini mencakup prinsip-prinsip desain, alat yang diperlukan, serta teknik untuk menciptakan aplikasi dan situs web yang menarik dan fungsional. Di akhir kursus, peserta akan memiliki keterampilan untuk merancang antarmuka yang intuitif dan menarik, siap untuk memasuki dunia desain digital.",
  price: 0,
  isFree: true,
  coverImage: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  included: { pdf: 2, pptx: 2, text: 2, video: 2 },
  educators: [
    { id: "e1", name: "Jenny Wilson", role: "UI/UX Designer", avatar: "https://i.pravatar.cc/150?img=1", linkedin: "#" },
    { id: "e2", name: "Floyd Miles", role: "Team Leader", avatar: "https://i.pravatar.cc/150?img=11", linkedin: "#" }
  ],
  chapters: [
    {
      id: "c1",
      title: "Sesi 1 [Section Name]",
      duration: "1h 2m",
      lessons: [
        { id: "l1", title: "[material-name]", duration: "00:02:32", type: "Pdf" },
        { id: "l2", title: "[material-name]", duration: "00:02:32", type: "Pdf" },
        { id: "l3", title: "[material-name]", duration: "00:02:32", type: "Text-Based" },
        { id: "l4", title: "[material-name]", duration: "00:02:32", type: "Text-Based" },
        { id: "l5", title: "[material-name]", duration: "00:02:32", type: "Video" },
        { id: "l6", title: "[material-name]", duration: "00:02:32", type: "Video" }
      ]
    },
    {
      id: "c2",
      title: "Sesi 2 [Section Name]",
      duration: "1h 2m",
      lessons: [
        { id: "l7", title: "[material-name]", duration: "00:02:32", type: "PPTX" },
        { id: "l8", title: "[material-name]", duration: "00:02:32", type: "PPTX" }
      ]
    },
    {
      id: "c3",
      title: "Sesi 3 [Section Name]",
      duration: "1h 2m",
      lessons: [
        { id: "l9", title: "[material-name]", duration: "00:02:32", type: "Pdf" },
        { id: "l10", title: "[material-name]", duration: "00:02:32", type: "Video" }
      ]
    }
  ]
};
