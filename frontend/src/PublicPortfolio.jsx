import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import templateMap from "./templateMap";

function PublicPortfolio() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        // 1. Fetch profile
        const userResponse = await fetch(
          `https://codefolio-backend-chaitanya.onrender.com/api/users/${username}`
        );

        const userData = await userResponse.json();

        if (!userResponse.ok || !userData.success) {
          throw new Error("User not found");
        }

        setUser(userData.user);

        const userId = userData.user._id;

        // 2. Fetch projects separately
        try {
          const projectsResponse = await fetch(
            `https://codefolio-backend-chaitanya.onrender.com/api/projects/${userId}`
          );

          const projectsData = await projectsResponse.json();

          if (projectsResponse.ok && projectsData.success) {
            setProjects(projectsData.projects || []);
          }
        } catch (projectError) {
          console.error("Projects error:", projectError);
          setProjects([]);
        }

        // 3. Fetch skills separately
        try {
          const skillsResponse = await fetch(
            `https://codefolio-backend-chaitanya.onrender.com/api/skills/${userId}`
          );

          const skillsData = await skillsResponse.json();

          if (skillsResponse.ok && skillsData.success) {
            setSkills(skillsData.skills || []);
          }
        } catch (skillError) {
          console.error("Skills error:", skillError);
          setSkills([]);
        }
      } catch (err) {
        console.error("Portfolio error:", err);
        setError("Portfolio not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (loading) {
    return <div className="section">Loading portfolio...</div>;
  }

  if (error || !user) {
    return (
      <div className="section">
        <h2>Portfolio Not Found</h2>
        <p>{error}</p>
      </div>
    );
  }

  const portfolioData = {
    ...user,
    projects,
    skills,
  };

  const PortfolioLayout =
    templateMap[user.templateId] || templateMap.minimalist;

  return (
    <>
      <Helmet>
        <title>{user.name} | CodeFolio</title>

        <meta
          name="description"
          content={user.bio || `${user.name}'s developer portfolio`}
        />
      </Helmet>

      <PortfolioLayout data={portfolioData} />
    </>
  );
}

export default PublicPortfolio;