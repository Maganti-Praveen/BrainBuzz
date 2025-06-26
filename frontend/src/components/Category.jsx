import React from "react";
import "../css/category.css";

const Categorycard = ({ category, icon, onClick }) => (
  <div className="category-card" onClick={() => onClick(category)}>
    <img src={icon} alt={category} className="category-icon" />
    <p>{category}</p>
  </div>
);

export default Categorycard;
