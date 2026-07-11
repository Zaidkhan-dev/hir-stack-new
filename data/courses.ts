import { Course } from '../types';

const getAssetPath = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

const generateDummyVideos = (courseId: string, courseTitle: string) => [
  { id: `${courseId}-v1`, title: `Introduction & Interface Setup`, duration: '15:30', isFree: true },
  { id: `${courseId}-v2`, title: `Core Tools & Fundamental Workflows`, duration: '32:15' },
  { id: `${courseId}-v3`, title: `Hands-on Project & Practical Drafting`, duration: '45:10' },
  { id: `${courseId}-v4`, title: `Advanced Design & Optimization`, duration: '40:45' },
  { id: `${courseId}-v5`, title: `Final Assessment & Portfolio Building`, duration: '28:20' },
];

export const courses: Course[] = [
  // Top level (No category - shown only in All section at the top)
  {
    id: 'fullstack',
    title: "Full Stack Development",
    description: "Master modern web development from database to user interface. Build responsive frontends with React and robust backends with Node.js/Express.",
    duration: "6 Months",
    level: "All Levels",
    image: getAssetPath("fullstack.jpeg"),
    videos: generateDummyVideos('fullstack', 'Full Stack Development')
  },
  {
    id: 'ai-ml',
    title: "AI and Machine Learning",
    description: "Dive deep into neural networks, supervised/unsupervised learning, data analysis, and predictive models using Python and TensorFlow.",
    duration: "8 Months",
    level: "Intermediate",
    image: getAssetPath("ai.jpeg"),
    videos: generateDummyVideos('ai-ml', 'AI and Machine Learning')
  },
  {
    id: 'cloud',
    title: "Cloud Engineering",
    description: "Architect secure, scalable, and resilient cloud infrastructures. Learn containerization, Kubernetes, CI/CD pipelines, and AWS/Azure deployment.",
    duration: "4 Months",
    level: "Advanced",
    image: getAssetPath("cloud.jpeg"),
    videos: generateDummyVideos('cloud', 'Cloud Engineering')
  },
  {
    id: 'security',
    title: "Cybersecurity",
    description: "Protect systems, networks, and databases from advanced digital security threats. Learn penetration testing, ethical hacking, and threat mitigation.",
    duration: "5 Months",
    level: "Beginner",
    image: getAssetPath("security.jpeg"),
    videos: generateDummyVideos('security', 'Cybersecurity')
  },

  // Civil Section
  {
    id: 'autocad-civil',
    title: "AutoCAD/CIVIL",
    description: "Master AutoCAD for civil engineering. Design precise site plans, floor plans, structural layouts, and civil designs conforming to industry drafting standards.",
    duration: "60 Hours",
    level: "Beginner",
    category: "Civil",
    image: getAssetPath("banners/AUTOCAD_ELEC_HirStack.png"),
    videos: generateDummyVideos('autocad-civil', 'AutoCAD/CIVIL')
  },
  {
    id: 'bim-civil',
    title: "BIM(Building Information Modeling)/CIVIL",
    description: "Learn BIM workflows, tools, and processes for civil engineering. Design, model, and manage building and infrastructure assets collaboratively.",
    duration: "120 Hours",
    level: "Advanced",
    category: "Civil",
    image: getAssetPath("banners/BIM_CIVIL_HirStack.png"),
    videos: generateDummyVideos('bim-civil', 'BIM/CIVIL')
  },
  {
    id: 'mep-civil',
    title: "MEP/CIVIL",
    description: "Understand Mechanical, Electrical, and Plumbing engineering workflows from a civil integration perspective. Plan and analyze utility routing and building services.",
    duration: "90 Hours",
    level: "Intermediate",
    category: "Civil",
    image: getAssetPath("banners/MEP_CIVIL_HirStack.png"),
    videos: generateDummyVideos('mep-civil', 'MEP/CIVIL')
  },
  {
    id: 'revit-civil',
    title: "Revit/CIVIL",
    description: "Construct details and 3D architectural/structural models using Autodesk Revit. Streamline project execution with building information modeling.",
    duration: "120 Hours",
    level: "Advanced",
    category: "Civil",
    image: getAssetPath("banners/Revit_HirStack.png"),
    videos: generateDummyVideos('revit-civil', 'Revit/CIVIL')
  },

  // Mechanical Section
  {
    id: 'cad-cam-cae-mechanical',
    title: "CAD-CAM-CAE/Mechanical",
    description: "Master integrated computer-aided design, manufacturing, and engineering for mechanical components, assemblies, and manufacturing processes.",
    duration: "120 Hours",
    level: "Advanced",
    category: "Mechanical",
    image: getAssetPath("banners/CAD_CA_CAE_HirStack.png"),
    videos: generateDummyVideos('cad-cam-cae-mechanical', 'CAD-CAM-CAE/Mechanical')
  },
  {
    id: 'mep-mechanical',
    title: "MEP/Mechanical",
    description: "Gain specialized training in HVAC, firefighting, and plumbing systems design for mechanical engineers according to global standards.",
    duration: "90 Hours",
    level: "Intermediate",
    category: "Mechanical",
    image: getAssetPath("banners/MEP_HirStack.png"),
    videos: generateDummyVideos('mep-mechanical', 'MEP/Mechanical')
  },
  {
    id: 'solidworks-mechanical',
    title: "SolidWorks",
    description: "Create complex mechanical models, stress analysis simulations, and assembly animations using the industry-standard SolidWorks suite.",
    duration: "90 Hours",
    level: "Intermediate",
    category: "Mechanical",
    image: getAssetPath("banners/SolidWork_HirStack.png"),
    videos: generateDummyVideos('solidworks-mechanical', 'SolidWorks')
  },
  {
    id: 'catia-mechanical',
    title: "CATIA",
    description: "Learn advanced parametric styling, sheet metal design, surface modeling, and assembly generation within the CATIA design platform.",
    duration: "90 Hours",
    level: "Intermediate",
    category: "Mechanical",
    image: getAssetPath("banners/CATIA_HirStack.png"),
    videos: generateDummyVideos('catia-mechanical', 'CATIA')
  },
  {
    id: 'ansys-mechanical',
    title: "Ansys(Static Analysis)",
    description: "Perform finite element analysis (FEA) and static structural analysis. Simulate stresses, strains, deflections, and structural reactions for mechanical designs.",
    duration: "60 Hours",
    level: "Advanced",
    category: "Mechanical",
    image: getAssetPath("banners/Ansys_HirStack.png"),
    videos: generateDummyVideos('ansys-mechanical', 'Ansys')
  },

  // Electrical Section
  {
    id: 'autocad-electrical',
    title: "AutoCAD/Electrical",
    description: "Generate electrical schematic drawings, panel layouts, PLC I/O diagrams, and wiring schedules with AutoCAD Electrical toolset.",
    duration: "60 Hours",
    level: "Beginner",
    category: "Electrical",
    image: getAssetPath("banners/AUTOCAD_ELEC_HirStack.png"),
    videos: generateDummyVideos('autocad-electrical', 'AutoCAD/Electrical')
  },
  {
    id: 'plc-electrical',
    title: "PLC",
    description: "Program and integrate Programmable Logic Controllers (PLCs). Write logic, troubleshoot systems, and build automated control panel interfaces for industrial automation.",
    duration: "60 Hours",
    level: "Intermediate",
    category: "Electrical",
    image: getAssetPath("banners/MEP2_HirStack.png"),
    videos: generateDummyVideos('plc-electrical', 'PLC')
  }
];
