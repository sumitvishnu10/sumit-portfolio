function Projects() {
  const projects = [
    {
      title: "AI Portfolio",
      desc: "Modern futuristic portfolio built with React and advanced UI animations.",
      tech: ["React", "CSS", "Vite"],
    },
    {
      title: "E-Commerce Website",
      desc: "Responsive shopping platform with authentication and payment flow.",
      tech: ["MERN", "MongoDB", "Express"],
    },
    {
      title: "Data Dashboard",
      desc: "Interactive analytics dashboard with charts and real-time insights.",
      tech: ["React", "Chart.js", "API"],
    },
  ];

  return (
    <section className="projects" id="projects">
      <p className="section-tag">PROJECTS</p>

      <h2>
        Selected <br />
        Works.
      </h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>

            <p>{project.desc}</p>

            <div className="tech-stack">
              {project.tech.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>

            <div className="project-links">
              <a href="#">Live Demo</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;