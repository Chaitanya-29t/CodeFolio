import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
});

const [status, setStatus] = useState("");

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("Sending...");

  try {
    const response = await fetch(
      "https://codefolio-backend-3hhh.onrender.com/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    setStatus("Message sent successfully 🚀");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  } catch (error) {
    setStatus("Failed to send message. Please try again.");
  }
};
  const profile = {
    name: "Chaitanya Todase",
    username: "chaitanya",
    role: "Full Stack Developer",
    bio: "I build modern, responsive and user-friendly web applications.",
    skills: ["React", "JavaScript", "Node.js", "MongoDB", "Express"],
  };

  const projects = [
    {
      title: "HabitForge",
      description: "A gamified habit tracking application with XP, streaks and badges.",
      tech: ["React", "Node.js", "MongoDB"],
      github: "#",
      live: "#",
    },
    {
      title: "CodeFolio",
      description: "A no-code portfolio builder for developers.",
      tech: ["React", "Express", "MongoDB"],
      github: "#",
      live: "#",
    },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <h2>CodeFolio</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-content">
            <p className="hello">Hello, I'm</p>

            <h1>{profile.name}</h1>

            <h2>{profile.role}</h2>

            <p className="bio">{profile.bio}</p>

            <div className="hero-buttons">
              <a href="#projects" className="primary-btn">
                View Projects
              </a>

              <a href="#contact" className="secondary-btn">
                Contact Me
              </a>
            </div>
          </div>

          <div className="profile-card">
            <div className="avatar">
              {profile.name.charAt(0)}
            </div>

            <h3>{profile.name}</h3>
            <p>@{profile.username}</p>
          </div>
        </section>

        <section id="projects" className="section">
          <p className="section-label">MY WORK</p>
          <h2>Featured Projects</h2>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <div className="project-image">
                  {project.title.charAt(0)}
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.github}>GitHub</a>
                  <a href={project.live}>Live Demo</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <p className="section-label">WHAT I USE</p>
          <h2>Skills</h2>

          <div className="skills-list">
            {profile.skills.map((skill) => (
              <div className="skill" key={skill}>
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <p className="section-label">GET IN TOUCH</p>
          <h2>Let's Work Together</h2>

          <p>
            Have a project or opportunity? I'd love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={form.name}
    onChange={handleChange}
    required
  />

  <input
    type="email"
    name="email"
    placeholder="Your Email"
    value={form.email}
    onChange={handleChange}
    required
  />

  <textarea
    name="message"
    placeholder="Your Message"
    value={form.message}
    onChange={handleChange}
    rows="5"
    required
  />

  <button type="submit" className="primary-btn">
    Send Message
  </button>

  {status && <p>{status}</p>}
</form>
        </section>
      </main>

      <footer>
        <p>© 2026 {profile.name} • Built with CodeFolio</p>
      </footer>
    </div>
  );
}

export default App;