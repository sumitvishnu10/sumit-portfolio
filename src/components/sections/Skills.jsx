import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function Skills() {
  const sectionRef = useRef(null);

  const skillCategories = [
    {
      title: 'FRONTEND',
      skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
      shape: '50% 50% 50% 50% / 45% 55% 45% 55%'
    },
    {
      title: 'BACKEND',
      skills: ['Node.js', 'Express.js', 'REST APIs'],
      shape: '48% 52% 47% 53% / 54% 46% 51% 49%'
    },
    {
      title: 'DATABASE',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL'],
      shape: '52% 48% 53% 47% / 49% 51% 46% 54%'
    },
    {
      title: 'TOOLS',
      skills: ['Git', 'GitHub', 'Postman', 'Vercel', 'VS Code'],
      shape: '49% 51% 50% 50% / 52% 48% 53% 47%'
    }
  ];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    let ctx = gsap.context(() => {
      gsap.set('.skill-category', { opacity: 0, y: 30, scale: 0.95 });
      
      const titleText = new SplitType('.skills-title', { types: 'words,chars' });
      gsap.set(titleText.chars, { opacity: 0, y: 20 });
      gsap.set('.ability-unlocked', { opacity: 0, y: -10, letterSpacing: '0px' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      if (!prefersReducedMotion) {
        tl.to('.ability-unlocked', {
          opacity: 1,
          y: 0,
          letterSpacing: '10px',
          duration: 1.2,
          ease: 'power2.out'
        })
        .to(titleText.chars, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power2.out'
        }, "-=0.8")
        .to('.ability-unlocked', {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in'
        }, "-=0.2")
        .to('.skill-category', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.2)'
        }, "-=0.2");
      } else {
        tl.to(titleText.chars, { opacity: 1, y: 0, duration: 0.5 })
          .to('.skill-category', { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills-landscape" style={{
      padding: '20vh 4vw',
      backgroundColor: 'var(--color-bg)',
      backgroundImage: "url('/assets/skills_meadow.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dark overlay for text readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(252, 250, 245, 0.85)', // var(--color-bg) with opacity
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '6rem' }}>
          <div className="ability-unlocked" style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '0.8rem',
            color: 'var(--color-secondary)',
            textTransform: 'uppercase',
            position: 'absolute',
            top: '-2rem',
            left: '0',
            right: '0'
          }}>
            SYSTEM: ABILITY UNLOCKED
          </div>
          <h2 className="skills-title" style={{ 
            fontFamily: 'var(--font-secondary)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            color: 'var(--color-primary)'
          }}>
            FIELD OF EXPERTISE
          </h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          justifyItems: 'center'
        }}>
          {skillCategories.map((category, idx) => (
            <div key={category.title} className="skill-category" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '3rem 2rem',
              backgroundColor: 'rgba(245, 241, 232, 0.4)', /* Very subtle warm cloud color */
              border: '1px solid rgba(125, 150, 95, 0.2)', /* Subtle grass border */
              borderRadius: category.shape,
              width: '100%',
              maxWidth: '320px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'var(--color-secondary)',
                marginBottom: '2rem',
                fontWeight: 600
              }}>
                {category.title}
              </h3>
              
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
              }}>
                {category.skills.map((skill) => (
                  <li key={skill} style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '1.05rem',
                    color: 'var(--color-text)',
                    opacity: 0.85
                  }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
