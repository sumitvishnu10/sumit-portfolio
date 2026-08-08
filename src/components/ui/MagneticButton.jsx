import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className, onClick, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // We only apply magnetic effect on desktop
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      const maxPull = 5; // Maximum magnetic pull in pixels
      const pullX = (x * 0.1); 
      const pullY = (y * 0.1);
      
      const boundedX = Math.max(-maxPull, Math.min(maxPull, pullX));
      const boundedY = Math.max(-maxPull, Math.min(maxPull, pullY));
      
      gsap.to(element, {
        x: boundedX,
        y: boundedY,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const mouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    element.addEventListener("mousemove", mouseMove);
    element.addEventListener("mouseleave", mouseLeave);

    return () => {
      element.removeEventListener("mousemove", mouseMove);
      element.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <button 
      ref={ref} 
      className={`magnetic ${className}`} 
      onClick={onClick}
      style={{
        display: 'inline-block',
        padding: '16px 32px',
        backgroundColor: 'var(--color-text)',
        color: 'var(--color-bg)',
        border: 'none',
        borderRadius: '50px',
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        cursor: 'none',
        ...props.style
      }}
      {...props}
    >
      {children}
    </button>
  );
}
