import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
  const heroRef = useRef(null);
  
  useLayoutEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    let ctx = gsap.context(() => {
      // 1. INITIAL PAGE LOAD — CINEMATIC OPENING
      const tl = gsap.timeline();
      
      // Setup Initial States
      gsap.set('.hero-content-elem', { opacity: 0, y: 20 });
      gsap.set('.layer', { opacity: 0 });
      gsap.set('.intro-overlay', { backgroundColor: '#000' });
      gsap.set('.energy-line', { scaleX: 0, opacity: 1, transformOrigin: 'left center' });
      
      // Split text for main title
      const titleText = new SplitType('.hero-main-title', { types: 'lines,words' });
      gsap.set(titleText.words, { opacity: 0, y: 20 });

      // Animation Sequence
      tl.to('.energy-line', {
        scaleX: 1,
        duration: 1.2,
        ease: 'power4.inOut'
      })
      .to('.energy-line', {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power3.out'
      })
      .to('.layer', {
        opacity: 1,
        duration: 2.5,
        stagger: 0.15,
        ease: 'power2.out'
      }, "-=0.3")
      .to('.intro-overlay', {
        opacity: 0,
        duration: 2,
        ease: 'power2.inOut'
      }, "-=2.5")
      .to(titleText.words, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: 'power4.out'
      }, "-=1.8")
      .to('.hero-content-elem', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }, "-=1.2");

      if (!prefersReducedMotion) {
        // 2. HERO LANDSCAPE PARALLAX & CAMERA FEEL (Scroll-Based)
        // Camera scale feel
        gsap.to('.hero-landscape-container', {
          scale: 1.03,
          y: '5%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });

        // Layer parallax (extremely subtle)
        gsap.to('.hero-sky', {
          y: '15%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.hero-clouds', {
          y: '12%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.hero-mountains', {
          y: '8%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.hero-trees', {
          y: '5%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.hero-grass-background, .hero-grass-middle, .hero-road', {
          y: '2%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.hero-grass-foreground', {
          y: '-5%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
        gsap.to('.hero-foreground', {
          y: '-15%',
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
        
        // Sunlight scroll behavior
        gsap.to('.hero-sun-wrapper', {
          opacity: 0,
          y: '10%',
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });

        // 3. CLOUD WIND MOVEMENT (Extremely slow, infinite drift)
        gsap.fromTo('.hero-clouds', 
          { x: '-2%' },
          { x: '2%', duration: 60, repeat: -1, ease: 'none', yoyo: true }
        );

        // 4. GRASS WIND EFFECT (Extremely subtle)
        gsap.to('.hero-grass-foreground', {
          rotation: 1,
          skewX: 0.5,
          x: 2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'bottom center'
        });
        gsap.to('.hero-grass-middle', {
          rotation: -0.8,
          skewX: -0.5,
          x: -1,
          duration: 4.5,
          delay: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'bottom center'
        });
        gsap.to('.hero-grass-background', {
          rotation: 0.5,
          skewX: 0.2,
          duration: 5,
          delay: 1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'bottom center'
        });

        // 5. WIND WAVE
        gsap.to('.wind-wave', {
          x: '100vw',
          opacity: 0.05,
          duration: 8,
          repeat: -1,
          ease: 'none',
          delay: 2
        });

        // 6. SUNLIGHT / ATMOSPHERE (Soft breathing)
        gsap.set('.hero-sun', { opacity: 0.12 });
        gsap.to('.hero-sun', {
          opacity: 0.16,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="hero"
      id="home"
      ref={heroRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
    >
      {/* Intro Overlay */}
      <div className="intro-overlay" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 100,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="energy-line" style={{
          height: '1px',
          width: '100%',
          backgroundColor: 'var(--color-cloud)',
          boxShadow: '0 0 10px var(--color-warm-sunlight)'
        }}></div>
      </div>

      <div className="hero-landscape-container" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
        <div className="layer hero-sky" style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url('/assets/hero_base.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 1
        }}></div>
        <div className="layer hero-clouds" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}></div>
        <div className="layer hero-mountains" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 3 }}></div>
        <div className="layer hero-trees" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 4 }}></div>
        
        <div className="layer hero-grass-background" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 5 }}></div>
        <div className="layer hero-grass-middle" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 6 }}></div>
        <div className="layer hero-road" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 7 }}></div>
        <div className="layer hero-grass-foreground" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 8 }}></div>
        
        <div className="wind-wave" style={{ 
          position: 'absolute', top: '50%', left: '-20%', width: '30%', height: '50%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
          transform: 'skewX(-20deg)',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 9
        }}></div>

        <div className="layer hero-sun-wrapper" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, pointerEvents: 'none' }}>
          <div className="layer hero-sun" style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'radial-gradient(circle at 35% 20%, rgba(244, 215, 154, 1) 0%, rgba(244, 215, 154, 0.4) 30%, rgba(244, 215, 154, 0.1) 60%, transparent 80%)',
          }}></div>
        </div>
      </div>

      {/* Foreground Content */}
      <div className="hero-foreground" style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        color: 'var(--color-text)',
        padding: '0 4vw',
        marginTop: '-5vh'
      }}>
        <div className="hero-content-elem" style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '1.2rem',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          fontWeight: 600,
          color: 'var(--color-primary)',
          marginBottom: '1rem'
        }}>
          Full-Stack Developer
        </div>

        <h1 className="hero-main-title" style={{
          fontFamily: 'var(--font-secondary)',
          fontStyle: 'italic',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          fontWeight: 500,
          letterSpacing: '2px', // Slight spacing for elegant serif
          lineHeight: 1,
          color: 'var(--color-primary)',
          marginBottom: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto 1.5rem',
          textTransform: 'capitalize'
        }}>
          Sumit Vishnu
        </h1>

        <p className="hero-content-elem" style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto 3rem',
          color: 'var(--color-text)',
          opacity: 0.8,
          lineHeight: 1.6
        }}>
          Building digital experiences that feel alive. Focused on modern web applications, startup products, and immersive digital experiences.
        </p>

        <div className="hero-content-elem" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <MagneticButton 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-cloud)',
            padding: '14px 32px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            border: 'none',
            cursor: 'none'
          }}>
            Explore My Work
          </MagneticButton>
          <MagneticButton 
            onClick={() => window.open('https://www.linkedin.com/in/sumit-vishnu-m/', '_blank', 'noopener,noreferrer')}
            style={{ 
            backgroundColor: 'transparent', 
            border: '1px solid var(--color-primary)', 
            color: 'var(--color-primary)',
            padding: '14px 32px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'none'
          }}>
            Let's Connect
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
