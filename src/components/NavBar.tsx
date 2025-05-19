import React from "react";
import "../App.css";

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container-fluid">
        <span
          className="navbar-brand mx-auto glow-text"
          style={{ paddingLeft: "140px" }}
        >
          GameSpace 🎮
        </span>

        {/* Hamburger toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible nav items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav mx-auto">
            <button
              className={`nav-link btn ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className={`nav-link btn ${
                activeTab === "playing" ? "active" : ""
              }`}
              onClick={() => setActiveTab("playing")}
            >
              Games Tracker
            </button>
            <button
              className={`nav-link btn ${
                activeTab === "incomplete" ? "active" : ""
              }`}
              onClick={() => setActiveTab("incomplete")}
            >
              Incomplete
            </button>
            <button
              className={`nav-link btn ${
                activeTab === "finished" ? "active" : ""
              }`}
              onClick={() => setActiveTab("finished")}
            >
              Finished
            </button>
            <button
              className={`nav-link btn ${
                activeTab === "planned" ? "active" : ""
              }`}
              onClick={() => setActiveTab("planned")}
            >
              Planned
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
