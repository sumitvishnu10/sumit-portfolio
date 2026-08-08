import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import MagneticButton from '../ui/MagneticButton';
import { SOCIAL_LINKS } from '../../config/links';

export default function Contact() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ctx = gsap.context(() => {
      // Setup initial states
      gsap.set('.contact-title', { opacity: 0 });
      gsap.set('.contact-button', { opacity: 0, y: 20 });
      gsap.set('.contact-overlay', { opacity: 1 }); // Start fully bright, fade down to reveal sunset

      const titleText = new SplitType('.contact-title', { types: 'words,chars' });
      gsap.set(titleText.chars, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });

      if (!prefersReducedMotion) {
        tl.to('.contact-overlay', {
          opacity: 0.4, // fade to original target
          duration: 2,
          ease: 'power2.inOut'
        })
        .to(titleText.chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power3.out'
        }, "-=1.5")
        .to('.contact-button', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        }, "-=1.2");
      } else {
        tl.to('.contact-overlay', { opacity: 0.4, duration: 0.5 })
          .to(titleText.chars, { opacity: 1, y: 0, duration: 0.5 })
          .to('.contact-button', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="contact-landscape" style={{ 
      position: 'relative',
      padding: '25vh 4vw 20vh', 
      backgroundColor: 'var(--color-cloud)', 
      backgroundImage: "url('/assets/contact_sunset.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center bottom',
      backgroundAttachment: 'fixed',
      color: 'var(--color-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      {/* Light Overlay for readability */}
      <div className="contact-overlay" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(245, 241, 232, 1)', // Start solid, animate to 0.4
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '0 auto' }}>
        <h2 className="contact-title" style={{ 
          fontFamily: 'var(--font-secondary)',
          fontSize: 'clamp(3rem, 7vw, 6rem)', 
          lineHeight: 1.1,
          color: 'var(--color-cloud)',
          marginBottom: '4rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          LET'S CREATE SOMETHING<br/>WORTH REMEMBERING.
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <MagneticButton className="contact-button" style={{ 
            backgroundColor: 'var(--color-cloud)', 
            color: 'var(--color-primary)',
            padding: '14px 32px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            border: 'none',
            fontFamily: 'var(--font-primary)',
            cursor: 'none'
          }} onClick={() => window.open(SOCIAL_LINKS.emailWithSubject, '_self')}>
            Contact Me
          </MagneticButton>
          <MagneticButton className="contact-button" style={{ 
            backgroundColor: 'transparent', 
            border: '1px solid var(--color-warm-sunlight)', 
            color: 'var(--color-warm-sunlight)',
            padding: '14px 32px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: 'var(--font-primary)',
            cursor: 'none'
          }} onClick={() => window.open(SOCIAL_LINKS.github, '_blank', 'noopener,noreferrer')}>
            GitHub
          </MagneticButton>
          <MagneticButton className="contact-button" style={{ 
            backgroundColor: 'transparent', 
            border: '1px solid var(--color-warm-sunlight)', 
            color: 'var(--color-warm-sunlight)',
            padding: '14px 32px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: 'var(--font-primary)',
            cursor: 'none'
          }} onClick={() => window.open(SOCIAL_LINKS.linkedin, '_blank', 'noopener,noreferrer')}>
            LinkedIn
          </MagneticButton>
        </div>
      </div>

    </section>
  );
}
