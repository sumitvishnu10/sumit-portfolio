import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ProjectDetail() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '15vh', minHeight: '100vh', padding: '15vh 4vw' }}>
        <Link to="/" style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', borderBottom: '1px solid currentColor' }}>
          Back to Portfolio
        </Link>
        <h1 style={{ fontSize: '6vw', marginTop: '4vh' }}>Project Details: {id}</h1>
        <p style={{ maxWidth: '600px', fontSize: '1.2rem', marginTop: '4vh', lineHeight: 1.6, color: 'var(--color-gray)' }}>
          Detailed view of the project. We will flesh this out with smooth entry transitions and high-end imagery.
        </p>
      </main>
      <Footer />
    </>
  );
}
