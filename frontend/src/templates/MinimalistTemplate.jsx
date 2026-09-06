function MinimalistTemplate({ data }) {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hello">Hello, I'm</p>

          <h1>{data.name}</h1>

          <h2>{data.bio}</h2>

          <p className="bio">
            I am a passionate Computer Science student and developer.
            I enjoy building web applications and learning new technologies.
          </p>

          <div className="hero-buttons">
            {data.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="primary-btn"
              >
                View Resume
              </a>
            )}

            <a href="#projects" className="secondary-btn">
              View Projects
            </a>
          </div>

          <div className="minimalist-socials">
            {data.socialLinks?.github && (
              <a
                href={data.socialLinks.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            )}

            {data.socialLinks?.linkedin && (
              <a
                href={data.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            )}

            {data.socialLinks?.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            )}
          </div>
        </div>

        {/* PHOTO LATER ADD KARENGE */}
        <div className="profile-card">
          <div className="avatar">{data.name?.charAt(0)}</div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <h2>Projects</h2>

        <div className="projects-grid">
          {data.projects?.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              {project.techStack?.length > 0 && (
                <div className="tech-stack">
                  {project.techStack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              )}

              <div>
                {project.repoLink && project.repoLink !== "#" && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}

                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="section">
        <h2>Skills</h2>

        <div className="skills-list">
          {data.skills?.map((skill) => (
            <span className="skill" key={skill._id}>
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <h2>Contact</h2>

        <p>
          Interested in working together? Feel free to get in touch.
        </p>

        <form
          className="contact-form"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);

            const contactData = {
              name: formData.get("name"),
              email: formData.get("email"),
              message: formData.get("message"),
            };

            try {
              const response = await fetch(
                "https://codefolio-backend-chaitanya.onrender.com/api/contact",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(contactData),
                }
              );

              const responseData = await response.json();

              if (responseData.success) {
                alert("Message sent successfully 🚀");
                e.target.reset();
              } else {
                alert(
                  responseData.message || "Failed to send message"
                );
              }
            } catch (error) {
              console.error("Contact error:", error);
              alert("Something went wrong");
            }
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            required
          ></textarea>

          <button type="submit" className="primary-btn">
            Send Message
          </button>
        </form>
      </section>

      {/* FOOTER */}
      <footer>
        © {new Date().getFullYear()} {data.name}
      </footer>
    </div>
  );
}

export default MinimalistTemplate;