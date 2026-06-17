import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { CourseModes } from '../components/CourseModes';
import { FeaturedCourses } from '../components/FeaturedCourses';
import { Contact } from '../components/Contact';
// import { Subscription } from '../components/Subscription';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <CourseModes />
      <FeaturedCourses />
      {/* <Subscription /> */}
      <Contact />
    </main>
  );
};
