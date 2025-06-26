import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Categorycard from "../components/Category";
import API from "../api";
import "../css/home.css";
// Import default category icons
import webdevIcon from "../assets/webdev.png";
import pythonIcon from "../assets/python.png";
import scienceIcon from "../assets/science.png";
import socialIcon from "../assets/social.png";
import gkIcon from "../assets/gk.png";
import funnyIcon from "../assets/funny.png";
import politicalIcon from "../assets/political.png";

const defaultCategories = {
  WebDev: webdevIcon,
  Python: pythonIcon,
  Science: scienceIcon,
  Social: socialIcon,
  GK: gkIcon,
  Funny: funnyIcon,
  Political: politicalIcon,
};

const Home = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "User";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("quiz/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("❌ Failed to load categories:", err));
  }, []);
  const handleCategoryClick = (category) => {
    navigate(`/quiz/${category}`);
  };

  return (
    <div className="home-container">
      <h1 className="welcome-title">
        Welcome <span className="highlighted">{username}</span>!
      </h1>
      <p className="subtitle">Select a category</p>

      <div className="category-list">
        {categories.map((cat) => (
          <Categorycard
            key={cat}
            category={cat}
            icon={defaultCategories[cat] || null} // No icon for new dynamic categories
            onClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
