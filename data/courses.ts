import { Course } from '../types';

export const dummyVideos = [
  { id: 'v1', title: 'Introduction & Setup', duration: '15:20', isFree: true },
  { id: 'v2', title: 'Core Concepts Part 1', duration: '45:10' },
  { id: 'v3', title: 'Core Concepts Part 2', duration: '42:30' },
  { id: 'v4', title: 'Advanced Techniques', duration: '55:00' },
  { id: 'v5', title: 'Real-world Project', duration: '1:20:00' },
];

const baseCourses: Course[] = [
  {
    id: 'fullstack',
    title: "Full Stack Development",
    description: "Learn to build complete web applications from frontend to backend.",
    level: "All Levels",
    duration: "6 Months",
    image: "/Hir-stack/fullstack.jpeg",
    price: "$2,499",
    videos: dummyVideos
  },
  {
    id: 'ai-ml',
    title: "AI & Machine Learning",
    description: "Master algorithms and model training to build intelligent systems.",
    level: "Intermediate",
    duration: "8 Months",
    image: "/Hir-stack/ai.jpeg",
    price: "$3,200",
    videos: dummyVideos
  },
  {
    id: 'cloud',
    title: "Cloud Engineering",
    description: "Deploy scalable, reliable and secure applications on modern cloud infrastructure.",
    level: "Advanced",
    duration: "4 Months",
    image: "/Hir-stack/cloud.jpeg",
    price: "$2,100",
    videos: dummyVideos
  },
  {
    id: 'security',
    title: "Cybersecurity Specialist",
    description: "Protect systems and networks from digital attacks.",
    level: "Beginner",
    duration: "5 Months",
    image: "/Hir-stack/security.jpeg",
    price: "$2,800",
    videos: dummyVideos
  }
];

const generatedCourses: Course[] = Array.from({ length: 16 }).map((_, i) => {
  const num = i + 5;
  return {
    id: `course-${num}`,
    title: `Course ${num}`,
    description: `A comprehensive guide and curriculum for Course ${num}.`,
    level: "Intermediate",
    duration: "3 Months",
    image: "/Hir-stack/fullstack.jpeg", // using an existing image as placeholder
    price: "$1,999",
    videos: dummyVideos
  };
});

export const courses: Course[] = [...baseCourses, ...generatedCourses];
