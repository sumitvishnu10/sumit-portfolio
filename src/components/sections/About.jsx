import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

export default function About() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    let ctx = gsap.context(() => {
      // Setup initial states
      gsap.set('.about-landscape', { clipPath: 'inset(0 100% 0 0)', scale: 1.05 });
      gsap.set('.about-desc p', { opacity: 0, y: 20 });
      gsap.set('.about-quote', { opacity: 0, x: -20 });

      // Split text for main heading
      const titleText = new SplitType('.about-title', { types: 'words,chars' });
      gsap.set(titleText.chars, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      if (!prefersReducedMotion) {
        tl.to('.about-landscape', {
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          duration: 1.2,
          ease: 'power3.inOut'
        })
        .to(titleText.chars, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power2.out'
        }, "-=0.6")
        .to('.about-quote', {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, "-=0.4")
        .to('.about-desc p', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out'
        }, "-=0.6");
      } else {
        // Reduced motion fallback
        tl.to('.about-landscape', { clipPath: 'inset(0 0% 0 0)', duration: 0.5 })
          .to(titleText.chars, { opacity: 1, y: 0, duration: 0.5 })
          .to(['.about-quote', '.about-desc p'], { opacity: 1, y: 0, x: 0, duration: 0.5 });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{
      padding: '20vh 4vw',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)',
      display: 'flex',
      flexDirection: 'column',
      gap: '4rem',
      position: 'relative'
    }}>
      <h2 className="about-title" style={{
        fontFamily: 'var(--font-secondary)',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        A LITTLE ABOUT ME
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '6vw',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap'
      }}>
        
        {/* Storytelling Text */}
        <div style={{ flex: '1 1 500px' }}>
          <p className="about-quote" style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            lineHeight: 1.4,
            color: 'var(--color-primary)',
            marginBottom: '2rem',
            fontStyle: 'italic'
          }}>
            "Somewhere between writing code and building products, I found that I enjoy creating things that people can actually experience."
          </p>
          
          <div className="about-desc" style={{
            fontFamily: 'var(--font-primary)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <p>
              I'm a Full-Stack MERN Developer, Freelancer, and Startup Builder. My journey began with a curiosity for how digital ecosystems function, which evolved into a passion for architecting robust, immersive experiences.
            </p>
            <p>
              As the Founder of NYXORA, I focus on merging aesthetics with powerful engineering—creating platforms that don't just work, but feel natural and alive to the user.
            </p>
          </div>
        </div>

        {/* Landscape Panel / Image */}
        <div className="about-landscape" style={{
          flex: 1,
          backgroundColor: 'var(--color-primary)',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          minHeight: '400px',
          backgroundImage: "url('/assets/about_landscape.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1))',
            pointerEvents: 'none'
          }}></div>
        </div>

      </div>
    </section>
  );
}
