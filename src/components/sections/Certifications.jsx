import React from 'react';

export default function Certifications() {
  const education = [
    {
      degree: 'B.E. Computer Science Engineering',
      institution: 'Velammal Engineering College',
      year: 'Expected Graduation: 2027'
    }
  ];

  const certifications = [
    {
      title: 'Full Stack Development',
      issuer: 'NoviTech R&D'
    },
    {
      title: 'MERN Stack Internship',
      issuer: 'Maincrafts Technology'
    },
    {
      title: 'Applied Data Science Using Python',
      issuer: 'Inspire Softech Solutions'
    }
  ];

  return (
    <section id="education" style={{ 
      padding: '15vh 4vw', 
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '6rem'
      }}>
        
        {/* Education Column */}
        <div>
          <h2 style={{ 
            fontFamily: 'var(--font-secondary)',
            fontSize: '2rem', 
            letterSpacing: '2px', 
            color: 'var(--color-primary)',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--color-grass)',
            paddingBottom: '1rem'
          }}>
            EDUCATION
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {education.map((edu, idx) => (
              <div key={idx}>
                <h3 style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1.2rem', 
                  fontWeight: 600, 
                  color: 'var(--color-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {edu.degree}
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1rem',
                  color: 'var(--color-secondary)',
                  marginBottom: '0.5rem'
                }}>
                  {edu.institution}
                </p>
                <p style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text)',
                  opacity: 0.7,
                  fontStyle: 'italic'
                }}>
                  {edu.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div>
          <h2 style={{ 
            fontFamily: 'var(--font-secondary)',
            fontSize: '2rem', 
            letterSpacing: '2px', 
            color: 'var(--color-primary)',
            marginBottom: '3rem',
            borderBottom: '1px solid var(--color-grass)',
            paddingBottom: '1rem'
          }}>
            CERTIFICATIONS
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {certifications.map((cert, idx) => (
              <div key={idx}>
                <h3 style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  color: 'var(--color-primary)',
                  marginBottom: '0.25rem'
                }}>
                  {cert.title}
                </h3>
                <p style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '0.95rem',
                  color: 'var(--color-secondary)'
                }}>
                  {cert.issuer}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
