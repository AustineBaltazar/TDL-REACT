import React from "react";
import { NavLink } from "react-router-dom";
import "./HomeSideBar.css";

export default function HomeSidebar() {
  return (
    <aside className="home-sidebar">
      <div className="home-sidebar-header">
        <div className="home-sidebar-badge">T</div>
        <div>
          <p className="home-sidebar-label">Focus Board</p>
          <h1 className="home-sidebar-title">To Do</h1>
        </div>
      </div>

      <nav className="home-sidebar-nav" aria-label="Main navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `home-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Daily</span>
          <span className="nav-icon">D</span>
        </NavLink>
        <NavLink
          to="/weekly"
          className={({ isActive }) =>
            `home-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Weekly</span>
          <span className="nav-icon">W</span>
        </NavLink>
        <NavLink
          to="/monthly"
          className={({ isActive }) =>
            `home-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span>Monthly</span>
          <span className="nav-icon">M</span>
        </NavLink>
      </nav>

      <div className="home-sidebar-footer">Today: 3 priorities</div>
    </aside>
  );
}
