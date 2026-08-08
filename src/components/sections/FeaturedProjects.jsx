import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { PROJECT_LINKS } from '../../config/links';
import SplitType from 'split-type';

export default function FeaturedProjects() {
  const sectionRef = useRef(null);

  const projects = [
    {
      id: 'figureverse',
      num: '01',
      title: 'FIGUREVERSE',
      desc: 'Anime E-Commerce Platform',
      tech: ['React', 'Node', 'MongoDB'],
      image: '/projects/figureverse.png'
    },
    {
      id: 'celebrate',
      num: '02',
      title: 'CELEBRATE',
      desc: 'Event Management Marketplace',
      tech: ['React', 'Express', 'Tailwind'],
      image: '/projects/celebrate.png'
    },
    {
      id: 'chitti-4-0',
      num: '03',
      title: 'CHITTI 4.0',
      desc: 'Smart Agricultural Protection System',
      tech: ['React', 'Node.js', 'ESP32', 'MongoDB'],
      image: '/projects/chitti.png'
    },
    {
      id: 'kevin-sports',
      num: '04',
      title: 'KEVIN SPORTS',
      desc: 'Premium Sports Landing Page',
      tech: ['Next.js', 'Prisma', 'PostgreSQL'],
      image: '/projects/kevin-sports.png'
    }
  ];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mm = gsap.matchMedia();
    
    let ctx = gsap.context(() => {
      // Title reveal
      const titleText = new SplitType('.projects-title', { types: 'chars' });
      gsap.set(titleText.chars, { opacity: 0, y: 20 });
      gsap.to(titleText.chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

      if (!prefersReducedMotion) {
        mm.add("(min-width: 1024px)", () => {
          // Horizontal scrolling on desktop
          let container = document.querySelector(".projects-track");
          
          let scrollTween = gsap.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              scrub: 1,
              start: "center center",
              end: () => "+=" + (container.scrollWidth - window.innerWidth),
              invalidateOnRefresh: true
            }
          });

          // Horizontal image parallax
          gsap.utils.toArray('.project-image').forEach((img) => {
            gsap.fromTo(img, 
              { x: -30 },
              {
                x: 30,
                ease: "none",
                scrollTrigger: {
                  trigger: img.closest('.project-card'),
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true
                }
              }
            );
          });
          
          // Hover interactions using GSAP
          const cards = document.querySelectorAll('.project-card');
          cards.forEach((card) => {
            const img = card.querySelector('.project-image');
            
            card.addEventListener('mouseenter', () => {
              gsap.to(card, { scale: 1.015, duration: 0.5, ease: 'power3.out' });
              gsap.to(img, { scale: 1.03, duration: 0.6, ease: 'power3.out' });
            });
            card.addEventListener('mouseleave', () => {
              gsap.to(card, { scale: 1, duration: 0.5, ease: 'power3.out' });
              gsap.to(img, { scale: 1, duration: 0.6, ease: 'power3.out' });
            });
          });
        });

        mm.add("(max-width: 1023px)", () => {
          // Vertical layout reveals for mobile/tablet
          gsap.from('.project-card', {
            opacity: 0,
            scale: 0.96,
            y: 40,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.projects-track',
              start: 'top 85%'
            }
          });

          // Vertical image parallax
          gsap.utils.toArray('.project-image').forEach((img) => {
            gsap.fromTo(img, 
              { y: -15 },
              {
                y: 15,
                ease: "none",
                scrollTrigger: {
                  trigger: img.closest('.project-card'),
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true
                }
              }
            );
          });
        });
      } else {
        // Reduced motion fallback
        gsap.to('.project-card', {
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.projects-track',
            start: 'top 85%'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{ 
      padding: '20vh 0', // Removed horizontal padding for edge-to-edge scroll
      backgroundColor: 'var(--color-bg)',
      overflow: 'hidden'
    }}>
      <h2 className="projects-title" style={{ 
        fontFamily: 'var(--font-secondary)',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        textAlign: 'center',
        marginBottom: '6rem',
        color: 'var(--color-primary)',
        padding: '0 4vw'
      }}>
        PLACES I'VE BUILT
      </h2>

      <div className="projects-track" style={{ 
        display: 'flex', 
        gap: '4vw',
        padding: '0 4vw', // Side padding inside the track
        width: 'max-content', // Allows horizontal scrolling
        margin: '0 auto'
      }}>
        {projects.map((proj) => {
          const links = PROJECT_LINKS[proj.id] || {};
          return (
          <div key={proj.id} className="project-card" style={{
            backgroundColor: 'var(--color-cloud)',
            border: '1px solid rgba(138, 113, 88, 0.2)',
            borderRadius: '16px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '450px', // Fixed width for horizontal scrolling
            maxWidth: '90vw', // Responsive fallback for mobile
            flexShrink: 0 // Prevent shrinking in flex container
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '300px',
              backgroundColor: 'var(--color-soft-sky)',
              overflow: 'hidden'
            }}>
              <img 
                className="project-image"
                src={proj.image} 
                alt={proj.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.9,
                  transform: 'scale(1)' // Base state for GSAP
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent 60%, var(--color-cloud) 100%)',
                pointerEvents: 'none'
              }}></div>
            </div>

            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ 
                fontFamily: 'var(--font-secondary)', 
                fontSize: '1.2rem', 
                color: 'var(--color-warm-sunlight)',
                marginBottom: '1rem',
                fontStyle: 'italic'
              }}>
                {proj.num}
              </div>
              
              <h3 style={{ 
                fontFamily: 'var(--font-primary)', 
                fontSize: '1.5rem', 
                fontWeight: 600, 
                color: 'var(--color-primary)',
                letterSpacing: '1px',
                marginBottom: '0.5rem'
              }}>
                {proj.title}
              </h3>
              
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1rem',
                color: 'var(--color-secondary)',
                marginBottom: '2rem',
                lineHeight: 1.6
              }}>
                {proj.desc}
              </p>
              
              <div style={{ 
                fontFamily: 'var(--font-primary)',
                fontSize: '0.85rem',
                color: 'var(--color-text)',
                opacity: 0.7,
                marginBottom: '2.5rem',
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {proj.tech.map((t, i) => (
                  <span key={i}>
                    {t}{i < proj.tech.length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
              
              <div style={{ marginTop: 'auto', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link to={`/project/${proj.id}`} className="clickable" style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  View Project <span style={{ color: 'var(--color-warm-sunlight)' }}>→</span>
                </Link>
                
                {links.liveUrl && (
                  <a href={links.liveUrl} target="_blank" rel="noopener noreferrer" className="clickable" style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    Live Demo
                  </a>
                )}
                
                {links.githubUrl && (
                  <a href={links.githubUrl} target="_blank" rel="noopener noreferrer" className="clickable" style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        )})}
      </div>
    </section>
  );
}
