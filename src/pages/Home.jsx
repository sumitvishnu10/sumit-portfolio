import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Skills from '../components/sections/Skills';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import GithubProjects from '../components/sections/GithubProjects';
import Certifications from '../components/sections/Certifications';
import Contact from '../components/sections/Contact';

import NyxoraSection from '../components/sections/NyxoraSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <GithubProjects />
        <Experience />
        <Certifications />
        <NyxoraSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
