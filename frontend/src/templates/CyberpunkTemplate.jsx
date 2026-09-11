function CyberpunkTemplate({ data }) {
  
  return (
    <div className="cyberpunk-template">
      {/* Header */}
      <header className="cyberpunk-header">
        <p className="cyberpunk-label">DEVELOPER_PROFILE.exe</p>

        <h1>{data.name}</h1>

        <p className="cyberpunk-bio">{data.bio}</p>

        <div className="cyberpunk-socials">
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

        {data.resumeUrl && (
          <a
            className="cyberpunk-resume"
            href={data.resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            [ ACCESS RESUME ]
          </a>
        )}
      </header>

      {/* Projects */}
      <section className="cyberpunk-section">
        <h2>&gt; PROJECTS</h2>

        <div className="cyberpunk-projects">
          {data.projects?.map((project) => (
            <article key={project._id} className="cyberpunk-project">
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              {project.techStack?.length > 0 && (
                <div className="cyberpunk-tech">
                  {project.techStack.map((tech) => (
                    <span key={tech}>[{tech}]</span>
                  ))}
                </div>
              )}

              <div className="cyberpunk-links">
                {project.repoLink && project.repoLink !== "#" && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    &lt; GitHub /&gt;
                  </a>
                )}

                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    &lt; Live Demo /&gt;
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="cyberpunk-section">
        <h2>&gt; SKILLS</h2>

        <div className="cyberpunk-skills">
          {data.skills?.map((skill) => (
            <span key={skill._id}>
              {skill.name}
            </span>
          ))}
        </div>
      </section>
      {/* Custom Domain */}
{data.customDomain && (
  <section className="cyberpunk-section">
    <h2>&gt; CUSTOM DOMAIN</h2>
    <p>
      🌐 {data.customDomain}
    </p>
    <p>
      Status: Ready for DNS Setup ✅
    </p>
  </section>
)}
      {/* Contact */}
<section className="cyberpunk-section">
  <h2>&gt; CONTACT</h2>

  <div className="cyberpunk-contact">
    <p>Want to work together?</p>

    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const response = await fetch(
  "https://codefolio-backend-chaitanya.onrender.com/api/contact",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }),
  }
);

        const result = await response.json();

        if (result.success) {
          alert("Message sent successfully 🚀");
          e.target.reset();
        } else {
          alert(result.message || "Failed to send message");
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
        rows="5"
        required
      ></textarea>

      <button type="submit">
        &lt; SEND MESSAGE /&gt;
      </button>
    </form>
  </div>
</section>

      {/* Footer */}
      <footer className="cyberpunk-footer">
        SYSTEM ONLINE // © {new Date().getFullYear()} {data.name}
      </footer>
    </div>
  );
}

export default CyberpunkTemplate;