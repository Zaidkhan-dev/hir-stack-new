import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { CourseModes } from '../components/CourseModes';
import { FeaturedCourses } from '../components/FeaturedCourses';
import { Subscription } from '../components/Subscription';
import { Testimonials } from '../components/Testimonials';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <About />
      <CourseModes />
      <FeaturedCourses />
      <Subscription />
      <Testimonials />
    </main>
  );
};
