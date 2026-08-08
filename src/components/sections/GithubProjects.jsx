import React, { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from '../../config/links';

export default function GithubProjects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/sumitvishnu10/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching github repos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return (
    <section style={{ 
      padding: '15vh 4vw', 
      backgroundColor: 'var(--color-soft-sky)', 
      color: 'var(--color-text)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8vh' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-secondary)',
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            lineHeight: 1, 
            textTransform: 'uppercase',
            color: 'var(--color-primary)'
          }}>
            Open<br/>Source
          </h2>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" style={{ 
            fontFamily: 'var(--font-primary)',
            textTransform: 'uppercase', 
            letterSpacing: '2px', 
            fontSize: '0.85rem', 
            borderBottom: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            paddingBottom: '4px'
          }}>
            View Full GitHub
          </a>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem'
        }}>
          {repos.map(repo => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              style={{
                padding: '2.5rem',
                backgroundColor: 'var(--color-cloud)',
                border: '1px solid rgba(125, 150, 95, 0.2)', /* subtle grass border */
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '260px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                textDecoration: 'none',
                color: 'var(--color-text)'
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(38, 59, 43, 0.08)';
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-primary)',
                  fontSize: '1.25rem', 
                  marginBottom: '1rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600
                }}>
                  {repo.name}
                </h3>
                <p style={{ 
                  color: 'var(--color-text)', 
                  opacity: 0.75,
                  fontSize: '0.9rem', 
                  lineHeight: 1.6 
                }}>
                  {repo.description || 'No description available for this repository.'}
                </p>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '2rem', 
                fontSize: '0.8rem', 
                color: 'var(--color-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '1px',
                fontWeight: 500
              }}>
                <span>{repo.language || 'Code'}</span>
                <span>★ {repo.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
