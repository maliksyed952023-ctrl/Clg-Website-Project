
//  Edit THIS file to update ALL department content!


const DEPARTMENTS_DATA = {

  // ─── COLLEGE INFO ───
  college: {
    name: "Government Polytechnic, Chhatrapati Sambhajinagar",
    address: "Padegaon, Chhatrapati Sambhajinagar - 431005, Maharashtra, India",
    phone: "+91-0240-2376104",
    email: "info@gpcsa.ac.in",
    website: "www.gpcsa.ac.in",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      youtube: "#",
      linkedin: "#",
    },
    quickLinks: [
      { label: "About Institute", href: "#" },
      { label: "Examination Cell", href: "#" },
      { label: "Admission", href: "#" },
      { label: "TPO", href: "#" },
      { label: "Student Welfare", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },

  // ─── NAV LINKS ───
  navLinks: [
    { label: "About Institute", href: "#" },
    { label: "Examination Cell", href: "#" },
    { label: "Admission", href: "#" },
    { label: "TPO", href: "#" },
    { label: "Student Welfare", href: "#" },
    { label: "Contact", href: "#" },
  ],

  // ─── DEPARTMENT CATEGORIES (for nav dropdown) ───
  departmentCategories: {
    "Diploma Programmes": [
      { name: "Artificial Intelligence And Machine Learning", slug: "aiml" },
      { name: "Automobile Engineering", slug: "auto" },
      { name: "Civil Engineering", slug: "civil" },
      { name: "Computer Engineering", slug: "computer" },
      { name: "Dress Designing And Garment Manufacturing", slug: "ddgm" },
      { name: "Electrical Engineering", slug: "electrical" },
      { name: "Electronics and Telecommunication Engineering", slug: "entc" },
      { name: "Information Technology", slug: "it" },
      { name: "Mechanical Engineering", slug: "mechanical" },
    ],
    "Allied Departments": [
      { name: "Science And Humanities", slug: "science-humanities" },
      { name: "Applied Mechanics", slug: "applied-mechanics" },
      { name: "Workshop", slug: "workshop" },
    ],
    "Advanced Diploma Programmes": [
      { name: "Mercedes-Benz", slug: "mercedes-benz" },
    ],
  },

  // ─── SLIDER IMAGES (shared hero slider) ───
  defaultSliderImages: [
    "https://images.unsplash.com/photo-1562774053-701939374585?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&h=600&fit=crop",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=600&fit=crop",
  ],

  // ═══════════════════════════════════════════════════
  // DEPARTMENT CONFIGS
  // ═══════════════════════════════════════════════════

  departments: {

    // ─────────────── AIML ───────────────
    aiml: {
      name: "Artificial Intelligence And Machine Learning",
      type: "diploma",
      sections: {
        about: true,
        visionMission: true,
        peos: true,
        pos: true,
        psos: true,
        committee: true,
        faculty: true,
        laboratory: true,
        labPhotos: true,
        achievements: true,
        magazine: true,
        salientFeatures: false,
        profile: false,
      },
      vision: "A center of excellence in the domain of AI & ML to cultivate 'digital artifacts' for society.",
      mission: [
        "To impart education in AI and ML required for industry and business.",
        "Developing skills resembling problem solving, interpersonal skill, high order thinking skill and logical reasoning.",
        "Developing values and ethics for lifelong learning in the system environment.",
      ],
      peos: [
        "To provide students with a solid foundation in AI & ML principles.",
        "To develop analytical and problem-solving skills using modern tools.",
        "To prepare graduates for leadership roles in technology industries.",
        "To foster ethical practices and lifelong learning mindset.",
      ],
      pos: [
        "Apply knowledge of AI and ML to solve real-world problems.",
        "Design and develop intelligent systems and applications.",
        "Use modern programming tools and frameworks effectively.",
        "Communicate effectively in professional environments.",
        "Work as responsible members of multidisciplinary teams.",
      ],
      psos: [
        "Design and implement machine learning models for industry applications.",
        "Apply deep learning techniques for image, text, and data processing.",
        "Use cloud and edge computing for deploying AI solutions.",
      ],
      committee: [
        { name: "Dr. A. B. Patil", designation: "Head of Department & Chairman", experience: "18 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
        { name: "Prof. S. K. Sharma", designation: "Program Coordinator", experience: "12 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
        { name: "Dr. R. M. Deshmukh", designation: "Member", experience: "10 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
        { name: "Prof. P. V. Joshi", designation: "Member", experience: "8 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Dr. Rajesh Sharma", role: "Professor & Head", phone: "+91 98765 43210", email: "rajesh.sharma@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
        { name: "Prof. Anita Kulkarni", role: "Associate Professor, AI & ML", phone: "+91 98765 43211", email: "anita.kulkarni@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
        { name: "Prof. Suresh Patil", role: "Assistant Professor, Data Science", phone: "+91 98765 43212", email: "suresh.patil@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "COMPUTER CENTER LAB", equipment: "PC-10, Scanner", area: "45.50", cost: "8,88,497", remarks: "" },
        { name: "AI & ML LAB", equipment: "GPU Workstations, TPU Boards", area: "60.00", cost: "15,50,000", remarks: "Upgraded 2024" },
        { name: "DATA SCIENCE LAB", equipment: "Servers, Network Equipment", area: "55.00", cost: "12,00,000", remarks: "" },
      ],
      labPhotos: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop",
      ],
      magazines: [
        { title: "Technical", subtitle: "BITS & Bytes – I-CO\nDept. June 2022", downloadUrl: "#", viewUrl: "#" },
        { title: "Technical", subtitle: "AI & ML Special Edition\nDept. Dec 2023", downloadUrl: "#", viewUrl: "#" },
      ],
    },

    // ─────────────── COMPUTER ENGINEERING ───────────────
    computer: {
      name: "Computer Engineering",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
      },
      vision: "To be recognized as a center of excellence in Computer Engineering education.",
      mission: [
        "To provide quality education in Computer Engineering.",
        "To develop technically skilled graduates for industry and research.",
        "To promote innovation and entrepreneurship among students.",
      ],
      peos: [
        "Apply fundamental knowledge of Computer Science to solve engineering problems.",
        "Pursue higher education and professional development.",
        "Contribute to society through ethical engineering practices.",
      ],
      pos: [
        "Design and develop software solutions using modern tools.",
        "Apply programming skills to solve computational problems.",
        "Communicate effectively and work in teams.",
        "Understand professional ethics and responsibilities.",
      ],
      psos: [
        "Develop web and mobile applications using modern frameworks.",
        "Apply database management concepts for data-driven solutions.",
      ],
      committee: [
        { name: "Prof. V. S. Jadhav", designation: "Head of Department & Chairman", experience: "20 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
        { name: "Prof. M. R. Kale", designation: "Program Coordinator", experience: "15 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. V. S. Jadhav", role: "Professor & Head", phone: "+91 98765 43220", email: "vs.jadhav@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
        { name: "Prof. M. R. Kale", role: "Associate Professor", phone: "+91 98765 43221", email: "mr.kale@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "PROGRAMMING LAB", equipment: "Desktop PCs, Projector", area: "50.00", cost: "10,00,000", remarks: "" },
        { name: "NETWORKING LAB", equipment: "Routers, Switches, Servers", area: "40.00", cost: "8,00,000", remarks: "" },
      ],
      labPhotos: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop",
      ],
      magazines: [
        { title: "Technical", subtitle: "BITS & Bytes – CO\nDept. June 2023", downloadUrl: "#", viewUrl: "#" },
      ],
    },

    // ─────────────── INFORMATION TECHNOLOGY ───────────────
    it: {
      name: "Information Technology",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
      },
      vision: "To produce IT professionals who are innovative and industry-ready.",
      mission: [
        "To impart quality education in Information Technology.",
        "To develop problem-solving and analytical skills.",
        "To encourage research and innovation in IT domain.",
      ],
      peos: [
        "Apply IT principles to solve industry problems.",
        "Pursue continuous learning and professional growth.",
      ],
      pos: [
        "Design and implement IT solutions for business needs.",
        "Apply web technologies for developing applications.",
        "Work effectively in team environments.",
      ],
      psos: [
        "Develop full-stack web applications.",
        "Apply cybersecurity principles for secure systems.",
      ],
      committee: [
        { name: "Prof. S. N. Raut", designation: "Head of Department", experience: "16 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. w.p. swant", role: "Professor & Head", phone: "+91 98765 43230", email: "sn.raut@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
        { name: "Prof. A. P. More", role: "Assistant Professor", phone: "+91 98765 43231", email: "ap.more@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "IT LAB 1", equipment: "Desktop PCs, Printers", area: "55.00", cost: "9,50,000", remarks: "" },
        { name: "WEB DEVELOPMENT LAB", equipment: "Workstations, Servers", area: "45.00", cost: "7,00,000", remarks: "" },
      ],
      labPhotos: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop",
      ],
      magazines: [
        { title: "Technical", subtitle: "IT Insights\nDept. March 2024", downloadUrl: "#", viewUrl: "#" },
      ],
    },

    // ─────────────── AUTOMOBILE ───────────────
    auto: {
      name: "Automobile Engineering",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To develop competent automobile engineers with practical skills.",
      mission: [
        "To provide hands-on training in automobile technology.",
        "To develop industry-ready professionals.",
      ],
      peos: ["Apply automobile engineering fundamentals to solve problems.", "Pursue lifelong learning."],
      pos: ["Design automobile systems.", "Apply diagnostic techniques.", "Communicate effectively."],
      psos: ["Perform vehicle maintenance and diagnostics.", "Apply modern automotive technologies."],
      committee: [
        { name: "Prof. D. K. Wagh", designation: "Head of Department", experience: "14 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. D. K. Wagh", role: "Professor & Head", phone: "+91 98765 43240", email: "dk.wagh@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "AUTOMOBILE WORKSHOP", equipment: "Engine Models, Tools", area: "100.00", cost: "20,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop"],
    },

    // ─────────────── CIVIL ───────────────
    civil: {
      name: "Civil Engineering",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To be a leading department in Civil Engineering education.",
      mission: ["To provide quality civil engineering education.", "To develop skilled professionals for the construction industry."],
      peos: ["Apply civil engineering principles.", "Pursue professional development."],
      pos: ["Design civil structures.", "Apply surveying techniques.", "Work in teams."],
      psos: ["Perform structural analysis.", "Apply construction management skills."],
      committee: [
        { name: "Prof. R. T. Mane", designation: "Head of Department", experience: "22 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. R. T. Mane", role: "Professor & Head", phone: "+91 98765 43250", email: "rt.mane@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "SURVEY LAB", equipment: "Total Station, Theodolite", area: "60.00", cost: "12,00,000", remarks: "" },
        { name: "SOIL MECHANICS LAB", equipment: "Testing Equipment", area: "50.00", cost: "8,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&h=600&fit=crop"],
    },

    // ─────────────── DDGM ───────────────
    ddgm: {
      name: "Dress Designing And Garment Manufacturing",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To nurture creative designers with strong technical skills in garment manufacturing.",
      mission: ["To provide quality education in fashion design and garment technology.", "To develop industry-ready fashion professionals."],
      peos: ["Apply design principles to create innovative garments.", "Pursue careers in fashion industry."],
      pos: ["Design garments using modern techniques.", "Apply textile knowledge effectively."],
      psos: ["Create fashion collections.", "Apply garment manufacturing processes."],
      committee: [
        { name: "Prof. S. M. Gaikwad", designation: "Head of Department", experience: "12 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. S. M. Gaikwad", role: "Professor & Head", phone: "+91 98765 43260", email: "sm.gaikwad@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "SEWING LAB", equipment: "Industrial Sewing Machines", area: "70.00", cost: "10,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=600&fit=crop"],
    },

    // ─────────────── ELECTRICAL ───────────────
    electrical: {
      name: "Electrical Engineering",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To produce competent electrical engineers for industry and society.",
      mission: ["To provide practical training in electrical engineering.", "To develop skilled professionals for power and energy sectors."],
      peos: ["Apply electrical engineering fundamentals.", "Pursue careers in power sector."],
      pos: ["Design electrical systems.", "Apply safety practices.", "Work in teams."],
      psos: ["Perform electrical installation and maintenance.", "Apply power system analysis."],
      committee: [
        { name: "Prof. N. B. Patil", designation: "Head of Department", experience: "19 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. N. B. Patil", role: "Professor & Head", phone: "+91 98765 43270", email: "nb.patil@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "ELECTRICAL MACHINES LAB", equipment: "Motors, Generators, Transformers", area: "80.00", cost: "15,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=600&fit=crop"],
    },

    // ─────────────── ENTC ───────────────
    entc: {
      name: "Electronics and Telecommunication Engineering",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To develop skilled professionals in electronics and communication technologies.",
      mission: ["To provide quality education in ENTC.", "To develop industry-ready engineers."],
      peos: ["Apply ENTC principles to solve problems.", "Pursue innovation in communication technology."],
      pos: ["Design electronic circuits.", "Apply communication system concepts.", "Work effectively in teams."],
      psos: ["Design embedded systems.", "Apply signal processing techniques."],
      committee: [
        { name: "Prof. K. R. Shinde", designation: "Head of Department", experience: "17 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. K. R. Shinde", role: "Professor & Head", phone: "+91 98765 43280", email: "kr.shinde@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "ELECTRONICS LAB", equipment: "Oscilloscopes, Signal Generators", area: "55.00", cost: "10,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=600&fit=crop"],
    },

    // ─────────────── MECHANICAL ───────────────
    mechanical: {
      name: "Mechanical Engineering",
      type: "diploma",
      sections: {
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To be a leading department in Mechanical Engineering education and research.",
      mission: ["To provide quality mechanical engineering education.", "To develop skilled professionals for manufacturing and design."],
      peos: ["Apply mechanical engineering fundamentals.", "Pursue professional excellence."],
      pos: ["Design mechanical systems.", "Apply manufacturing processes.", "Communicate effectively."],
      psos: ["Perform CAD/CAM operations.", "Apply thermal and fluid mechanics."],
      committee: [
        { name: "Prof. G. H. Kulkarni", designation: "Head of Department", experience: "21 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. G. H. Kulkarni", role: "Professor & Head", phone: "+91 98765 43290", email: "gh.kulkarni@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "WORKSHOP", equipment: "Lathe, Milling, Drilling Machines", area: "150.00", cost: "25,00,000", remarks: "" },
        { name: "CAD/CAM LAB", equipment: "Workstations, AutoCAD, SolidWorks", area: "50.00", cost: "12,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=600&fit=crop"],
    },

    // ═══════════════════════════════════════════════════
    // ALLIED DEPARTMENTS
    // ═══════════════════════════════════════════════════

    // ─────────────── SCIENCE AND HUMANITIES ───────────────
    "science-humanities": {
      name: "Science And Humanities",
      type: "allied",
      sections: {
        about: true, visionMission: true, peos: false, pos: false, psos: false,
        committee: false, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To build a strong foundation in science and humanities for all engineering students.",
      mission: [
        "To provide fundamental knowledge in science, mathematics, and communication.",
        "To develop analytical thinking and language skills among students.",
      ],
      faculty: [
        { name: "Prof. L. M. Naik", role: "Head, Science & Humanities", phone: "+91 98765 43300", email: "lm.naik@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "PHYSICS LAB", equipment: "Optical Instruments, Meters", area: "50.00", cost: "6,00,000", remarks: "" },
        { name: "CHEMISTRY LAB", equipment: "Chemicals, Glassware", area: "50.00", cost: "5,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&h=600&fit=crop"],
    },

    // ─────────────── APPLIED MECHANICS ───────────────
    "applied-mechanics": {
      name: "Applied Mechanics",
      type: "allied",
      sections: {
        about: true, visionMission: true, peos: false, pos: false, psos: false,
        committee: false, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: true, profile: false,
      },
      vision: "To provide strong fundamentals in mechanics for engineering applications.",
      mission: [
        "To develop understanding of mechanical principles among students.",
        "To support all engineering departments with mechanics education.",
      ],
      salientFeatures: [
        "Well-equipped mechanics laboratory",
        "Experienced faculty with industry exposure",
        "Hands-on practical training approach",
        "Regular workshops and seminars",
        "Strong industry connections",
      ],
      faculty: [
        { name: "Prof. H. J. Thombare", role: "Head, Applied Mechanics", phone: "+91 98765 43310", email: "hj.thombare@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "MECHANICS LAB", equipment: "Testing Machines, Models", area: "60.00", cost: "8,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900&h=600&fit=crop"],
    },

    // ─────────────── WORKSHOP ───────────────
    workshop: {
      name: "Workshop",
      type: "allied",
      sections: {
        about: true, visionMission: true, peos: false, pos: false, psos: false,
        committee: false, faculty: true, laboratory: true, labPhotos: true,
        achievements: false, magazine: false, salientFeatures: false, profile: false,
      },
      vision: "To provide excellent hands-on workshop training to all engineering students.",
      mission: [
        "To develop practical manufacturing skills among students.",
        "To provide exposure to various workshop processes and tools.",
      ],
      faculty: [
        { name: "Prof. B. T. Pawar", role: "Head, Workshop", phone: "+91 98765 43320", email: "bt.pawar@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
      labs: [
        { name: "FITTING SHOP", equipment: "Vices, Files, Hacksaws", area: "80.00", cost: "5,00,000", remarks: "" },
        { name: "CARPENTRY SHOP", equipment: "Saws, Planes, Chisels", area: "80.00", cost: "4,00,000", remarks: "" },
      ],
      labPhotos: ["https://images.unsplash.com/photo-1523050854058-8df90110c476?w=900&h=600&fit=crop"],
    },

    // ═══════════════════════════════════════════════════
    // ADVANCED DIPLOMA
    // ═══════════════════════════════════════════════════

    "mercedes-benz": {
      name: "Mercedes-Benz (Advanced Diploma)",
      type: "advanced",
      sections: {
        about: true, visionMission: false, peos: false, pos: false, psos: false,
        committee: false, faculty: true, laboratory: false, labPhotos: false,
        achievements: false, magazine: false, salientFeatures: false, profile: true,
      },
      profile: "The Mercedes-Benz Advanced Diploma programme is a unique industry-academia collaboration designed to develop highly skilled automotive technicians. The programme combines theoretical learning with hands-on training at Mercedes-Benz facilities, preparing students for careers in premium automotive service and maintenance.",
      faculty: [
        { name: "Prof. A. S. Chavan", role: "Programme Coordinator", phone: "+91 98765 43330", email: "as.chavan@gpcsa.edu", image: "https://img.freepik.com/premium-photo/full-body-portrait-photo-happy-indian-school-male-teacher-standing-proudly-blurred-background-o_928503-3759.jpg" },
      ],
    },
  },
};
