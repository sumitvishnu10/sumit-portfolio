import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Experience() {
  const sectionRef = useRef(null);
  
  const experiences = [
    { 
      title: 'Founder & Full-Stack Developer', 
      company: 'NYXORA', 
      desc: 'Building innovative hardware-software solutions.' 
    },
    { 
      title: 'Freelance / Full-Stack Developer', 
      company: 'Celebrate', 
      desc: 'Delivered bespoke web projects for various clients.' 
    },
    { 
      title: 'Startup Hackathon / Full-Stack + IoT Integration', 
      company: 'CHITTI 4.0', 
      desc: 'An advanced IoT based system integrating hardware components with a scalable MERN backend.' 
    }
  ];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mm = gsap.matchMedia();

    let ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.timeline-road-fill', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('.experience-card', { opacity: 0, y: 50 });
      gsap.set('.milestone-marker', { scale: 0, opacity: 0 });

      if (!prefersReducedMotion) {
        // Draw the vertical line as user scrolls
        gsap.to('.timeline-road-fill', {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        });

        // Reveal each milestone when the line reaches it
        const cards = gsap.utils.toArray('.experience-row');
        cards.forEach((row, i) => {
          const card = row.querySelector('.experience-card');
          const marker = row.querySelector('.milestone-marker');
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 60%',
              toggleActions: 'play none none reverse'
            }
          });

          tl.to(marker, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)'
          })
          .to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out'
          }, "-=0.2");
        });
      } else {
        // Reduced motion
        gsap.to('.timeline-road-fill', { scaleY: 1, duration: 1, scrollTrigger: { trigger: '.timeline-container', start: 'top center' } });
        gsap.to(['.experience-card', '.milestone-marker'], {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1,
          scrollTrigger: { trigger: '.timeline-container', start: 'top 60%' }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience-landscape" style={{ 
      padding: '20vh 4vw', 
      backgroundColor: 'var(--color-cloud)',
      backgroundImage: "url('/assets/experience_road.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      {/* Light overlay for readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(245, 241, 232, 0.7)',
        zIndex: 0
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
      <h2 style={{ 
        fontFamily: 'var(--font-secondary)',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        textAlign: 'center',
        marginBottom: '10rem',
        color: 'var(--color-primary)'
      }}>
        THE JOURNEY SO FAR
      </h2>

      <div className="timeline-container" style={{
        position: 'relative',
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 2vw'
      }}>
        {/* Winding Road Graphic Base */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          backgroundColor: 'var(--color-earth)',
          opacity: 0.2
        }}></div>
        
        {/* Animated Road Fill */}
        <div className="timeline-road-fill" style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 0 10px rgba(38, 59, 43, 0.5)',
          zIndex: 1
        }}></div>

        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={`${exp.company}-${index}`} className="experience-row" style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-start' : 'flex-end',
              width: '100%',
              marginBottom: '8rem',
              position: 'relative'
            }}>
              
              {/* Milestone Marker */}
              <div className="milestone-marker" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-warm-sunlight)',
                border: '4px solid var(--color-primary)',
                zIndex: 2,
                boxShadow: '0 0 15px rgba(204, 119, 34, 0.6)'
              }}></div>

              {/* Content Card */}
              <div className="experience-card" style={{
                width: '45%',
                padding: '2.5rem',
                backgroundColor: 'var(--color-cloud)',
                borderRadius: '16px',
                border: '1px solid rgba(138, 113, 88, 0.2)', // earthy border
                boxShadow: '0 10px 30px rgba(38, 59, 43, 0.05)',
                textAlign: isLeft ? 'right' : 'left'
              }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-secondary)',
                  fontSize: '2.5rem', 
                  lineHeight: 1, 
                  marginBottom: '1rem',
                  color: 'var(--color-primary)'
                }}>
                  {exp.company}
                </h3>
                <h4 style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1rem', 
                  color: 'var(--color-secondary)', 
                  marginBottom: '1.5rem', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {exp.title}
                </h4>
                <p style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1.05rem', 
                  lineHeight: 1.6,
                  color: 'var(--color-text)',
                  opacity: 0.8
                }}>
                  {exp.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}
