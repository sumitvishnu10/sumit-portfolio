import aboutBg from "../assets/about-bg.png";
function About() {
  return (
   <section id="about" className="about">
        <div className="about-bg">
  <img src={aboutBg} alt="background" />
</div>

<div className="about-overlay"></div>
      <div className="about-container">

        <p className="section-tag">ABOUT ME</p>

        <h2>
          Creating immersive <br />
          digital experiences.
        </h2>

        <p className="about-text">
       Hey, I'm Sumit Vishnu — a Full-Stack MERN Developer and CSE student at Velammal Engineering College, Chennai. Over the past year, I've gone from curiosity to craft — completing an intensive Full-Stack program at Novitech, freelancing for real clients, interning as a Data Scientist at Inspire Softech Solutions, and contributing as a partner at Vyntrix Innovations. My stack is built around React, Node.js, Express, MongoDB, and SQL, and I'm currently diving deep into Supabase and modern backend architectures. I thrive in hackathons, love tackling problems that actually matter, and bring one mindset to everything I build — make it fast, make it beautiful, make it work.

        </p>

      </div>
    </section>
  );
}

export default About;