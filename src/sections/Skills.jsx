function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Python",
    "Java",
    "Git",
    "GitHub",
    "UI/UX",
  ];

  return (
    <section className="skills" id="skills">
      <p className="section-tag">SKILLS</p>

      <h2>
        Tech Stack <br />
        & Tools.
      </h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;