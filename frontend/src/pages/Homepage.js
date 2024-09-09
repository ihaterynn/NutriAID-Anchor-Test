import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css'; // Specific styles for Homepage

function Homepage() {
  console.log("Homepage Component Rendering");

  return (
    <div className="homepage">
      <h1>Welcome to NutriAID</h1>
      <p>For all Health Freaks to analyze your food labels easily</p>
      <Link to="/analysis">
        <button className="start-button">Go to Analysis</button>
      </Link>
    </div>
  );
}

export default Homepage;
