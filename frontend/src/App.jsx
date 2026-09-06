import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { useForm } from "react-hook-form";

import PublicPortfolio from "./PublicPortfolio";
import templateMap from "./templateMap";

// =========================
// API CONFIG
// =========================

const API = "https://codefolio-backend-chaitanya.onrender.com";
const USER_ID = "6a9bec2a4df9fceb5a32d435";

// ======================================================
// PROFILE PAGE
// ======================================================

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Projects and Skills for Live Preview
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const formValues = watch();

  const PortfolioLayout =
    templateMap[formValues.templateId] || templateMap.minimalist;

  // =========================
  // FETCH PROFILE
  // =========================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${API}/api/users/chaitanya`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Profile not found");
        }

        const user = data.user;

        // Fill profile form
        reset({
          username: user.username || "",
          name: user.name || "",
          email: user.email || "",
          bio: user.bio || "",
          github: user.socialLinks?.github || "",
          linkedin: user.socialLinks?.linkedin || "",
          twitter: user.socialLinks?.twitter || "",
          resumeUrl: user.resumeUrl || "",
          templateId: user.templateId || "minimalist",
        });

        // =========================
        // FETCH PROJECTS + SKILLS
        // =========================

        const userId = user._id;

        const [projectsResponse, skillsResponse] =
          await Promise.all([
            fetch(`${API}/api/projects/${userId}`),
            fetch(`${API}/api/skills/${userId}`),
          ]);

        const projectsData =
          await projectsResponse.json();

        const skillsData =
          await skillsResponse.json();

        if (projectsData.success) {
          setProjects(projectsData.projects || []);
        }

        if (skillsData.success) {
          setSkills(skillsData.skills || []);
        }
      } catch (error) {
        console.error("Profile error:", error);
        setMessage("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  // =========================
  // UPDATE PROFILE
  // =========================

  const updateProfile = async (formData) => {
    setMessage("");

    try {
      const response = await fetch(
        `${API}/api/users/${USER_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            name: formData.name,
            email: formData.email,
            bio: formData.bio,

            socialLinks: {
              github: formData.github || "",
              linkedin: formData.linkedin || "",
              twitter: formData.twitter || "",
            },

            resumeUrl: formData.resumeUrl || "",
            templateId: formData.templateId || "minimalist",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage("Profile saved successfully 🚀");
      } else {
        setMessage(
          data.message || "Failed to save profile"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="section">
        Loading profile...
      </div>
    );
  }

  // =========================
  // PROFILE PAGE
  // =========================

  return (
    <div className="builder-dashboard">

      <div className="page-heading">
        <h1>👤 Profile</h1>
        <p>
          Manage your personal portfolio information
        </p>
      </div>

      {message && (
        <div className="dashboard-message">
          {message}
        </div>
      )}

      <div className="profile-editor-layout">

        {/* =========================
            PROFILE FORM
        ========================= */}

        <div className="builder-card">

          <h3>Profile Information</h3>

          <form
            onSubmit={handleSubmit(updateProfile)}
          >
            <div className="form-grid">

              {/* USERNAME */}
              <div>
                <label>Username</label>

                <input
                  type="text"
                  placeholder="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />

                {errors.username && (
                  <small className="form-error">
                    {errors.username.message}
                  </small>
                )}
              </div>

              {/* NAME */}
              <div>
                <label>Name</label>

                <input
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <small className="form-error">
                    {errors.name.message}
                  </small>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label>Email</label>

                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
              </div>

              {/* GITHUB */}
              <div>
                <label>GitHub</label>

                <input
                  type="text"
                  placeholder="GitHub URL"
                  {...register("github")}
                />
              </div>

              {/* LINKEDIN */}
              <div>
                <label>LinkedIn</label>

                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  {...register("linkedin")}
                />
              </div>

              {/* TWITTER */}
              <div>
                <label>Twitter</label>

                <input
                  type="text"
                  placeholder="Twitter URL"
                  {...register("twitter")}
                />
              </div>

              {/* RESUME */}
              <div>
                <label>Resume</label>

                <input
                  type="text"
                  placeholder="Resume URL"
                  {...register("resumeUrl")}
                />
              </div>

              {/* TEMPLATE */}
              <div>
                <label>Template</label>

                <select {...register("templateId")}>
                  <option value="minimalist">
                    Minimalist
                  </option>

                  <option value="cyberpunk">
                    Cyberpunk
                  </option>
                </select>
              </div>

            </div>

            {/* BIO */}
            <div className="full-width-field">

              <label>Bio</label>

              <textarea
                placeholder="Write something about yourself..."
                {...register("bio")}
              />

            </div>

            <button type="submit">
              Save Profile
            </button>

          </form>
        </div>

        {/* =========================
            LIVE PREVIEW
        ========================= */}

        <div className="builder-card live-preview-card">

          <h3>👀 Live Preview</h3>

          <div className="live-preview">

            <PortfolioLayout
              data={{
                name:
                  formValues.name ||
                  "Your Name",

                bio:
                  formValues.bio ||
                  "Your Bio",

                socialLinks: {
                  github:
                    formValues.github || "",

                  linkedin:
                    formValues.linkedin || "",

                  twitter:
                    formValues.twitter || "",
                },

                resumeUrl:
                  formValues.resumeUrl || "",

                // Database projects
                projects,

                // Database skills
                skills,
              }}
            />

          </div>

        </div>

      </div>
    </div>
  );
}

// ======================================================
// PROJECTS PAGE
// ======================================================

function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const [project, setProject] = useState({
    title: "",
    description: "",
    techStack: "",
    repoLink: "",
    liveLink: "",
    screenshot: "",
  });

  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${API}/api/projects/${USER_ID}`
      );

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error("Projects error:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD / UPDATE PROJECT
  // =========================

  const saveProject = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        user: USER_ID,
        title: project.title,
        description: project.description,
        techStack: project.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        repoLink: project.repoLink,
        liveLink: project.liveLink,
        screenshot: project.screenshot,
      };

      const url = editingId
        ? `${API}/api/projects/${editingId}`
        : `${API}/api/projects`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          editingId
            ? "Project updated successfully 🚀"
            : "Project added successfully 🚀"
        );

        setProject({
          title: "",
          description: "",
          techStack: "",
          repoLink: "",
          liveLink: "",
          screenshot: "",
        });

        setEditingId(null);

        fetchProjects();
      } else {
        setMessage(
          data.message || "Failed to save project"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  // =========================
  // EDIT
  // =========================

  const editProject = (item) => {
    setEditingId(item._id);

    setProject({
      title: item.title || "",
      description: item.description || "",
      techStack: item.techStack?.join(", ") || "",
      repoLink: item.repoLink || "",
      liveLink: item.liveLink || "",
      screenshot: item.screenshot || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE
  // =========================

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API}/api/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Project deleted successfully 🗑️"
        );

        fetchProjects();
      } else {
        setMessage(
          data.message || "Failed to delete project"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  // =========================
  // PROJECT PAGE
  // =========================

  return (
    <div className="builder-dashboard">

      <div className="page-heading">
        <h1>💻 Projects</h1>
        <p>
          Add and manage your portfolio projects
        </p>
      </div>

      {message && (
        <div className="dashboard-message">
          {message}
        </div>
      )}

      {/* PROJECT FORM */}

      <div className="builder-card">

        <h3>
          {editingId
            ? "Edit Project"
            : "Add New Project"}
        </h3>

        <form onSubmit={saveProject}>

          <div className="form-grid">

            <div>
              <label>Project Title</label>

              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Project title"
                required
              />
            </div>

            <div>
              <label>Tech Stack</label>

              <input
                type="text"
                name="techStack"
                value={project.techStack}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div>
              <label>Repository Link</label>

              <input
                type="text"
                name="repoLink"
                value={project.repoLink}
                onChange={handleChange}
                placeholder="GitHub repository URL"
              />
            </div>

            <div>
              <label>Live Link</label>

              <input
                type="text"
                name="liveLink"
                value={project.liveLink}
                onChange={handleChange}
                placeholder="Live project URL"
              />
            </div>

            <div>
              <label>Screenshot URL</label>

              <input
                type="text"
                name="screenshot"
                value={project.screenshot}
                onChange={handleChange}
                placeholder="Screenshot URL"
              />
            </div>

          </div>

          <div className="full-width-field">

            <label>Description</label>

            <textarea
              name="description"
              value={project.description}
              onChange={handleChange}
              placeholder="Describe your project..."
            />

          </div>

          <button type="submit">
            {editingId
              ? "Update Project"
              : "Add Project"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);

                setProject({
                  title: "",
                  description: "",
                  techStack: "",
                  repoLink: "",
                  liveLink: "",
                  screenshot: "",
                });
              }}
              style={{
                marginLeft: "10px",
              }}
            >
              Cancel
            </button>
          )}

        </form>
      </div>

      {/* PROJECT LIST */}

      <div className="builder-card">

        <h3>Your Projects</h3>

        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          <div className="projects-grid">

            {projects.map((item) => (
              <div
                className="project-card"
                key={item._id}
              >

                {item.screenshot && (
                  <img
                    src={item.screenshot}
                    alt={item.title}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      marginBottom: "12px",
                    }}
                  />
                )}

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                {item.techStack?.length > 0 && (
                  <div className="tech-stack">
                    {item.techStack.map(
                      (tech) => (
                        <span key={tech}>
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >

                  {item.repoLink && (
                    <a
                      href={item.repoLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  )}

                  {item.liveLink && (
                    <a
                      href={item.liveLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  )}

                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >

                  <button
                    type="button"
                    onClick={() => editProject(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteProject(item._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

// ======================================================
// SKILLS PAGE
// ======================================================

function SkillsPage() {
  const [skills, setSkills] = useState([]);

  const [skill, setSkill] = useState({
    name: "",
    category: "Frontend",
    level: "Intermediate",
  });

  const [message, setMessage] = useState("");

  // =========================
  // FETCH SKILLS
  // =========================

  const fetchSkills = async () => {
    try {
      const response = await fetch(
        `${API}/api/skills/${USER_ID}`
      );

      const data = await response.json();

      if (data.success) {
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error("Skills error:", error);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // =========================
  // ADD SKILL
  // =========================

  const addSkill = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!skill.name.trim()) {
      setMessage("Please enter a skill name");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: USER_ID,
            name: skill.name,
            category: skill.category,
            level: skill.level,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Skill added successfully 🚀"
        );

        setSkill({
          name: "",
          category: "Frontend",
          level: "Intermediate",
        });

        fetchSkills();
      } else {
        setMessage(
          data.message || "Failed to add skill"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  // =========================
  // DELETE SKILL
  // =========================

  const deleteSkill = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API}/api/skills/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Skill deleted successfully 🗑️"
        );

        fetchSkills();
      } else {
        setMessage(
          data.message || "Failed to delete skill"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  // =========================
  // SKILLS PAGE
  // =========================

  return (
    <div className="builder-dashboard">

      <div className="page-heading">
        <h1>🛠️ Skills</h1>
        <p>
          Manage your technical skills
        </p>
      </div>

      {message && (
        <div className="dashboard-message">
          {message}
        </div>
      )}

      {/* ADD SKILL */}

      <div className="builder-card">

        <h3>Add Skill</h3>

        <form onSubmit={addSkill}>

          <div className="form-grid">

            <div>
              <label>Skill Name</label>

              <input
                type="text"
                placeholder="React"
                value={skill.name}
                onChange={(e) =>
                  setSkill({
                    ...skill,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label>Category</label>

              <select
                value={skill.category}
                onChange={(e) =>
                  setSkill({
                    ...skill,
                    category: e.target.value,
                  })
                }
              >
                <option value="Frontend">
                  Frontend
                </option>

                <option value="Backend">
                  Backend
                </option>

                <option value="DevOps">
                  DevOps
                </option>
              </select>
            </div>

            <div>
              <label>Level</label>

              <select
                value={skill.level}
                onChange={(e) =>
                  setSkill({
                    ...skill,
                    level: e.target.value,
                  })
                }
              >
                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>
              </select>
            </div>

          </div>

          <button type="submit">
            Add Skill
          </button>

        </form>

      </div>

      {/* SKILL LIST */}

      <div className="builder-card">

        <h3>Your Skills</h3>

        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <div className="skills-list">

            {skills.map((item) => (
              <div
                className="skill"
                key={item._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >

                <span>
                  {item.name}
                </span>

                <small>
                  ({item.category} · {item.level})
                </small>

                <button
                  type="button"
                  onClick={() =>
                    deleteSkill(item._id)
                  }
                >
                  Delete
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

// ======================================================
// CONTACT PAGE
// ======================================================

function ContactPage() {
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    setMessage("");
    setSending(true);

    try {
      const response = await fetch(
        `${API}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Message sent successfully 🚀"
        );

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setMessage(
          data.message ||
            "Failed to send message"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Something went wrong while sending message"
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="builder-dashboard">

      <div className="page-heading">
        <h1>📩 Contact</h1>
        <p>
          Test the contact form of your portfolio
        </p>
      </div>

      {message && (
        <div className="dashboard-message">
          {message}
        </div>
      )}

      <div className="builder-card">

        <h3>Send Test Message</h3>

        <form onSubmit={sendMessage}>

          <div className="form-grid">

            <div>
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </div>

          </div>

          <div className="full-width-field">

            <label>Message</label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
            />

          </div>

          <button
            type="submit"
            disabled={sending}
          >
            {sending
              ? "Sending..."
              : "Send Message"}
          </button>

        </form>

      </div>

    </div>
  );
}

// ======================================================
// DASHBOARD LAYOUT
// ======================================================

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">

          <h2>CodeFolio</h2>

          <p>
            Portfolio Builder
          </p>

        </div>

        <nav className="dashboard-nav">

          <NavLink to="/dashboard/profile">
            👤 Profile
          </NavLink>

          <NavLink to="/dashboard/projects">
            💻 Projects
          </NavLink>

          <NavLink to="/dashboard/skills">
            🛠️ Skills
          </NavLink>

          <NavLink to="/dashboard/contact">
            📩 Contact
          </NavLink>

          <NavLink to="/user/chaitanya">
  🌐 View Portfolio
</NavLink>

        </nav>

      </aside>

      {/* MAIN */}

      <main className="dashboard-main">
        {children}
      </main>

    </div>
  );
}

// ======================================================
// APP
// ======================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC PORTFOLIO
        ========================= */}

        <Route
          path="/user/:username"
          element={<PublicPortfolio />}
        />

        {/* =========================
            DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Navigate
                to="/dashboard/profile"
                replace
              />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/profile"
          element={
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/projects"
          element={
            <DashboardLayout>
              <ProjectsPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/skills"
          element={
            <DashboardLayout>
              <SkillsPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/contact"
          element={
            <DashboardLayout>
              <ContactPage />
            </DashboardLayout>
          }
        />

        {/* =========================
            DEFAULT
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard/profile"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;