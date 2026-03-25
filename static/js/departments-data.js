
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
    "/static/images/campus1.jpg.jpeg",
    "/static/images/campus2.jpg.jpeg",
    "/static/images/campus3.jpg.jpeg",
    "/static/images/campus4.jpeg",
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
        syllabus: true,
        questionPaper: true},
      vision: "To develop globally competent and ethical professionals, in the field of Artificial Intelligence and Machine Learning, ready pursue entrepreneurship along with digitization of society",
      mission: [
        "M1. To impart cutting-edge technology skills and competencies in the field of Artificial Intelligence and Machine Learning, thus producing industry-ready professionals and entrepreneurs.",
        "M2. To collaborate with the leading industries to exhilarate innovative research and development in Artificial Intelligence and Machine Learning and its allied technologies.",
        "M3. To inculcate ethical values amongst students who are always eager to address global issues for life-long learning.",
      ],
      peos: [],
      pos: [
        "1. Basic and Discipline specific knowledge: Apply knowledge of basic mathematics, science and engineering fundamentals and engineering specialization to solve Engineering problems.",
        "2. Problem Analysis : Identify and analyze well defined engineering problems using codified standard method.",
        "3. Design/development of solutions: Design solutions for well defined technical problems and assist with the design of systems components or processes to meet specific needs.",
        "4. Engineering tools, Experimentation and Testing: Apply modern engineering tools and appropriate technique to conduct standard tests and measurements.",
        "5. Engineering practices for society, sustainability and Environment: Apply appropriate technology in context of society, sustainability, environment and ethical practices.",
        "6. Project Management: use engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well defined engineering activities",
        "7. Life-long learning: Ability to analyze individual needs and engage in updating in the learning in the context of technological changes.",
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
        { name: "Dr. Rajesh Sharma", role: "Professor & Head", phone: "+91 98765 43210", email: "rajesh.sharma@gpcsa.edu", image: "/static/images/director4.jpg" },
        { name: "Prof. Anita Kulkarni", role: "Associate Professor, AI & ML", phone: "+91 98765 43211", email: "anita.kulkarni@gpcsa.edu", image: "/static/images/director4.jpg" },
        { name: "Prof. Suresh Patil", role: "Assistant Professor, Data Science", phone: "+91 98765 43212", email: "suresh.patil@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "COMPUTER CENTER LAB", equipment: "PC- 10, Scanner", area: "", cost: "9,80,405", remarks: "" },
        { name: "HARDWARE LAB", equipment: "PC- 10, Scanner", area: "", cost: "9,95,069", remarks: "" },
        { name: "SOFTWARE LAB", equipment: "PC- 10", area: "", cost: "8,27,291", remarks: "" },
        { name: "MICROPROCESSOR LAB", equipment: "PC- 10", area: "", cost: "10,26,260", remarks: "" },
        { name: "PROGRAMMING LAB", equipment: "PC- 10", area: "", cost: "8,92,327", remarks: "" },
        { name: "MSBTE LAB – 1", equipment: "PC – 25", area: "", cost: "", remarks: "" },
        { name: "MSBTE LAB – 2", equipment: "PC – 25", area: "", cost: "", remarks: "" },
      ],
      labPhotos: [
        "/static/images/lab1.jpg.jpeg",
        "/static/images/lab2.jpg.jpeg",
        "/static/images/lab1.jpg.jpeg",
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
        syllabus: true,
        questionPaper: true},
      vision: "A center of excellence in the domain of Computer Science & Engineering to cultivate “digital artifacts” for society",
      mission: [
        "1. To impart education in computer hardware and software required for industry and business.",
        "2. Developing skills resembling problem solving, interpersonal skill, high order thinking skill and logical reasoning for entrepreneurship and employment.",
        "3. Developing values and ethics for lifelong learning in the system environment.",
      ],
      peos: [
        "1. PEO1:To provide the essential knowledge of science and engineering concepts fundamental for a computer professional and equip the proficiency of mathematical foundations and algorithmic principles for competent problem solving ability.",
        "2. PEO2:To design, model, program and test software systems and applications in varying domains including Networks, Embedded systems, Web technologies and Image processing.",
        "3. PEO3:To inculcate professional and ethical attitude, communication skills, teamwork, lifelong learning, multidisciplinary approach into student to relate computer engineering issues with social awareness.",
      ],
      pos: [
        "PO1: Basic and Discipline specific knowledge: Able to apply knowledge of basic mathematics, sciences, engineering fundamental and Computer engineering to solve the broad-based computer engineering related problems.",
        "PO2: Problem Analysis: Plan to perform experiments and practices to use the results to solve broad-based Computer engineering problems.",
        "PO3: Design / Development of solutions: Design solutions for well defined technical problems and assist with the design of system components or process to meet needs of computer engineering.",
        "PO4: Engineering Tools, Experimentation and Testing: Apply modern Computer engineering tools and appropriate technique to conduct standard tests and measurements.",
        "PO5: Engineering practices for society, sustainability and environment: Apply appropriate Computer technology in context of society, sustainability, environment and ethical practices.",
        "PO6: Project Management: Use Computer engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well-defined Computer engineering activities.",
        "PO7: Life-long learning: Ability to analyses individual needs and engage in updating in the context of technological changes.",
      ],
      psos: [
        "1. Technical Support Analyst: Ability to use, analyse and develop computer programs in the areas related to algorithms, System and application software, multimedia technologies, web design, networking, troubleshooting & maintenance for efficient design of computer-based systems of varying complexity.",
        "2. Software Developer: Ability to apply standard practices and strategies in software project development using Free and open source software (FOSS) to deliver a quality product for business application",
      ],
      committee: [
        { name: "Prof. V. S. Jadhav", designation: "Head of Department & Chairman", experience: "20 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
        { name: "Prof. M. R. Kale", designation: "Program Coordinator", experience: "15 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. V. S. Jadhav", role: "Professor & Head", phone: "+91 98765 43220", email: "vs.jadhav@gpcsa.edu", image: "/static/images/director4.jpg" },
        { name: "Prof. M. R. Kale", role: "Associate Professor", phone: "+91 98765 43221", email: "mr.kale@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "PROGRAMMING LAB", equipment: "Desktop PCs, Projector", area: "50.00", cost: "10,00,000", remarks: "" },
        { name: "NETWORKING LAB", equipment: "Routers, Switches, Servers", area: "40.00", cost: "8,00,000", remarks: "" },
      ],
      labPhotos: [
        "/static/images/lab1.jpg.jpeg",
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
        syllabus: true,
        questionPaper: true},
      vision: "A center of excellence to develop competent IT professional in the domain of IT & IT enabled Services (ITeS) and pursue entrepreneurship along with digitization of society.",
      mission: [
        "M1. To inculcate concepts, skills & capabilities in Information Technology diploma graduates to design and develop computational systems for diversified business application.",
        "M2. To develop values, ethics, life skills & leadership skills required for successful employment / self-employment / enterprise in multicultural & multidisciplinary teams lead towards the growth of society.",
      ],
      peos: [
        "To design algorithm, implement programs and develop software for pursing career in industry, academia and allied industry.",
        "To integrate capabilities of diploma graduates in technologies used particularly in sectors of communication, distributing computing and testing which are relevant to IT industry.",
        "To familiarize with new trends in Information Technology and ready for life-long learning.",
      ],
      pos: [
        "1. Basic knowledge: An ability to apply basic knowledge of mathematics, science, and engineering as it applies to fundamentals of Information Technology and related programming technologies.",
        "2. Discipline knowledge: An ability to apply knowledge of networking with wireless technologies, multimedia technology and distributed computing, software testing and topics of current relevance to IT industry.",
        "3. Experiments and practice: An ability to interpret the knowledge of best practices of experiments in software development in industry.",
        "4. Engineering tools: An ability to design, develop and evaluate acreative solutions for computer-based system, process, or program using techniques, skills and modern software engineering tools necessary for IT practice.",
        "5. The engineer and society: An ability to comprehend of professional, legal, security, social issues and responsibilities.",
        "6. Environment and sustainability: An ability to analyse the impact of engineering solutions in global, economic, environmental and societal context.",
        "7. Ethics: An ability to inculcate professional and ethical responsibilities and marshal in all situations.",
        "8. Individual and team work: An ability to function effectively in multidisciplinary environment as an individual and in team.",
        "9. Communication: An ability to communicate technical topics in written and verbal forms effectively.",
        "10. Life-long learning: An ability to apply knowledge & skills of computing discipline in the competitive examinations, higher education and / or seek employment to engage in life-long learning.",
      ],
      psos: [
        "T enabled service sector: An ability to use and apply current technical concepts and practices in the core information technologies of data management, programming, networking, and web systems and technologies.",
        "Asst. programmer & Software Tester: Ability to apply the fundamentals of information and computing technologies to identify, analyse, design, develop, test, debug and obtain solutions to complex engineering problems of IT industry.",
      ],
      committee: [
        { name: "Shri. Dr. A N Pawar", designation: "Chairman", experience: "35", organization: "G.P. Aurangabad" },
        { name: "Shri. A D Joshi, Deputy Secretary RBTE", designation: "Expert from MSBTE", experience: "9", organization: "RBTE , Aurangabad" },
        { name: "Shri. Purshottam Mhasalekar", designation: "Expert from Local industry", experience: "28", organization: "Endurance Technologies, Aurangabad" },
        { name: "Shri. G. K. Chahel", designation: "Expert from Local industry", experience: "33", organization: "Uma Sons Pvt. Ltd, Aurangabad" },
        { name: "Shri. Onkar Joshi", designation: "Expert from Local industry", experience: "20", organization: "Neocon Enterprises, Aurangabad" },
        { name: "Shri. G. G. Ghuge", designation: "Member", experience: "25", organization: "G.P. Aurangabad" },
        { name: "Shri. A A Joshi", designation: "Member", experience: "30", organization: "G.P. Aurangabad" },
        { name: "Shri. U Hiwrale", designation: "Member Secretary", experience: "22", organization: "G.P. Aurangabad" },
        { name: "Shri. R. N. Khadse", designation: "Expert from neighboring institute", experience: "27", organization: "G.P. Nashik" },
        { name: "Dr R R Ramteke", designation: "CDC In charge", experience: "", organization: "" },
      ],
      faculty: [
        { name: "Prof. w.p. swant", role: "Professor & Head", phone: "+91 98765 43230", email: "sn.raut@gpcsa.edu", image: "/static/images/director4.jpg" },
        { name: "Prof. A. P. More", role: "Assistant Professor", phone: "+91 98765 43231", email: "ap.more@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "IT LAB 1", equipment: "Desktop PCs, Printers", area: "55.00", cost: "9,50,000", remarks: "" },
        { name: "WEB DEVELOPMENT LAB", equipment: "Workstations, Servers", area: "45.00", cost: "7,00,000", remarks: "" },
      ],
      labPhotos: [
        "/static/images/lab2.jpg.jpeg",
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
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "By 2026 the Department of Automobile Engineering will be the Centre of Excellence through development of competent professionals and entrepreneur’s on High-tech Automobile Engineering platform in collaboration with Industry and organizations",
      mission: [
        "We pursue relevant education to educate and train individuals, professionals, technicians and skilled workforce for wage and self-employment through world class curriculum, student centric academics systems and passionate faculty and staff members.",
      ],
      peos: [
        "PEO1-be proficient in fundamentals of engineering, science, technological competencies and quantitative reasoning.",
        "PEO2-be able to apply these skills in developing sustainable, economical and feasible solutions to Civil engineering problems.",
        "PEO3-grows professionally in their careers through continued development of technical and management skills.",
        "PEO4- be able to pursue higher education and perform efficiently on civil engineering field.",
      ],
      pos: [
        "PO.1 Basic Discipline and specific knowledge: Apply knowledge of basic mathematics, science and engineering fundamentals and engineering specialization to solve the Mechanical Engineering related problems.",
        "PO.2 Problem Analysis: Identify and analyze well defined engineering problems using codified standard methods.",
        "PO.3 Design and Development of solutions: Design solutions for well-defined technical problems and assist with the design of systems components or process to meet specified needs.",
        "PO.4 Engineering Tools, Experimentation and testing: Apply modern engineering tools and appropriate technique to conduct standard tests and measurements.",
        "PO.5 Engineering practices for society, sustainability and environment: Apply appropriate technology in context of society, sustainability, environment and ethical practices.",
        "PO.6 Project Management: Use engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well-defined engineering activities.",
        "PO.7 Life-long learning: Ability to analyze individual needs and engage in updating in the context of technological changes.",
      ],
      psos: [
        "Advance technology uses: Use advance technology based on high-tech/modern /material process/ equipment/machinery and software.",
        "Manage the construction process: Manage the construction process by proper selection and scheduling of suitable and adequate resources.",
      ],
      committee: [
        { name: "Prof. D. K. Wagh", designation: "Head of Department", experience: "14 Years", organization: "Government Polytechnic, Chhatrapati Sambhajinagar" },
      ],
      faculty: [
        { name: "Prof. D. K. Wagh", role: "Professor & Head", phone: "+91 98765 43240", email: "dk.wagh@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "AUTOMOBILE WORKSHOP", equipment: "Engine Models, Tools", area: "100.00", cost: "20,00,000", remarks: "" },
      ],
      labPhotos: ["/static/images/lab1.jpg.jpeg"],
    },

    // ─────────────── CIVIL ───────────────
    civil: {
      name: "Civil Engineering",
      type: "diploma",
      sections: { 
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "To be a centre for excellence to meet global standards satisfying dynamic demands of civil engineering industry incorporating relevant social concerns, encouraging lifelong learning, technological innovations and developing competent professionals through highly qualified, committed and trained staff.",
      mission: [
        "To educate the globally competent Civil Engineering Diploma graduates through excellent education system for creating synergy for socio-economic development of nation, with focus on development of social values, human ethics, employment and self-employment spirit and lifelong learning skills.",
      ],
      peos: [
        "PEO1-be proficient in fundamentals of engineering, science, technological competencies and quantitative reasoning.",
        "PEO2-be able to apply these skills in developing sustainable, economical and feasible solutions to Civil engineering problems.",
        "PEO3-grows professionally in their careers through continued development of technical and management skills.",
        "PEO4- be able to pursue higher education and perform efficiently on civil engineering field.",
      ],
      pos: [
        "1. Basic and Discipline specific knowledge: Apply knowledge of basic mathematics, science and engineering fundamentals and engineering specialization to solve the engineering problems.",
        "2. Problem analysis: Identify and analyze well-defined engineering problems using codified standard methods.",
        "3. Design/ development of solutions: Design solutions for well-defined technical problems and assist with the design of systems components or processes to meet specified needs.",
        "4. Engineering Tools: Experimentation and Testing: Apply modern engineering tools and appropriate technique to conduct standard tests and measurements.",
        "5. Engineering practices for society, sustainability and environment: Apply appropriate technology in context of society, sustainability, environment and ethical practices.",
        "6. Project Management: Use engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well-defined engineering activities.",
        "7. Life-long learning: Ability to analyze individual needs and engage in updating in the context of technological changes.",
      ],
      psos: [
        "1. Advance technology uses: Use advance technology based on high-tech/modern /material process/ equipment/machinery and software.",
        "2. Manage the construction process: Manage the construction process by proper selection and scheduling of suitable and adequate resources.",
      ],
      committee: [
        { name: "Dr. R.T. Pachkor – HOD Civil Dept.", designation: "Chairman", experience: "", organization: "" },
        { name: "Smt. M. M. Ganorkar – HOD APM Dept.", designation: "Member", experience: "", organization: "" },
        { name: "Shri. Atul Mirajgaonkar – Expert from Local Industry(Consultant)", designation: "Member", experience: "", organization: "" },
        { name: "Shri. Santosh S. Rakhe – Expert from Industry", designation: "Member", experience: "", organization: "" },
        { name: "Shri. C. V. Nandanwar – Lecturer Applied Mechanics Govt. Polytechnic, Jintur.", designation: "Member", experience: "", organization: "" },
        { name: "Shri. P. D. Vaze – Expert from Irrigation Department(WRD)", designation: "Member", experience: "", organization: "" },
        { name: "Shri. Dr. U. B. Kalwane – Director Campus, Shriyash Pratisthan, Aurangabad.", designation: "Member", experience: "", organization: "" },
        { name: "Shri. D. A. Kulkarni – Sectional Engineer, MGP Div. Jalna", designation: "Member", experience: "", organization: "" },
        { name: "Shri. Y. N. Shaikh – Lecturer in Civil Engineering", designation: "Member", experience: "", organization: "" },
        { name: "Shri. V V Deshpande – Lecturer in Civil Engineering", designation: "Member", experience: "", organization: "" },
        { name: "Shri. G. M. Kechkar – Lecturer in APM", designation: "Member", experience: "", organization: "" },
        { name: "Shri. R. T. Aghav – Lecturer in APM", designation: "Member", experience: "", organization: "" },
        { name: "Smt. Dr. R. S. Bang – Lecturer in Civil Engineering", designation: "Member", experience: "", organization: "" },
        { name: "Shri. K. S. Borde – Lecturer in Civil Engineering", designation: "Member secretary", experience: "", organization: "" },
      ],
      faculty: [
        { name: "Prof. R. T. Mane", role: "Professor & Head", phone: "+91 98765 43250", email: "rt.mane@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "SURVEY LAB", equipment: "Total Station, Theodolite", area: "60.00", cost: "12,00,000", remarks: "" },
        { name: "SOIL MECHANICS LAB", equipment: "Testing Equipment", area: "50.00", cost: "8,00,000", remarks: "" },
      ],
      labPhotos: ["/static/images/lab3.jpg.jpeg"],
    },

    // ─────────────── DDGM ───────────────
    ddgm: {
      name: "Dress Designing And Garment Manufacturing",
      type: "diploma",
      sections: { 
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "Empower Women in Garment Designing & Making, with respect to Indian Heritage & Global trends.",
      mission: [
        "M1. To create a learning environment that provides skills, creativity and industry exposure so as to practice design interventions right from the adornment of the material to the finished Garment and fulfill the clothing needs of the society.",
        "M2. To enhance the presentation skills, entrepreneurial abilities & development of social values, human ethics for the careers in Garment mfg. units.",
        "M3. To harness human resource for sustainable growth by inculcating the philosophy of continuous learning and innovation in Dress Designing and Garment Manufacturing field.",
      ],
      peos: [
        "Students will design garments considering current trends and forecasting as per needs of society.",
        "Students will pursue higher studies in designing, garment technology, merchandising & fashion communication.",
        "Students will execute career in garment industries & academics considering green and responsible fashion.",
        "Students will have self-employment in designing, pattern making, surface ornamentation and graphic designing.",
      ],
      pos: [
        "1. Basic and Discipline specific knowledge: Apply knowledge of basic techniques of sewing, drawing, fundamentals of pattern making, textile, historical costumes & embroidery to design and manufacture garment.",
        "2. Problem analysis: Identify and analyze human figure problems, fitting problems, finishing, presentation & promotional problems using standard methods of Garment Designing and Mfg.",
        "3. Design/ development of solutions: Design solutions for well-defined technical problems and assist with the design of garment components or processes to meet specified needs.",
        "4. Engineering Tools, Experimentation and Testing: Apply modern engineering tools and appropriate technique to conduct standard tests and measurements for Dress Designing and mfg.",
        "5. Engineering practices for society, sustainability and environment: Apply appropriate garment designing and making technology in context of society, sustainability, environment and ethical practices.",
        "6. Project Management: Use Engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well-defined Garment Designing and making activities.",
        "7. Life-long learning: Ability to analyze individual needs and engage in updating in the context of technological changes.",
      ],
      psos: [
        "1. Specialized surface ornamentation skills for professional practice.",
        "2. Specialized designing and pattern making skills for professional practice.",
        "3. Modern software usage for apparel designing and manufacturing.",
      ],
      committee: [
        { name: "Dr. R.R. Ramteke In-Charge CDIC", designation: "Academic Expert-Member", experience: "25", organization: "Government Polytechnic Aurangabad" },
        { name: "Smt. Dr. Anvita Agrawal, HOD", designation: "Academic Expert- Member", experience: "20", organization: "Home science department, Mahila College, Aurangabad." },
        { name: "Smt.J.S.Lakade, I/C Head of Department, DDGM", designation: "Chairman", experience: "21", organization: "Government Polytechnic Aurangabad" },
        { name: "Smt. N.R. Lakhotiya, Senior lecturer, DDGM", designation: "Academic Expert-Member", experience: "19", organization: "Government Polytechnic Aurangabad" },
        { name: "Smt. M.P. Chavan, Senior lecturer, DDGM", designation: "Academic Expert-Member", experience: "13", organization: "Government Polytechnic Aurangabad" },
        { name: "Smt. Chetna Shetty", designation: "Industry Expert-Member", experience: "7", organization: "Freelance designer, Mumbai" },
        { name: "Shri Sakla Kiran", designation: "Industry Expert-Member", experience: "10", organization: "Director Sakla Uniforms, Aurangabad" },
        { name: "Smt.Priyanka Somani", designation: "Industry Expert-Member", experience: "10", organization: "Director Kalyani Creation,Aurangabad" },
        { name: "Smt.Pooja Rai Diwedi", designation: "Industry Expert-Member", experience: "20", organization: "Director,Casa,Amore" },
        { name: "Smt. Swati Khandagle", designation: "Alumni Expert-Member", experience: "5", organization: "Senior Guest lecturer, MGM, Aurangabad" },
        { name: "Smt. Tuba Mirza", designation: "Alumni Expert-Member", experience: "7", organization: "Guest Lecturer, SNDT college, Aurangabad." },
        { name: "Smt. A.V. Rammaiya", designation: "Special Invitee-Member", experience: "13", organization: "Government Polytechnic Aurangabad" },
        { name: "Smt. P.J.Lanjewar", designation: "Special Invitee-Member", experience: "11", organization: "Government Polytechnic Aurangabad" },
        { name: "Smt. A.L.Rode", designation: "Special Invitee-Member", experience: "13", organization: "Government Polytechnic Aurangabad" },
      ],
      faculty: [
        { name: "Prof. S. M. Gaikwad", role: "Professor & Head", phone: "+91 98765 43260", email: "sm.gaikwad@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "SEWING LAB", equipment: "Industrial Sewing Machines", area: "70.00", cost: "10,00,000", remarks: "" },
      ],
      labPhotos: ["/static/images/lab4.jpg.jpeg"],
    },

    // ─────────────── ELECTRICAL ───────────────
    electrical: {
      name: "Electrical Engineering",
      type: "diploma",
      sections: { 
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "To develop technicians and entrepreneurs of international standard in the area of smart renewable energy system through academic excellence, blended learning and industrial practices to sustain challenges of Industry and Society.",
      mission: ["To provide quality technician education and to create citizens having multifaceted proactive personality and life-long learning skills leading to enhancement in employment including self employment."],
      peos: [
        "1. PEO-1-To provide the fundamental knowledge of Electrical Engineering to pursue a career as practicing engineer consultant or entrepreneur in power, manufacturing, maintenance, testing and service sector.",
        "2. PEO-2-To inculcate basic life skills to function as individual, professionally in global competitive world as team-member and leader.",
        "3. PEO-3-To use creative and critical reasoning skills to solve technical problems, ethically and responsibly, in service to society.",
        "4. PEO-4-To provide an academic environment that assures excellence, transparency and engages in lifelong learning.",
      ],
      pos: [
        "1. Basic and Discipline specific knowledge: Apply knowledge of basic mathematics, science and engineering fundamentals and engineering specialization to solve Engineering problems.",
        "2. Problem Analysis : Identify and analyze well defined engineering problems using codified standard method.",
        "3. Design/development of solutions: Design solutions for well defined technical problems and assist with the design of systems components or processes to meet specific needs.",
        "4. Engineering tools, Experimentation and Testing: Apply modern engineering tools and appropriate technique to conduct standard tests and measurements.",
        "5. Engineering practices for society, sustainability and Environment: Apply appropriate technology in context of society, sustainability, environment and ethical practices.",
        "6. Project Management: use engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well defined engineering activities",
        "7. Life-long learning: Ability to analyze individual needs and engage in updating in the context of technological changes.",
      ],
      psos: [
        "1. PSO1-Modern Technology Usage: Manage operation and control of Machines",
        "2. PSO2-Maintain Power System Operations: Maintain the power system operations Generation, Transmission, Distribution and Utilization of Electrical Energy in the field of Electrical Engineering",
      ],
      committee: [
        { name: "Shri. A. C. TANDON", designation: "Director, Electrocontrols Midc, Waluj", experience: "28", organization: "Electrocontrols Midc, Waluj" },
        { name: "Shri.. DR. A. P. PARANJAPE", designation: "Retd. Associate Professor, PES COE, Aurangabad And Director, Chaitanya Electromagnets", experience: "35", organization: "PES COE, Aurangabad And Director, Chaitanya Electromagnets" },
        { name: "Shri. A. P. JOSHI", designation: "Asstt.Executive Engineer, Msetcl", experience: "22", organization: "MSETCL" },
        { name: "Shri. A.V. PATOLE", designation: "Plant Manager, Endurance Technologies Ltd,Midc, Waluj", experience: "28", organization: "Endurance Technologies Ltd,Midc, Waluj" },
        { name: "Shri.M. S.VAISHNAV", designation: "I/C Vice Principal And Head Dept Of Electrical Engg, Mit Polytechnic , Aurangabad", experience: "25", organization: "MIT Polytechnic , Aurangabad" },
      ],
      faculty: [
        { name: "Prof. N. B. Patil", role: "Professor & Head", phone: "+91 98765 43270", email: "nb.patil@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "ELECTRICAL MACHINES LAB", equipment: "Motors, Generators, Transformers", area: "80.00", cost: "15,00,000", remarks: "" },
      ],
      labPhotos: ["/static/images/lab2.jpg.jpeg"],
    },

    // ─────────────── ENTC ───────────────
    entc: {
      name: "Electronics and Telecommunication Engineering",
      type: "diploma",
      sections: { 
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "To be a centre of excellence, assuring competitive technical manpower for emerging trends in the field of Electronics & Telecommunication to address multidisciplinary sectors.",
      mission: [
        "M1. Strengthen the knowledge & skills to convert concept, idea into system for employability /entrepreneurship.",
        "M2. Develop software skills needed in the field of electronics.",
        "M3. Expose the students to industrial environment.",
        "M4. Build personality, teamwork spirit, professional ethics & social concern",
      ],
      peos: [
        "Inculcate profound knowledge of electronics & telecommunication",
        "Evolve software skills needed in the field of electronics.",
        "Provide nourishing environment for new concepts & ideas for problem solving and/or develop new system leads to entrepreneurship/employability.",
        "Build virtuous, gregarious, social concerned personality.",
      ],
      pos: [
        "Basic and Discipline specific knowledge: Apply knowledge of basic mathematics, science and engineering fundamentals and engineering specialization to solve Engineering problems.",
        "2. Problem Analysis : Identify and analyze well defined engineering problems using codified standard method.",
        "3. Design/development of solutions: Design solutions for well defined technical problems and assist with the design of systems components or processes to meet specific needs.",
        "4.Engineering tools, Experimentation and Testing: Apply modern engineering tools and appropriate technique to conduct standard tests and measurements.",
        "5. Engineering practices for society, sustainability and Environment: Apply appropriate technology in context of society, sustainability, environment and ethical practices.",
        "6. Project Management: use engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well defined engineering activities",
        "7. Life-long learning: Ability to analyze individual needs and engage in updating in the learning in the context of technological changes.",
      ],
      psos: [
        "Modern Software Usage: Use latest PCB making, programming, simulation, MATLAB, software for layout design, artwork, microcontroller programming.",
        "Scrutinize & control Electronics systems: Scrutinize right type of machinery, equipment’s, tools, models and software for implementation & control of particular Electronics & Telecommunication systems.",
      ],
      committee: [
        { name: "Shri. U T Nagdeve / Shri A S Abak", designation: "Chairman", experience: "25", organization: "Head of Dept. Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Shri. Jagdish Bangad", designation: "Member", experience: "25", organization: "Vice-President, Videocon Industries Ltd., Aurangabad" },
        { name: "Shri. Girish Datar", designation: "Member", experience: "20", organization: "Director, Flash Microsystems, Aurangabad" },
        { name: "Shri. Abhijeet Patil", designation: "Member", experience: "12", organization: "Director, Krish Automation, Aurangabad" },
        { name: "Shri. A D Joshi", designation: "Member", experience: "20", organization: "Dy. Secretary, RBTE Aurangabad" },
        { name: "Shri. G. B.Dongare", designation: "Member", experience: "18", organization: "Principal, CSMSS Institute of Polytechnic, Aurangabad" },
        { name: "Shri. A S Giri", designation: "Member", experience: "25", organization: "Controller of Examinations" },
        { name: "Shri. A.S.Abak", designation: "Member", experience: "30", organization: "Senior Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Shri. S.S.Mahajan", designation: "Member", experience: "24", organization: "Senior Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Shri. Dr. S.B.Dhoot", designation: "Member", experience: "25", organization: "Senior Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Shri. R.A.Burkul", designation: "Member", experience: "33", organization: "Senior Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Smt M S Rajule", designation: "Member", experience: "24", organization: "Senior Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Shri. A.D.Dabhade", designation: "Member", experience: "13", organization: "Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Smt. L.B.Kamkhede", designation: "Member", experience: "12", organization: "Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Smt. P.B.Nagargoje", designation: "Member", experience: "3", organization: "Lecturer, Electronics & Telecommunication Engg. Govt. Polytechnic Aurangabad" },
        { name: "Dr R R Ramteke", designation: "Member Secretary", experience: "25", organization: "CDIC Incharge" },
      ],
      faculty: [
        { name: "Prof. K. R. Shinde", role: "Professor & Head", phone: "+91 98765 43280", email: "kr.shinde@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "Analog Electronics", equipment: "", area: "", cost: " ", remarks: "" },
        { name: "Measurement and Power Electronics", equipment: "", area: "", cost: " ", remarks: "" },
        { name: "Microprocessor kit 8086 Microcontroller 8051 Digital trainer kit breadboard system", equipment: "", area: "", cost: " ", remarks: "" },
        { name: "Electronics Workshop", equipment: "", area: "", cost: " ", remarks: "" },
        { name: "Communication Lab", equipment: "", area: "", cost: " ", remarks: "" },
        { name: "Computer Center", equipment: "", area: "", cost: " ", remarks: "" },
        { name: "Project Lab", equipment: "", area: "", cost: " ", remarks: "" },
      ],
      labPhotos: ["/static/images/lab1.jpg.jpeg"],
    },

    // ─────────────── MECHANICAL ───────────────
    mechanical: {
      name: "Mechanical Engineering",
      type: "diploma",
      sections: { 
        about: true, visionMission: true, peos: true, pos: true, psos: true,
        committee: true, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "Center of excellence for employability and entrepreneurship through blended learning, incubator and collaborative practices.",
      mission: [
        "M1. Development of competent students for employability and entrepreneurship.",
        "M2. To encourage students to participate in technical competitions.",
        "M3. Exposure to the industrial practices.",
        "M4. To create a sense of social and environmental concern by inculcating humanitarian and ethical responsibilities.",
      ],
      peos: [
        "PEO 1: Provide students with the fundamental technical knowledge and skills in science, and engineering and to apply these abilities to implement solutions in practice.",
        "PEO 2: Provide students with necessary instructional and practical experience to work effectively in local and international environments and to become effective communicators.",
        "PEO 3: To provide an academic environment that gives adequate opportunity to the students to cultivate lifelong skills needed for a successful professional career.",
        "PEO 4: To inculcate professional and ethical attitude, team work, multidisciplinary approach, entrepreneurial thinking and an ability to relate Mechanical Engineering issues with social issues.",
      ],
      pos: [
        "1. Basic & Discipline Specific Knowledge Apply knowledge of basic mathematics, science, engineering fundamentals, and engineering specialization to solve engineering problems",
        "2. Problem Analysis Identify and analyze engineering problems using codified standard methods",
        "3. Design/Development of solutions Design solutions for well defined technical problems and assist with design system components, processes to meet the specific needs",
        "4. Engineering Tools, Experimentations & Testing Apply modern engineering tools and appropriate technique to conduct standard tests and measurements",
        "5. Engineering Practices for Society, Sustainability & Environment Apply appropriate technology in context of society, sustainability, environment ethical practices",
        "6. Project management Use engineering management principles individually, as a team member or a leader to manage projects and effectively communicate about well defined engineering activities",
        "7. Lifelong learning Ability to analyse individual needs and engaged in updating in the context of technological changes",
      ],
      psos: [
        "Use latest softwares & Innovations in area of Mechanical Engineering- Use latest softwares and innovations in the area of Mechanical Engineering",
        "Manage Manufacturing Process – Manage the manufacturing process by selection and scheduling right type of machinery, equipment, substrates and software for a particular job for economy of operations",
      ],
      committee: [
        { name: "Shri. Dr. A N Pawar", designation: "Chairman", experience: "35", organization: "G.P. Aurangabad" },
        { name: "Shri. A D Joshi, Deputy Secretary RBTE", designation: "Expert from MSBTE", experience: "9", organization: "RBTE , Aurangabad" },
        { name: "Shri. Purshottam Mhasalekar", designation: "Expert from Local industry", experience: "28", organization: "Endurance Technologies, Aurangabad" },
        { name: "Shri. G. K. Chahel", designation: "Expert from Local industry", experience: "33", organization: "Uma Sons Pvt. Ltd, Aurangabad" },
        { name: "Shri. Onkar Joshi", designation: "Expert from Local industry", experience: "25", organization: "Neocon Enterprises, Aurangabad" },
        { name: "Shri. G. G. Ghuge", designation: "Member", experience: "25", organization: "G.P. Aurangabad" },
        { name: "Shri. A A Joshi", designation: "Member", experience: "30", organization: "G.P. Aurangabad" },
        { name: "Shri. U Hiwrale", designation: "Member Secretary", experience: "22", organization: "G.P. Aurangabad" },
        { name: "Shri. R. N. Khadse", designation: "Expert from neighboring institute", experience: "27", organization: "G.P. Nashik" },
        { name: "Dr R R Ramteke", designation: "CDC In charge", experience: "25", organization: "G.P. Aurangabad" },
      ],
      faculty: [
        { name: "Prof. G. H. Kulkarni", role: "Professor & Head", phone: "+91 98765 43290", email: "gh.kulkarni@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "WORKSHOP", equipment: "Lathe, Milling, Drilling Machines", area: "150.00", cost: "25,00,000", remarks: "" },
        { name: "CAD/CAM LAB", equipment: "Workstations, AutoCAD, SolidWorks", area: "50.00", cost: "12,00,000", remarks: "" },
      ],
      labPhotos: ["/static/images/lab1.jpg.jpeg"],
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
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "To build a strong foundation in science and humanities for all engineering students.",
      mission: [
        "To provide fundamental knowledge in science, mathematics, and communication.",
        "To develop analytical thinking and language skills among students.",
      ],
      faculty: [
        { name: "Prof. L. M. Naik", role: "Head, Science & Humanities", phone: "+91 98765 43300", email: "lm.naik@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "PHYSICS LAB", equipment: "Optical Instruments, Meters", area: "50.00", cost: "6,00,000", remarks: "" },
        { name: "CHEMISTRY LAB", equipment: "Chemicals, Glassware", area: "50.00", cost: "5,00,000", remarks: "" },
      ],
      labPhotos: ["/static/images/lab4.jpg.jpeg"],
    },

    // ─────────────── APPLIED MECHANICS ───────────────
    "applied-mechanics": {
      name: "Applied Mechanics",
      type: "allied",
      sections: { 
        about: true, visionMission: true, peos: false, pos: false, psos: false,
        committee: false, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: true, profile: false,
        syllabus: true,
        questionPaper: true},
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
        { name: "Prof. H. J. Thombare", role: "Head, Applied Mechanics", phone: "+91 98765 43310", email: "hj.thombare@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
      labs: [
        { name: "MECHANICS LAB", equipment: "Testing Machines, Models", area: "60.00", cost: "8,00,000", remarks: "" },
      ],
      labPhotos: ["/static/images/lab3.jpg.jpeg"],
    },

    // ─────────────── WORKSHOP ───────────────
    workshop: {
      name: "Workshop",
      type: "allied",
      sections: { 
        about: true, visionMission: true, peos: false, pos: false, psos: false,
        committee: false, faculty: true, laboratory: true, labPhotos: true,
        achievements: true, magazine: true, salientFeatures: false, profile: false,
        syllabus: true,
        questionPaper: true},
      vision: "To provide excellent hands-on workshop training to all engineering students.",
      mission: [
        "To develop practical manufacturing skills among students.",
        "To provide exposure to various workshop processes and tools.",
      ],
      faculty: [
        { name: "Prof. B. T. Pawar", role: "Head, Workshop", phone: "+91 98765 43320", email: "bt.pawar@gpcsa.edu", image: "/static/images/director4.jpg" },
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
        achievements: true, magazine: true, salientFeatures: false, profile: true,
        syllabus: true,
        questionPaper: true},
      profile: "The Mercedes-Benz Advanced Diploma programme is a unique industry-academia collaboration designed to develop highly skilled automotive technicians. The programme combines theoretical learning with hands-on training at Mercedes-Benz facilities, preparing students for careers in premium automotive service and maintenance.",
      faculty: [
        { name: "Prof. A. S. Chavan", role: "Programme Coordinator", phone: "+91 98765 43330", email: "as.chavan@gpcsa.edu", image: "/static/images/director4.jpg" },
      ],
    },
  },
};
