import "./index.css";

function App() {
  return (
    <main className="hero">
      <div className="overlay"></div>

      <section className="hero-content">
        <p className="tag">Frontend Developer</p>

        <h1>
          SUMIT <br />
          VISHNU
        </h1>

        <p className="description">
          Building futuristic digital experiences with React,
          motion design, and modern web technologies.
        </p>

        <div className="buttons">
          <button>View Projects</button>
          <button className="secondary">Contact Me</button>
        </div>
      </section>
    </main>
  );
}

export default App;