export const services = [
  {
    id: "railway",
    title: "Railway Infrastructure",
    shortDescription: "Building world-class railway stations and facilities for Indian Railways.",
    description: "We specialize in comprehensive railway infrastructure development including station buildings, platforms, railway colonies, officer quarters, and goods sheds. Our expertise spans the entire spectrum of railway construction from earth work and BG formation to modern amenities under schemes like Amrit Bharat.",
    icon: "🚂",
    highlights: [
      "Station Building & Modernization",
      "Platform Construction & Shelters",
      "Railway Colony Development",
      "Goods Shed Infrastructure",
      "Amrit Bharat Scheme Projects"
    ],
    projectCount: 12,
    keyProjects: ["Khatipura Railway Station", "NWR Officers Flats", "Rana Pratap Junction"]
  },
  {
    id: "government",
    title: "Government Buildings",
    shortDescription: "Constructing administrative buildings, police headquarters, and public facilities.",
    description: "We deliver high-quality government infrastructure projects including administrative complexes, police headquarters, court buildings, and public service centers. Our understanding of government regulations and standards ensures timely delivery of projects that serve the public interest.",
    icon: "🏛️",
    highlights: [
      "Administrative Complexes",
      "Police & Security Buildings",
      "Court Complexes",
      "Tax & Service Centers",
      "Public Housing Projects"
    ],
    projectCount: 15,
    keyProjects: ["Rajasthan Police HQ", "Kar Bhawan", "Court Complex Ganganagar"]
  },
  {
    id: "education",
    title: "Educational Institutions",
    shortDescription: "Creating inspiring learning environments for schools and universities.",
    description: "We build comprehensive educational facilities including schools, colleges, hostels, and training academies. From Kendriya Vidyalayas to Sainik Schools and professional institutions, we create spaces that inspire learning and growth.",
    icon: "🎓",
    highlights: [
      "School & College Buildings",
      "Hostel Facilities",
      "Auditoriums & Indoor Sports",
      "Training Academies",
      "Administrative Blocks"
    ],
    projectCount: 10,
    keyProjects: ["Sainik School Jhunjhunu", "ICAI Center of Excellence", "KV Nagaur"]
  },
  {
    id: "healthcare",
    title: "Healthcare Facilities",
    shortDescription: "Building modern healthcare infrastructure for hospitals and medical colleges.",
    description: "We construct state-of-the-art healthcare facilities including medical college buildings, doctor hostels, and hospital infrastructure. Our projects meet the stringent requirements of healthcare construction while ensuring functionality and patient comfort.",
    icon: "🏥",
    highlights: [
      "Medical College Infrastructure",
      "Hospital Buildings",
      "Doctor & Staff Hostels",
      "Lecture Theatres",
      "Support Facilities"
    ],
    projectCount: 4,
    keyProjects: ["SMS Medical College Hostel", "SMS Auditorium Complex"]
  },
  {
    id: "smartcity",
    title: "Smart City Projects",
    shortDescription: "Developing modern urban infrastructure for smart cities.",
    description: "We are at the forefront of smart city development, building multi-level car parkings, urban infrastructure, and modern public facilities. Our smart city projects combine innovative design with sustainable practices to create future-ready urban spaces.",
    icon: "🏙️",
    highlights: [
      "Multi-Level Car Parkings",
      "Underground Parking Facilities",
      "Urban Infrastructure",
      "Public Amenities",
      "Sustainable Design"
    ],
    projectCount: 5,
    keyProjects: ["High Court Underground Parking", "Chaugan Stadium Parking", "JDA HQ Parking"]
  }
];

export const getServiceById = (id) => services.find(s => s.id === id);
