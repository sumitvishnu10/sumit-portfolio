function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        SV
      </div>

      <ul className="nav-links">

        <li>
          <a href="#about">About</a>
        </li>

        <li>
          <a href="#projects">Projects</a>
        </li>

        <li>
          <a href="#skills">Skills</a>
        </li>

        <li>
          <a href="#contact">Contact</a>
        </li>

      </ul>

      <button className="resume-btn">
       <a
  href="https://sumit-resume-ten.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="resume-btn"
>
  Resume
</a>
      </button>

    </nav>
  );
}

export default Navbar;