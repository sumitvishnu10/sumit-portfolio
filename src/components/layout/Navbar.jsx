import React from 'react';
import MagneticButton from '../ui/MagneticButton';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: '2vw',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '0.8rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2.5rem',
      zIndex: 100,
      backgroundColor: 'rgba(252, 250, 245, 0.85)', /* translucent warm cream */
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(94, 118, 80, 0.15)', /* subtle moss green border */
      borderRadius: '50px',
      boxShadow: '0 4px 20px rgba(38, 59, 43, 0.05)',
      color: 'var(--color-primary)',
      fontFamily: 'var(--font-primary)'
    }}>
      <div style={{ 
        fontFamily: 'var(--font-secondary)',
        fontSize: '1.2rem', 
        fontWeight: 600, 
        letterSpacing: '1px',
        marginRight: '1rem'
      }}>
        Sumit.
      </div>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <a href="#about" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'inherit', fontWeight: 500 }}>About</a>
        <a href="#skills" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'inherit', fontWeight: 500 }}>Skills</a>
        <a href="#projects" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'inherit', fontWeight: 500 }}>Projects</a>
        <a href="#experience" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'inherit', fontWeight: 500 }}>Experience</a>
        <a href="#contact" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'inherit', fontWeight: 500 }}>Contact</a>
        <MagneticButton onClick={() => window.open('/resume.pdf', '_blank')} style={{ 
          backgroundColor: 'transparent', 
          border: '1px solid var(--color-primary)', 
          color: 'var(--color-primary)',
          padding: '8px 20px',
          fontSize: '0.8rem',
          cursor: 'none' // override native cursor for the button wrapper if needed
        }}>
          Resume
        </MagneticButton>
      </div>
    </nav>
  );
}
