import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  // Synchronously initialize so the DOM renders on the first pass
  const [hasMouse, setHasMouse] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  
  const mainCursorRef = useRef(null);
  const trailCursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    
    // Update state if media query changes (e.g. rotating device)
    const handleMediaChange = (e) => setHasMouse(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    
    if (!mediaQuery.matches || !mainCursorRef.current || !trailCursorRef.current) return;

    let ctx = gsap.context(() => {
      // Start cursor offscreen to prevent 0,0 flash
      gsap.set([mainCursorRef.current, trailCursorRef.current], { x: -100, y: -100 });

      // Main dot (fast)
      const xTo = gsap.quickTo(mainCursorRef.current, "x", { duration: 0.05, ease: "power3.out" });
      const yTo = gsap.quickTo(mainCursorRef.current, "y", { duration: 0.05, ease: "power3.out" });
      
      // Outer ring (slower / trailing)
      const xToTrail = gsap.quickTo(trailCursorRef.current, "x", { duration: 0.2, ease: "power3.out" });
      const yToTrail = gsap.quickTo(trailCursorRef.current, "y", { duration: 0.2, ease: "power3.out" });

      const onMouseMove = (e) => {
        positionRef.current = { x: e.clientX, y: e.clientY };
        xTo(e.clientX);
        yTo(e.clientY);
        
        xToTrail(e.clientX);
        yToTrail(e.clientY);
      };

      const onMouseDown = () => {
        gsap.to(trailCursorRef.current, { scale: 0.85, duration: 0.15, ease: 'power3.out', yoyo: true, repeat: 1, overwrite: "auto" });
      };

      const getInteractiveTarget = (element) => {
        return element?.closest('a, button, [role="button"], .clickable, .cursor-pointer, .project-card');
      };

      const onMouseOver = (e) => {
        const target = getInteractiveTarget(e.target);
        if (target) {
          trailCursorRef.current?.classList.add('is-pointer');
          mainCursorRef.current?.classList.add('is-pointer');
        }
      };
      
      const onMouseOut = (e) => {
        const target = getInteractiveTarget(e.target);
        const relatedTarget = getInteractiveTarget(e.relatedTarget);
        
        // Only remove hover state if we are actually leaving the interactive element,
        // not just moving between children inside it.
        if (target && target !== relatedTarget) {
          trailCursorRef.current?.classList.remove('is-pointer');
          mainCursorRef.current?.classList.remove('is-pointer');
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mousedown', onMouseDown);
      document.body.addEventListener('mouseover', onMouseOver);
      document.body.addEventListener('mouseout', onMouseOut);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousedown', onMouseDown);
        document.body.removeEventListener('mouseover', onMouseOver);
        document.body.removeEventListener('mouseout', onMouseOut);
      };
    }); 

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      ctx.revert();
    };
  }, []); // Empty dependency array prevents re-rendering and tearing down GSAP

  if (!hasMouse) return null; 

  return (
    <>
      <div 
        ref={trailCursorRef}
        className="custom-cursor cursor-ring-container"
      >
        <div className="cursor-ring-element"></div>
      </div>
      <div 
        ref={mainCursorRef}
        className="custom-cursor cursor-dot-container"
      >
        <div className="cursor-dot-element"></div>
      </div>
    </>
  );
}
