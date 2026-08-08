import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SOCIAL_LINKS } from '../../config/links';

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ctx = gsap.context(() => {
      gsap.set('.footer-item', { opacity: 0, y: 50 });

      if (!prefersReducedMotion) {
        gsap.to('.footer-item', {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          }
        });
      } else {
        gsap.to('.footer-item', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
          }
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} style={{
      padding: '10vh 4vw 4vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-cloud)',
      textAlign: 'center',
      gap: '3rem',
      overflow: 'hidden'
    }}>
      <div className="footer-item" style={{
        fontFamily: 'var(--font-secondary)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 400,
        fontStyle: 'italic',
        opacity: 0.9
      }}>
        "Every journey starts somewhere."
      </div>
      
      <div className="footer-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <h3 style={{ 
          fontFamily: 'var(--font-primary)', 
          fontSize: '1.2rem', 
          fontWeight: 600, 
          letterSpacing: '2px', 
          textTransform: 'uppercase',
          color: 'var(--color-warm-sunlight)'
        }}>
          SUMIT VISHNU M
        </h3>
        <p style={{ 
          fontSize: '0.9rem', 
          letterSpacing: '1px', 
          opacity: 0.8,
          textTransform: 'uppercase'
        }}>
          Full-Stack Developer
        </p>
      </div>

      <div className="footer-item" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="clickable" style={{ fontSize: '0.85rem', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, transition: 'opacity 0.3s' }}>GitHub</a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="clickable" style={{ fontSize: '0.85rem', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, transition: 'opacity 0.3s' }}>LinkedIn</a>
        <a href={SOCIAL_LINKS.email} className="clickable" style={{ fontSize: '0.85rem', color: 'inherit', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8, transition: 'opacity 0.3s' }}>Email</a>
      </div>

      <div className="footer-item" style={{ fontSize: '0.75rem', opacity: 0.5, marginTop: '2rem' }}>
        © 2026
      </div>
    </footer>
  );
}
