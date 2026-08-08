import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const changeColor = (bg, text) => {
      gsap.to(containerRef.current, {
        '--color-bg': bg,
        '--color-cloud': bg,
        '--color-soft-sky': bg,
        '--color-text': text || '#253129',
        duration: 1.5,
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    };

    let ctx = gsap.context(() => {
      // Default / Hero / About - Forest
      ScrollTrigger.create({
        trigger: '#about', start: 'top 50%', end: 'bottom 50%',
        onEnter: () => changeColor('#FCFAF5'),
        onEnterBack: () => changeColor('#FCFAF5')
      });
      // Skills - Grassland
      ScrollTrigger.create({
        trigger: '#skills', start: 'top 50%', end: 'bottom 50%',
        onEnter: () => changeColor('#E8F0E1'),
        onEnterBack: () => changeColor('#E8F0E1')
      });
      // Projects - Sunset
      ScrollTrigger.create({
        trigger: '#projects', start: 'top 50%', end: 'bottom 50%',
        onEnter: () => changeColor('#F4E3D7'),
        onEnterBack: () => changeColor('#F4E3D7')
      });
      // Experience - Twilight
      ScrollTrigger.create({
        trigger: '#experience', start: 'top 50%', end: 'bottom 50%',
        onEnter: () => changeColor('#E1E0EA'),
        onEnterBack: () => changeColor('#E1E0EA')
      });
      // Contact - Night
      ScrollTrigger.create({
        trigger: '#contact', start: 'top 60%', end: 'bottom 50%',
        onEnter: () => changeColor('#1E212B', '#F5F1E8'),
        onEnterBack: () => changeColor('#1E212B', '#F5F1E8')
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ 
      backgroundColor: 'var(--color-bg)', 
      color: 'var(--color-text)',
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>
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
    </div>
  );
}
