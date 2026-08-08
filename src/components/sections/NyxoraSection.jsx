import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import MagneticButton from '../ui/MagneticButton';

export default function NyxoraSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ctx = gsap.context(() => {
      // Initial states
      gsap.set('.nyxora-overlay', { opacity: 0 }); // Start without dark overlay, animate it in
      gsap.set('.nyxora-content > *', { opacity: 0, y: 30 });
      
      const titleText = new SplitType('.nyxora-title', { types: 'chars' });
      gsap.set(titleText.chars, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse'
        }
      });

      if (!prefersReducedMotion) {
        tl.to('.nyxora-overlay', {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.inOut'
        })
        .to('.nyxora-subtitle', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, "-=0.5")
        .to(titleText.chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out'
        }, "-=0.6")
        .to('.nyxora-desc', {
          opacity: 0.9, // target opacity
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, "-=0.4")
        .to('.nyxora-cta', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, "-=0.6");
      } else {
        tl.to('.nyxora-overlay', { opacity: 1, duration: 0.5 })
          .to('.nyxora-content > *', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="nyxora" ref={sectionRef} style={{
      padding: '20vh 4vw',
      backgroundColor: 'var(--color-primary)', // Dark forest green base
      backgroundImage: "url('/assets/nyxora_forest.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: 'var(--color-cloud)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dark Twilight Overlay */}
      <div className="nyxora-overlay" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(38, 59, 43, 0.7) 0%, rgba(38, 59, 43, 0.98) 100%)',
        zIndex: 0
      }}></div>

      <div className="nyxora-content" style={{ zIndex: 2, maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 className="nyxora-subtitle" style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: 'var(--color-warm-sunlight)',
          marginBottom: '2rem'
        }}>
          BUILDING SOMETHING OF MY OWN
        </h4>
        
        <h2 className="nyxora-title" style={{
          fontFamily: 'var(--font-secondary)',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 600,
          color: 'var(--color-cloud)',
          marginBottom: '2rem',
          lineHeight: 1
        }}>
          NYXORA
        </h2>

        <p className="nyxora-desc" style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '1.1rem',
          lineHeight: 1.8,
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto 3rem',
          color: 'var(--color-soft-sky)'
        }}>
          A digital agency focused on building next-generation web applications, immersive experiences, and scalable software solutions. Merging aesthetics with powerful engineering.
        </p>

        <MagneticButton className="nyxora-cta" onClick={() => window.open('https://nyxora.com', '_blank', 'noopener,noreferrer')} style={{
          backgroundColor: 'transparent',
          border: '1px solid var(--color-warm-sunlight)',
          color: 'var(--color-warm-sunlight)',
          padding: '12px 32px',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontSize: '0.85rem',
          borderRadius: '30px'
        }}>
          Discover Nyxora
        </MagneticButton>
      </div>
    </section>
  );
}
